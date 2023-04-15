import React, { useState, useEffect } from "react";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";
import "../LandingPage.css";
import LandingpageSlogan from "../Components/LandingpageSlogan";
import { getCountryCode, getGenreId } from "../utils";
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
  const [id, setId] = useState(sessionStorage.getItem("userId"));
  const [newSearch, setNewSearch] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [genreId, setGenreId] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState(0);
  const [favouriteArtists, setFavouriteArtists] = useState([]);
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
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

  const handleHeartClick = (e) => {
    e.preventDefault();
    const faveId = e.target.id;
    const faveName = e.target.title;
    const fave = { id: faveId, name: faveName };
    if (e.target.src === "http://localhost:8000/profile-pics/Outline.png") {
      if (currentFaveArtists.length > 0) {
        setFavouriteArtists([...currentFaveArtists, fave]);
      } else {
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
  }, [favouriteArtists]);

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
        setCity(response.data.city);
        setCountry(response.data.country);
        setCountryCode(getCountryCode(response.data.country));
        if (response.data.favouriteGenre.length) {
          setGenre(response.data.favouriteGenre);
        } else {
          setGenre(0);
        }
        setGenreId(getGenreId(response.data.favouriteGenre));
        setCurrentFaveArtists(response.data.favouriteArtists);
        setSavedEvents(response.data.plannedEvents);
      });
    } else {
      axios
        .get("http://ip-api.com/json/?fields=countryCode,city,country")
        .then((response) => {
          setCity(response.data.city);
          setCountryCode(response.data.countryCode);
          setCountry(response.data.country);
          setGenre(0);
        });
    }
  }, []);

  useEffect(() => {
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
  }, [city]);

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
        </>
      ) : (
        <>
          <br />
          <br />
          <h6 style={{ color: "white" }}>No Local Artists Available</h6>
        </>
      )}
      {id ? (
        savedEvents.length ? (
          <>
            <br />
            <br />
            <div className="eventdiv">
              <h5>{`Saved Local Artists in ${city}, ${countryCode}:`}</h5>
              <Event
                className="upcoming-shows"
                bands={savedEvents}
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

export default HomePage;
