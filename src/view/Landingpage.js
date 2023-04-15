import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "../Components/Button";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";
import "../LandingPage.css";
import LandingpageSlogan from "../Components/LandingpageSlogan";
import { useNavigate } from "react-router";
import SearchBar from "../Components/SearchBar";

const LandingPage = (props) => {
  const [bands, setBands] = useState([]);
  const [city, setCity] = useState();
  const [countryCode, setCountryCode] = useState();
  const [localBands, setLocalBands] = useState([]);
  const [name, setName] = useState(0);
  const [genre, setGenre] = useState(0);
  const [country, setCountry] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [genreId, setGenreId] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const [favouriteArtists, setFavouriteArtists] = useState([]);
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);

  const [id, setId] = useState(sessionStorage.getItem("userId"));

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
    /* axios
      .get("http://localhost:8000/api/artists")
      .then((response) => {
        setLocalBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      }); */
    axios
      .get("http://ip-api.com/json/?fields=countryCode,city,country")
      .then((response) => {
        setCity(response.data.city);
        setCountryCode(response.data.countryCode);
        setCountry(response.data.country);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&locale=*&sort=relevance,desc&city=${city}&countryCode=${countryCode}&segmentName=Music`
      )
      .then((response) => {
        console.log(response);
        setBands(response.data._embedded.events);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        //setIsLoading(false);
      });
  }, [city, countryCode]);

  console.log(bands);
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
      {bands.length ? (
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
