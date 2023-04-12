import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SearchBar from "../Components/SearchBar";
import axios from "axios";

const Searchpage = (props) => {
  let { name, city, country, genre } = useParams();
  const [bands, setBands] = useState([]);
  const [countryCode, setCountryCode] = useState();
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (country === "0") {
      country = "";
    }
    if (genre === "0") {
      genre = "";
    }
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&keyword=${name}&locale=*&sort=relevance,desc&city=${city}&countryCode=${country}&segmentName=Music&genreId=${genre}`
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
  }, []);

  /*   return bands.length ? (
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
      <div className="BandsCarouseldiv">
        <h5>Artists:</h5>
        <DisplayCarousel bands={bands} type="non-local" />
      </div>
      <br />
      <div>
        <LandingpageSlogan />
      </div>
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
        <Event className="upcoming-shows" bands={localBands} type="local" />
      </div>
    </div>
  ) : null;*/
};

export default Searchpage;
