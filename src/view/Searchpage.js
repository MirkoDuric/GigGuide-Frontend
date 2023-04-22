import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import axios from "axios";

import SearchBar from "../Components/SearchBar";
import Event from "../Components/Event";
import LoadingIndicator from "../Components/LoadingIndicator";

import { getCountryCode, getGenreId } from "../utils";

const Searchpage = () => {
  let { name, city, country, genre } = useParams();
  const navigation = useNavigate();

  const [bands, setBands] = useState([]);
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);
  const [currentSavedEvents, setCurrentSavedEvents] = useState([]);

  const genreId = getGenreId(genre);
  const countryCode = getCountryCode(country);

  const id = sessionStorage.getItem("userId");

  const handleChange = (e) => {
    setNewSearch(e.target.value);
  };

  const handleChangeCity = (e) => {
    setNewCity(e.target.value);
  };

  const handleChangeCountry = (e) => {
    setNewCountry(e.target.value);
  };

  const handleChangeGenre = (e) => {
    setNewGenre(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigation(`/search/${newSearch}/${newCountry}/${newCity}/${newGenre}`);
  };

  const handleEventClick = async (e) => {
    e.preventDefault();
    let eventInfo = "";
    let plannedEvents = currentSavedEvents;
    const band = JSON.parse(e.target.title);
    if (e.target.id) {
      const event = JSON.parse(e.target.id);
      eventInfo = {
        id: event._id,
        ticketUrl: event.ticketUrl,
        profilePicture: band.profilePicture,
        artistName: band.name,
        date: event.date,
        startTime: event.startTime,
        venue: event.venue,
        address: event.address,
        info: event.info,
      };
    } else {
      eventInfo = {
        id: band.id,
        bandId: band._embedded.attractions[0].id,
        ticketUrl: band.ticketUrl,
        profilePicture: band.images.find(
          (element) => element.ratio === "16_9" && element.height > 150
        ).url,
        artistName: band._embedded.attractions
          ? band._embedded.attractions[0].name
          : band.name,
        date: band.dates.start.dateTime,
        startTime: band.dates.start.dateTime,
        venue: band._embedded.venues[0].name,
        address: band._embedded.venues[0].state
          ? band._embedded.venues[0].address.line1 +
            " " +
            band._embedded.venues[0].city.name +
            ", " +
            band._embedded.venues[0].state.name +
            " " +
            band._embedded.venues[0].postalCode +
            ", " +
            band._embedded.venues[0].country.name
          : band._embedded.venues[0].address.line1 +
            " " +
            band._embedded.venues[0].city.name +
            ", " +
            band._embedded.venues[0].postalCode +
            ", " +
            band._embedded.venues[0].country.name,
        info: band.info,
      };
    }
    if (e.target.value === "Save Event") {
      if (currentSavedEvents.length > 0) {
        setCurrentSavedEvents([...currentSavedEvents, eventInfo]);
        plannedEvents = [...currentSavedEvents, eventInfo];
      } else {
        setCurrentSavedEvents([eventInfo]);
        plannedEvents = [eventInfo];
      }
    } else {
      setCurrentSavedEvents(
        currentSavedEvents.filter((event) => event.id !== eventInfo.id)
      );
      plannedEvents = currentSavedEvents.filter(
        (event) => event.id !== eventInfo.id
      );
    }
    if (id) {
      const payload = { plannedEvents };
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}api/user/${id}/plannedEvents`,
          payload
        );
        console.log(response);
      } catch (err) {
        if (err.status === 404) {
          console.log("Resource could not be found!");
        } else {
          console.log(err.message);
        }
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!name) {
      name = 0;
    }
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}api/artists/${name}/${country}/${city}/${genre}`
      )
      .then((response) => {
        setLocalBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (name === "0") {
      name = "";
    }
    if (city === "0") {
      city = "";
    }
    if (name !== "") {
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&keyword=${name}&locale=*&sort=relevance,desc&city=${city}&countryCode=${countryCode}&segmentName=Music&genreId=${genreId}`
        )
        .then((response) => {
          if (response.data._embedded) {
            setBands(response.data._embedded.events);
          } else {
            setBands([]);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&keyword=${name}&locale=*&sort=date,desc&city=${city}&countryCode=${countryCode}&segmentName=Music&genreId=${genreId}`
        )
        .then((response) => {
          if (response.data._embedded) {
            setBands(response.data._embedded.events);
          } else {
            setBands([]);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [countryCode, genreId, name, city, country, genre]);

  useEffect(() => {
    if (newSearch === "") {
      setNewSearch(0);
    }
    if (newCountry === "" || newCountry === "None") {
      setNewCountry(0);
    }
    if (newCity === "") {
      setNewCity(0);
    }
    if (newGenre === "" || newGenre === "None") {
      setNewGenre(0);
    }
  }, [newSearch, newCity, newCountry, newGenre]);

  return (
    <div className="landingpage-container">
      <div className="searchbardiv">
        <SearchBar
          onChange={handleChange}
          onChangeCity={handleChangeCity}
          onChangeCountry={handleChangeCountry}
          onChangeGenre={handleChangeGenre}
          onClick={handleClick}
        />
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : bands.length ? (
        <div className="eventdiv">
          {city.length > 1 && countryCode.length ? (
            <h5>{`Upcoming Shows in ${city}, ${countryCode}:`}</h5>
          ) : city.length > 1 ? (
            <h5>{`Upcoming Shows in ${city}:`}</h5>
          ) : countryCode.length ? (
            <h5>{`Upcoming Shows in ${countryCode}:`}</h5>
          ) : (
            <h5>{`Upcoming Shows:`}</h5>
          )}

          <Event
            bands={bands}
            type="non-local"
            onEventClick={handleEventClick}
            currentSavedEvents={currentSavedEvents}
          />
        </div>
      ) : (
        <div className="eventdiv">
          {city.length > 1 && countryCode.length ? (
            <h5>{`Upcoming Shows in ${city}, ${countryCode}:`}</h5>
          ) : city.length > 1 ? (
            <h5>{`Upcoming Shows in ${city}:`}</h5>
          ) : countryCode.length ? (
            <h5>{`Upcoming Shows in ${countryCode}:`}</h5>
          ) : (
            <h5>{`Upcoming Shows:`}</h5>
          )}

          <div className="noShowsdiv">
            <h6>No Upcoming Shows</h6>
          </div>
        </div>
      )}

      <br />
      <br />
      {isLoading ? (
        <LoadingIndicator />
      ) : localBands.length ? (
        <div className="eventdiv">
          {city.length > 1 && countryCode.length ? (
            <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
          ) : city.length > 1 ? (
            <h5>{`Upcoming Shows from Local Artists in ${city}:`}</h5>
          ) : countryCode.length ? (
            <h5>{`Upcoming Shows in ${countryCode}:`}</h5>
          ) : (
            <h5>{`Upcoming Shows from Local Artists:`}</h5>
          )}
          <Event
            className="upcoming-shows"
            bands={localBands}
            type="local"
            onEventClick={handleEventClick}
            currentSavedEvents={currentSavedEvents}
          />
        </div>
      ) : (
        <div>No Matching Results</div>
      )}
    </div>
  );
};

export default Searchpage;
