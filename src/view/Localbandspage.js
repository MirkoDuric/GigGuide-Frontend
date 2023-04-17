import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import Event from "../Components/Event";
import SavedEvents from "../Components/SavedEvents";
import DisplayCarousel from "../Components/DisplayCarousel";
import SearchBar from "../Components/SearchBar";
import LoadingIndicator from "../Components/LoadingIndicator";

import "../LandingPage.css";

import { getCountryCode } from "../utils";

const LocalBandsPage = () => {
  const [localBands, setLocalBands] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState(0);
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);
  const [currentSavedEvents, setCurrentSavedEvents] = useState([]);

  const id = sessionStorage.getItem("userId");

  const navigation = useNavigate();

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

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigation(`/search/${newSearch}/${newCountry}/${newCity}/${newGenre}`);
  };

  const handleHeartClick = async (e) => {
    e.preventDefault();
    const faveId = e.target.id;
    const faveName = e.target.title;
    const fave = { id: faveId, name: faveName };
    let favouriteArtists = currentFaveArtists;
    if (e.target.src === "http://localhost:8000/profile-pics/Outline.png") {
      if (currentFaveArtists.length > 0) {
        setCurrentFaveArtists([...currentFaveArtists, fave]);
        favouriteArtists = [...currentFaveArtists, fave];
      } else {
        setCurrentFaveArtists([fave]);
        favouriteArtists = [fave];
      }
    } else {
      setCurrentFaveArtists(
        currentFaveArtists.filter((artist) => artist.id !== e.target.id)
      );
      favouriteArtists = currentFaveArtists.filter(
        (artist) => artist.id !== e.target.id
      );
    }
    if (id) {
      const payload = { favouriteArtists };
      try {
        await axios.put(
          `http://localhost:8000/api/user/${id}/faveArtist`,
          payload
        );
      } catch (err) {
        if (err.status === 404) {
          console.log("Resource could not be found!");
        } else {
          console.log(err.message);
        }
      }
    }
  };

  const handleEventClick = async (e) => {
    e.preventDefault();
    let eventInfo = "";
    let plannedEvents = currentSavedEvents;
    const band = JSON.parse(e.target.title);
    if (e.target.id) {
      const event = JSON.parse(e.target.id);
      if (event._id) {
        eventInfo = {
          id: event._id,
          ticketUrl: event.ticketUrl,
          profilePicture: band.profilePicture,
          name: band.name,
          date: event.date,
          startTime: event.startTime,
          venue: event.venue,
          address: event.address,
          info: event.info,
        };
      } else {
        eventInfo = {
          id: event.id,
          ticketUrl: event.ticketUrl,
          profilePicture: band.profilePicture,
          name: band.name,
          date: event.date,
          startTime: event.startTime,
          venue: event.venue,
          address: event.address,
          info: event.info,
        };
      }
    } else {
      eventInfo = band;
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
      console.log(eventInfo.id);
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
          `http://localhost:8000/api/user/${id}/plannedEvents`,
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

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios
        .get(`http://localhost:8000/api/artists/${id}`)
        .then((response) => {
          setCity(response.data.city);
          setCountry(response.data.country);
          setCountryCode(getCountryCode(response.data.country));
          if (response.data.favouriteGenre.length) {
            setGenre(response.data.favouriteGenre);
            axios
              .get(
                `http://localhost:8000/api/artists/0/${response.data.country}/${response.data.city}/${response.data.favouriteGenre}`
              )
              .then((response) => {
                setLocalBands(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setGenre(0);
            axios
              .get(
                `http://localhost:8000/api/artists/0/${response.data.country}/${response.data.city}/0`
              )
              .then((response) => {
                setLocalBands(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          setCurrentFaveArtists(response.data.favouriteArtists);
          setCurrentSavedEvents(response.data.plannedEvents);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .get("http://ip-api.com/json/?fields=countryCode,city,country")
        .then((response) => {
          setCity(response.data.city);
          setCountryCode(response.data.countryCode);
          setCountry(response.data.country);
          setGenre(0);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="landingpage-container">
      <br />
      <br />
      <div className="searchbardiv">
        <SearchBar
          onChange={handleChange}
          onChangeCity={handleChangeCity}
          onChangeCountry={handleChangeCountry}
          onChangeGenre={handleChangeGenre}
          onClick={handleSearchClick}
        />
      </div>
      <br />
      <br />
      <br />
      {isLoading ? (
        <LoadingIndicator />
      ) : localBands.length ? (
        <>
          <div className="localBandsCarouseldiv">
            {city.length > 1 && countryCode.length ? (
              <h5>{`Local Artists in ${city}, ${countryCode}:`}</h5>
            ) : city.length > 1 ? (
              <h5>{`Local Artists in ${city}:`}</h5>
            ) : countryCode.length ? (
              <h5>{`Artists in ${countryCode}:`}</h5>
            ) : (
              <h5>{`Artists:`}</h5>
            )}
            <DisplayCarousel
              bands={localBands}
              type="local"
              onHeartClick={handleHeartClick}
              currentFaveArtists={currentFaveArtists}
            />
          </div>
        </>
      ) : (
        <>
          <br />
          <br />
          <h6 style={{ color: "white" }}>No Local Artists Available</h6>
        </>
      )}
      {isLoading ? (
        <LoadingIndicator />
      ) : id ? (
        currentSavedEvents.length ? (
          <>
            <br />
            <br />
            <div className="eventdiv">
              {city.length > 1 && countryCode.length ? (
                <h5>{`Saved Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
              ) : city.length > 1 ? (
                <h5>{`Saved Upcoming Shows from Local Artists in ${city}:`}</h5>
              ) : countryCode.length ? (
                <h5>{`Saved Upcoming Shows in ${countryCode}:`}</h5>
              ) : (
                <h5>{`Saved Upcoming Shows:`}</h5>
              )}
              <SavedEvents
                className="upcoming-shows"
                events={currentSavedEvents}
                onEventClick={handleEventClick}
                type="local"
              />
            </div>
          </>
        ) : (
          <>
            <br />
            <br />
            <h6 style={{ color: "white" }}>No Saved Upcoming Local Shows</h6>
          </>
        )
      ) : null}
      {isLoading ? (
        <LoadingIndicator />
      ) : localBands.length ? (
        <>
          <br />
          <br />
          <div className="eventdiv">
            {city.length > 1 && countryCode.length ? (
              <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
            ) : city.length > 1 ? (
              <h5>{`Upcoming Shows from Local Artists in ${city}:`}</h5>
            ) : countryCode.length ? (
              <h5>{`Upcoming Shows in ${countryCode}:`}</h5>
            ) : (
              <h5>{`Upcoming Shows:`}</h5>
            )}
            <Event
              className="upcoming-shows"
              bands={localBands}
              type="local"
              currentSavedEvents={currentSavedEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </>
      ) : null}
      ;
    </div>
  );
};

export default LocalBandsPage;
