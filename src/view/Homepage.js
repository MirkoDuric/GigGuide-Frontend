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
    axios.get(`http://localhost:8000/api/artists/${id}`).then((response) => {
      console.log(`Response: ${response.data}`);
      setCity(response.data.city);
      setCountry(response.data.country);
      setCountryCode(getCountryCode(response.data.country));
      setGenre(response.data.favouriteGenre);
      setGenreId(getGenreId(response.data.favouriteGenre));
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&locale=*&sort=relevance,desc&city=${city}&countryCode=${countryCode}&genre={genreId}&segmentName=Music`
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
      .get("http://localhost:8000/api/artists/0/${country}/${city}/${genre}")
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
      <Navbar bg="light" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">
            <div className="col Logodiv">
              <Button name="Logo" /> {"  "}
              <span className="titlespan">
                <span className="titlespan-bold">Gig</span>Guide
              </span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                <div className="col Logodiv">
                  <Button name="Logo" /> {"  "}
                  <span className="titlespan">
                    <span className="titlespan-bold">Gig</span>Guide
                  </span>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href={`/home`}>Home</Nav.Link>
                <Nav.Link href={`/user/fan/${id}`}>Profile</Nav.Link>
                <Nav.Link href={`/search/0/0/0/0`}>Search</Nav.Link>
                <Nav.Link href={`/user/fan/:id`}>Local Artists</Nav.Link>
                <Nav.Link href={`#action2`}>My Events</Nav.Link>
                <Nav.Link href={`/`}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
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
      <br />
      <div>
        <LandingpageSlogan />
      </div>
      <br />
      {bands.length ? (
        <>
          <div className="BandsCarouseldiv">
            <h5>Artists:</h5>
            <DisplayCarousel bands={bands} type="non-local" />
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
            <DisplayCarousel bands={localBands} type="local" />
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
