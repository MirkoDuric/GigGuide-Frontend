import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "../Components/Button";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";
import "../LandingPage.css";

const LandingPage = (props) => {
  const [bands, setBands] = useState([]);
  const [city, setCity] = useState();
  const [countryCode, setCountryCode] = useState();
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/api/artists")
      .then((response) => {
        setLocalBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    axios
      .get("http://ip-api.com/json/?fields=countryCode,city")
      .then((response) => {
        setCity(response.data.city);
        setCountryCode(response.data.countryCode);
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
  }, [city, countryCode]);

  console.log(bands);
  return bands.length ? (
    <>
      <Navbar className="Navdiv" fixed="top">
        <div className="col Logodiv">
          <Button name="Logo" /> {"  "}
          <span className="titlespan">GigGuide</span>
        </div>
        <div className="col buttonsdiv">
          <Button name="Local Artists" />
          <Button name="Signup" />
          <Button name="Login" />
        </div>
      </Navbar>
      <br />
      <br />
      <div className="BandsCarouseldiv">
        <h5>Artists:</h5>
        <DisplayCarousel bands={bands} type="non-local" />
      </div>
      <br />
      <br />
      <div className="localBandsCarouseldiv">
        <h5>{`Local Artists in ${city}, ${countryCode}:`}</h5>
        <DisplayCarousel bands={localBands} type="local" />
      </div>
      <br />
      <br />
      <div className="eventdiv">
        <h5>{`Upcoming Shows in ${city}, ${countryCode}:`}</h5>
        <Event bands={bands} type="non-local" />
      </div>
      <br />
      <br />
      <div className="eventdiv">
        <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
        <Event bands={localBands} type="local" />
      </div>
    </>
  ) : null;
};

export default LandingPage;
