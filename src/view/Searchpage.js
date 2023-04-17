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

  const genreId = getGenreId(genre);
  const countryCode = getCountryCode(country);

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

  useEffect(() => {
    setIsLoading(true);
    if (!name) {
      name = 0;
    }
    axios
      .get(
        `http://localhost:8000/api/artists/${name}/${country}/${city}/${genre}`
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

          <Event bands={bands} type="non-local" />
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
            <h5>{`Upcoming Shows:`}</h5>
          )}
          <Event className="upcoming-shows" bands={localBands} type="local" />
        </div>
      ) : (
        <div>No Matching Restults</div>
      )}
    </div>
  );
};

export default Searchpage;
