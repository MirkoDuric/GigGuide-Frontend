import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";
import "../LandingPage.css";

const LandingPage = (props) => {
  const [bands, setBands] = useState([]);
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
  }, []);
  console.log(localBands);
  return localBands.length ? (
    <>
      <div className="buttonsdiv">
        <Button name="Local Artists" />
        <Button name="Signup" />
        <Button name="Login" />
      </div>
      <div className="localBandsCarouseldiv">
        <h5>Local Artists:</h5>
        <DisplayCarousel bands={localBands} />
      </div>
      <div className="overflow-auto" style={{ maxHeight: "20rem" }}>
        <h5>Upcoming Local Shows:</h5>
        <Event bands={localBands} type="local" />
      </div>
    </>
  ) : null;
};

export default LandingPage;
