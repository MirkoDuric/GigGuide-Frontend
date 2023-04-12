import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { getCountryCode, getGenreId, countryNames, genreNames } from "../utils";
import "../SearchBar.css";

import axios from "axios";

const SearchBar = (props) => {
  //let search = "";
  const [search, setSearch] = useState(0);
  //let genre = "";
  const [genre, setGenre] = useState(0);
  const [genreId, setGenreId] = useState("");
  //let city = "";
  const [city, setCity] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  //let country = "";
  const [country, setCountry] = useState(0);
  const [searchType, setSearchType] = useState("mainstream");
  const navigation = useNavigate();

  useEffect(() => {
    if (search === "") {
      //search = 0;
      setSearch(0);
    }
    if (country === "" || country === "None") {
      //country = 0;
      setCountry(0);
    }
    if (city === "") {
      //city = 0;
      setCity(0);
    }
    if (genre === "" || genre === "None") {
      //genre = 0;
      setGenre(0);
    }
  }, [search, city, country, genre]);
  const onChange = (e) => {
    //search = e.target.value;
    setSearch(e.target.value);
  };

  const onChangeCity = (e) => {
    //city = e.target.value;
    setCity(e.target.value);
  };

  const onChangeCountry = (e) => {
    //country = e.target.value;
    setCountry(e.target.value);
    setCountryCode(getCountryCode(e.target.value));
  };

  const onChangeGenre = (e) => {
    //genre = e.target.value;
    setGenre(e.target.value);
    setGenreId(getGenreId(e.target.value));
  };

  const onClick = async (e) => {
    e.preventDefault();
    navigation(`/search/${search}/${country}/${city}/${genre}`);
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
      <Col className="submitbuttondiv">
        <Button variant="primary" /* type="submit" */ onClick={onClick}>
          Search
        </Button>
      </Col>
    </Form>
  );
};

export default SearchBar;
