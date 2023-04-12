import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { countryNames, genreNames } from "../utils";

import "../SearchBar.css";

const SearchBar = (props) => {
  const [search, setSearch] = useState(0);
  const [genre, setGenre] = useState(0);
  const [genreId, setGenreId] = useState("");
  const [city, setCity] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    if (search === "") {
      setSearch(0);
    }
    if (country === "" || country === "None") {
      setCountry(0);
    }
    if (city === "") {
      setCity(0);
    }
    if (genre === "" || genre === "None") {
      setGenre(0);
    }
  }, [search, city, country, genre]);
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeGenre = (e) => {
    setGenre(e.target.value);
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
