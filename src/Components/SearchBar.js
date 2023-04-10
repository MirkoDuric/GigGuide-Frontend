import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { getCountryCode, getGenreId, countryNames, genreNames } from "../utils";
import "../SearchBar.css";

import axios from "axios";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [genreId, setGenreId] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [searchType, setSearchType] = useState("mainstream");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    setCountryCode(getCountryCode(e.target.value));
  };

  const onChangeGenre = (e) => {
    setGenre(e.target.value);
    setGenreId(getGenreId(e.target.value));
  };

  const onClick = (e) => {
    e.preventDefault();
    if (searchType === "mainstream") {
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&keyword=${search}&locale=*&sort=relevance,desc&city=${city}&countryCode=${countryCode}&segmentName=Music&genreId=${genreId}`
        )
        .then((response) => {
          console.log(response);
          //setBands(response.data._embedded.events);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //setIsLoading(false);
        });
    }
    if (searchType === "local") {
      axios
        .get(
          `https://localhost:8000/artists/name=${search}&sort=relevance,desc&city=${city}&country=${country}&genre=${genre}`
        )
        .then((response) => {
          console.log(response);
          //setBands(response.data._embedded.events);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //setIsLoading(false);
        });
    }
  };

  return (
    <Form>
      <Row className="searchdiv">
        <Col className="mb-3 col-10 col-md-9" controlId="search">
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row className="mb-3 subsearchdiv">
        <Col className="col-3 col-md-3">
          <Form.Control
            type="search"
            placeholder="City"
            onChange={onChangeCity}
          />
        </Col>
        <Col className="col-4 col-md-3">
          <Form.Select onChange={onChangeCountry} placeholder="Country">
            <option key="blankChoice" hidden value>
              {" "}
              --Country--{" "}
            </option>
            <option>None</option>
            {countryNames.map((countryName) => {
              return <option key={countryName}>{countryName}</option>;
            })}
          </Form.Select>
        </Col>
        <Col className="col-3 col-md-3">
          <Form.Select onChange={onChangeGenre} placeholder="Genre">
            <option key="blankChoice" hidden value>
              {" "}
              --Genre--{" "}
            </option>
            <option>None</option>
            {genreNames.map((genreName) => {
              return <option>{genreName}</option>;
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row className="searchtypediv">
        <Col className="mainstreamdiv">
          <Form.Check
            inline
            label="Mainstream Artists"
            type="radio"
            id="mainstream"
            name="searchType"
            value="mainstream"
            checked={searchType === "mainstream"}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Check
            inline
            label="Local Artists"
            type="radio"
            id="local"
            name="searchType"
            value="local"
            checked={searchType === "local"}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </Col>
      </Row>
      <Col className="submitbuttondiv">
        <Button variant="primary" /* type="submit" */ onClick={onClick}>
          Search
        </Button>
      </Col>
    </Form>
  );
};

export default SearchBar;
