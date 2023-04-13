import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import { getCountryCode, getGenreId } from "../utils";
import { useNavigate } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Button from "../Components/Button";
import Event from "../Components/Event";

const Searchpage = (props) => {
  let { name, city, country, genre } = useParams();
  const genreId = getGenreId(genre);
  const countryCode = getCountryCode(country);
  const [bands, setBands] = useState([]);
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
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

  const handleClick = (e) => {
    e.preventDefault();
    navigation(`/search/${newSearch}/${newCountry}/${newCity}/${newGenre}`);
  };

  useEffect(() => {
    if (newSearch === "") {
      setNewSearch(0);
    }
    if (newCountry === "" || country === "None") {
      setNewCountry(0);
    }
    if (newCity === "") {
      setNewCity(0);
    }
    if (newGenre === "" || genre === "None") {
      setNewGenre(0);
    }
  }, [newSearch, newCity, newCountry, newGenre]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `http://localhost:8000/api/artists/${name}/${country}/${city}/${genre}`
      )
      .then((response) => {
        console.log(response);
        setLocalBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        //setIsLoading(false);
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
        console.log(response);
        setBands(response.data._embedded.events);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        //setIsLoading(false);
      });
  }, [countryCode, genreId]);

  console.log(bands);
  console.log(localBands);

  return (
    <div className="landingpage-container">
      <Navbar className="Navdiv" fixed="top">
        <div className="col Logodiv">
          <Button name="Logo" /> {"  "}
          <span className="titlespan">
            <span className="titlespan-bold">Gig</span>Guide
          </span>
        </div>
        <div className="col buttonsdiv">
          <Button name="Local Artists" />
          <Button name="Signup" />
          <Button name="Login" />
        </div>
      </Navbar>
      <br />
      <br />
      <div className="searchbardiv">
        <SearchBar
          onChange={handleChange}
          onChangeCity={handleChangeCity}
          onChangeCountry={handleChangeCountry}
          onChangeGenre={handleChangeGenre}
          onClick={handleClick}
        />
      </div>
      {bands.length ? (
        <div className="eventdiv">
          <h5>{`Upcoming Shows in ${city}, ${countryCode}:`}</h5>
          <Event bands={bands} type="non-local" />
        </div>
      ) : (
        <div>No Matching Results</div>
      )}

      <br />
      <br />
      {localBands.length ? (
        <div className="eventdiv">
          <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
          <Event className="upcoming-shows" bands={localBands} type="local" />
        </div>
      ) : (
        <div>No Matching Restults</div>
      )}
    </div>
  );
};

export default Searchpage;
