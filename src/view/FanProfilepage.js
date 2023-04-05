import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import Event from "../Components/Event";
import axios from "axios";
import "../Profilepage.css";
const FanProfilepage = () => {
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
  return (
    <main className="profile-container">
      <section className="image-container">
        <Image fluid={true} className="banner-img" src alt="Banner Image" />
        <Image className="profile-img" alt="Profile Image" />
      </section>
      <section className="name-country-city">
        <p className="name-field">Mirko Duric</p>
        <p className="city-country-field">Munich, Germany</p>
      </section>
      <section className="saved-events">
        <div className="eventdiv">
          <h5>{`Upcoming Shows from Local Artists in ${city}, ${countryCode}:`}</h5>
          <Event bands={localBands} type="local" />
        </div>
      </section>
    </main>
  );
};

export default FanProfilepage;
