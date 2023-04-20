import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import LandingpageSlogan from "../Components/LandingpageSlogan";
import SearchBar from "../Components/SearchBar";
import LoadingIndicator from "../Components/LoadingIndicator";

import "../LandingPage.css";

const LandingPage = (props) => {
  const [bands, setBands] = useState([]);
  const [localBands, setLocalBands] = useState([]);
  const [city, setCity] = useState();
  const [countryCode, setCountryCode] = useState();
  const [country, setCountry] = useState(0);
  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const name = 0;
  const genre = 0;
  const favouriteArtists = [];
  const currentFaveArtists = [];
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

  const handleClick = (e) => {
    e.preventDefault();
    navigation(`/search/${newSearch}/${newCountry}/${newCity}/${newGenre}`);
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
    if (id) {
      navigation("/homepage");
    }
    setIsLoading(true);
    axios
      .get("http://ip-api.com/json/?fields=countryCode,city,country")
      .then((response) => {
        setCity(response.data.city);
        setCountryCode(response.data.countryCode);
        setCountry(response.data.country);
        axios
          .get(
            `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&locale=*&sort=date,asc&city=${response.data.city}&countryCode=${response.data.countryCode}&segmentName=Music`
          )
          .then((response) => {
            console.log(response);
            setBands(response.data._embedded.events);
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}api/artists/${name}/${response.data.country}/${response.data.city}/${genre}`
          )
          .then((response) => {
            setLocalBands(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          onClick={handleClick}
        />
      </div>
      <br />
      <br />
      <div>
        <LandingpageSlogan />
      </div>
      <br />
      {isLoading ? (
        <LoadingIndicator />
      ) : bands.length ? (
        <>
          <div className="BandsCarouseldiv">
            <h5>Artists:</h5>
            <DisplayCarousel
              bands={bands}
              type="non-local"
              favouriteArtists={favouriteArtists}
            />
          </div>
          <br />
          <div className="eventdiv">
            <h5>{`Upcoming Shows in ${city}, ${countryCode}:`}</h5>
            <Event bands={bands} type="non-local" />
          </div>
        </>
      ) : null}
      ;
      <br />
      <br />
      {localBands.length ? (
        <>
          <div className="localBandsCarouseldiv">
            <h5>{`Local Artists in ${city}, ${countryCode}:`}</h5>
            <DisplayCarousel
              bands={localBands}
              type="local"
              currentFaveArtists={currentFaveArtists}
            />
          </div>
        </>
      ) : (
        <>
          <br />
          <br />
          <div className="eventdiv">
            <h5>{`Local Artists in ${city}, ${countryCode}:`}</h5>
          </div>
          <>
            <div className="noShowsdiv">
              <h6>No Local Artists Available</h6>
            </div>
          </>
        </>
      )}
      {localBands.length ? (
        <>
          <br />
          <br />
          <div className="eventdiv">
            <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
            <Event className="upcoming-shows" bands={localBands} type="local" />
          </div>
        </>
      ) : null}
      ;
    </div>
  );
};

export default LandingPage;
