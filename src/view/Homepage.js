import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";
import "../LandingPage.css";
import LandingpageSlogan from "../Components/LandingpageSlogan";
import { getCountryCode, getGenreId } from "../utils";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router";
import SearchBar from "../Components/SearchBar";

const HomePage = (props) => {
  const [bands, setBands] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [genreId, setGenreId] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState(0);
  const [favouriteArtists, setFavouriteArtists] = useState([]);
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);
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

  console.log(favouriteArtists);
  console.log(`Length: ${favouriteArtists.length}`);

  const handleHeartClick = (e) => {
    e.preventDefault();
    const faveId = e.target.id;
    const faveName = e.target.title;
    const fave = { id: faveId, name: faveName };
    if (e.target.src === "http://localhost:8000/profile-pics/Outline.png") {
      if (currentFaveArtists.length > 0) {
        console.log("Array larger than 0");
        setFavouriteArtists([...currentFaveArtists, fave]);
      } else {
        console.log("Array 0");
        setFavouriteArtists([fave]);
      }
    } else {
      setFavouriteArtists(
        currentFaveArtists.filter((artist) => artist.id !== e.target.id)
      );
    }
  };

  const handleUpdate = async () => {
    if (id) {
      const payload = { favouriteArtists };
      console.log(payload);
      try {
        const response = await axios.put(
          `http://localhost:8000/api/user/${id}/faveArtist`,
          payload
        );

        console.log(response);
      } catch (err) {
        if (err.status === 404) {
          console.log("Resource could not be found!");
        } else {
          console.log(err.message);
        }
      } finally {
        setCurrentFaveArtists(favouriteArtists);
      }
    }
  };

  useEffect(() => {
    handleUpdate();
    console.log(favouriteArtists);
  }, [favouriteArtists]);

  useEffect(() => {
    setId(sessionStorage.getItem("userId"));
  }, []);

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
      axios.get(`http://localhost:8000/api/artists/${id}`).then((response) => {
        console.log(`Response: ${response.data}`);
        setCity(response.data.city);
        console.log(city);
        setCountry(response.data.country);
        setCountryCode(getCountryCode(response.data.country));
        if (response.data.favouriteGenre.length) {
          setGenre(response.data.favouriteGenre);
        } else {
          setGenre(0);
        }
        setGenreId(getGenreId(response.data.favouriteGenre));
        setCurrentFaveArtists(response.data.favouriteArtists);
      });
    }
  }, [id]);

  useEffect(() => {
    console.log(genre);
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&locale=*&sort=relevance,desc&city=${city}&countryCode=${countryCode}&genre=${genreId}&segmentName=Music`
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
      .get(`http://localhost:8000/api/artists/0/${country}/${city}/${genre}`)
      .then((response) => {
        setLocalBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
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
          onClick={handleSearchClick}
        />
      </div>
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
              onHeartClick={handleHeartClick}
              currentFaveArtists={currentFaveArtists}
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
              onHeartClick={handleHeartClick}
              currentFaveArtists={currentFaveArtists}
            />
          </div>
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

export default HomePage;
