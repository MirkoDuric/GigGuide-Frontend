import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import Event from "../Components/Event";
import DisplayCarousel from "../Components/DisplayCarousel";
import axios from "axios";

const LandingPage = (props) => {
  const [bands, setBands] = useState([]);
  const [localBands, setLocalBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/api/artists")
      .then((response) => {
        setLocalBands(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return localBands.length ? (
    <>
      <div>
        <Button name="Local Artists" />
        <Button name="Signup" />
        <Button name="Login" />
      </div>
      <div>
        <DisplayCarousel bands={localBands} />
      </div>
      <div>
        <Event bands={localBands} type="local" />
      </div>
    </>
  ) : null;
};

export default LandingPage;
