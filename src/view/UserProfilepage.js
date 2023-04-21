import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Modal, Button, ModalBody } from "react-bootstrap";
import FanProfilepage from "./FanProfilepage";
import ArtistProfilepage from "./ArtistProfilepage";
import LoadingIndicator from "../Components/LoadingIndicator";
import PlannedEvents from "../Components/PlannedEvents";

const UserProfilepage = () => {
  const { userId } = useParams();
  const id = sessionStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentFaveArtists, setCurrentFaveArtists] = useState([]);
  const [currentSavedEvents, setCurrentSavedEvents] = useState([]);
  const [isTouring, setIsTouring] = useState(false);
  const navigate = useNavigate();

  const handleHeartClick = async (e) => {
    e.preventDefault();
    //console.log("clicked");
    const faveId = e.target.getAttribute("id");
    const faveName = e.target.getAttribute("title");
    const favePic = e.target.getAttribute("pic");
    const faveTouring = e.target.getAttribute("data-touring");
    const fave = {
      id: faveId,
      name: faveName,
      pic: favePic,
      touring: faveTouring,
    };
    let favouriteArtists = currentFaveArtists;
    if (
      e.target.src ===
      `${process.env.REACT_APP_BACKEND_URL}profile-pics/Outline.png`
    ) {
      if (currentFaveArtists.length > 0) {
        setCurrentFaveArtists([...currentFaveArtists, fave]);
        favouriteArtists = [...currentFaveArtists, fave];
      } else {
        setCurrentFaveArtists([fave]);
        favouriteArtists = [fave];
      }
    } else {
      setCurrentFaveArtists(
        currentFaveArtists.filter((artist) => artist.id !== e.target.id)
      );
      favouriteArtists = currentFaveArtists.filter(
        (artist) => artist.id !== e.target.id
      );
    }
    if (id) {
      const payload = { favouriteArtists };
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}api/user/${id}/faveArtist`,
          payload
        );
      } catch (err) {
        if (err.status === 404) {
          console.log("Resource could not be found!");
        } else {
          console.log(err.message);
        }
      }
    }
  };

  const handleEventClick = async (e) => {
    e.preventDefault();
    let eventInfo = "";
    let plannedEvents = currentSavedEvents;
    const event = JSON.parse(e.target.id);
    eventInfo = {
      id: event.id,
      bandId: event.bandId,
      ticketUrl: event.ticketUrl,
      profilePicture: event.profilePicture,
      artistName: event.artistName,
      date: event.date,
      startTime: event.startTime,
      venue: event.venue,
      address: event.address,
      info: event.info,
      artistType: event.artistType,
    };
    console.log(eventInfo);
    if (e.target.value === "Save Event") {
      if (currentSavedEvents.length > 0) {
        setCurrentSavedEvents([...currentSavedEvents, eventInfo]);
        plannedEvents = [...currentSavedEvents, eventInfo];
      } else {
        setCurrentSavedEvents([eventInfo]);
        plannedEvents = [eventInfo];
      }
    } else {
      setCurrentSavedEvents(
        currentSavedEvents.filter((event) => event.id !== eventInfo.id)
      );
      plannedEvents = currentSavedEvents.filter(
        (event) => event.id !== eventInfo.id
      );
      console.log(event.id);
      console.log(eventInfo.id);
    }
    if (id) {
      const payload = { plannedEvents };
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}api/user/${id}/plannedEvents`,
          payload
        );
        console.log(response);
      } catch (err) {
        if (err.status === 404) {
          console.log("Resource could not be found!");
        } else {
          console.log(err.message);
        }
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (userId.length > 20) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/user/${userId}`)
        .then((response) => {
          setUser({
            userId: userId,
            userUsername: response.data.username,
            userName: response.data.name,
            userAge: response.data.age,
            userCity: response.data.city,
            userCountry: response.data.country,
            userProfileImg:
              process.env.REACT_APP_BACKEND_URL + response.data.profilePicture,
            userBannerImg: "",
            favouriteArtists: response.data.favouriteArtists,
            bio: response.data.bio,
            songsList: response.data.songsList,
            upcomingEvents: response.data.upcomingEvents,
            plannedEvents: response.data.plannedEvents,
            userType: response.data.userType,
          });
          if (response.data.upcomingEvents.length) {
            setIsTouring(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&attractionId=${userId}&locale=*&segmentName=Music`
        )
        .then((response) => {
          const user = response.data._embedded.events[0];
          let upcomingEvents = [];
          if (user._embedded.attractions[0].upcomingEvents._total > 0) {
            setIsTouring(true);
            axios
              .get(
                `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&attractionId=${userId}&locale=*&sort=date,asc`
              )
              .then((response) => {
                const events = response.data._embedded.events;
                setUser({
                  userId: userId,
                  userUsername: "",
                  userName: user._embedded.attractions[0].name,
                  userAge: null,
                  userCity: "",
                  userCountry: "",
                  userProfileImg: user._embedded.attractions[0].images.find(
                    (element) =>
                      element.ratio === "16_9" && element.height > 150
                  ).url,
                  userBannerImg: "",
                  favouriteArtists: [],
                  bio: "Bio Unavailable",
                  songsList: [],
                  upcomingEvents: events.map((event) => {
                    if (event._embedded.venues[0].state) {
                      if (event._embedded.venues[0].generalInfo) {
                        return {
                          _id: event.id,
                          eventName: event._embedded.venues[0].name,
                          date: event.dates.start.dateTime,
                          startTime: event.dates.start.dateTime,
                          address:
                            event._embedded.venues[0].address.line1 +
                            " " +
                            event._embedded.venues[0].city.name +
                            ", " +
                            event._embedded.venues[0].state.stateCode +
                            ", " +
                            event._embedded.venues[0].country.countryCode,
                          info: event._embedded.venues[0].generalInfo
                            .generalRule,
                        };
                      } else {
                        return {
                          _id: event.id,
                          eventName: event._embedded.venues[0].name,
                          date: event.dates.start.dateTime,
                          startTime: event.dates.start.dateTime,
                          address:
                            event._embedded.venues[0].address.line1 +
                            " " +
                            event._embedded.venues[0].city.name +
                            ", " +
                            event._embedded.venues[0].state.stateCode +
                            ", " +
                            event._embedded.venues[0].country.countryCode,
                          info: "Information for this show is unavailable",
                        };
                      }
                    } else {
                      if (event._embedded.venues[0].generalInfo) {
                        return {
                          _id: event.id,
                          eventName: event._embedded.venues[0].name,
                          date: event.dates.start.dateTime,
                          startTime: event.dates.start.dateTime,
                          address:
                            event._embedded.venues[0].address.line1 +
                            " " +
                            event._embedded.venues[0].city.name +
                            ", " +
                            event._embedded.venues[0].country.countryCode,
                          info: event._embedded.venues[0].generalInfo
                            .generalRule,
                        };
                      } else {
                        return {
                          _id: event.id,
                          eventName: event._embedded.venues[0].name,
                          date: event.dates.start.dateTime,
                          startTime: event.dates.start.dateTime,
                          address:
                            event._embedded.venues[0].address.line1 +
                            " " +
                            event._embedded.venues[0].city.name +
                            ", " +
                            event._embedded.venues[0].country.countryCode,
                          info: event._embedded.venues[0].generalInfo,
                        };
                      }
                    }
                  }),
                  plannedEvents: [],
                  userType: "Artist",
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setUser({
              userId: userId,
              userUsername: "",
              userName: user._embedded.attractions[0].name,
              userAge: null,
              userCity: "",
              userCountry: "",
              userProfileImg: user._embedded.attractions[0].images.find(
                (element) => element.ratio === "16_9" && element.height > 150
              ).url,
              userBannerImg: "",
              favouriteArtists: [],
              bio: "Bio Unavailable",
              songsList: [],
              upcomingEvents: [],
              plannedEvents: [],
              userType: "Artist",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}`)
        .then((response) => {
          setCurrentFaveArtists(response.data.favouriteArtists);
          setCurrentSavedEvents(response.data.plannedEvents);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return isLoading ? (
    <div
      className="loadingdiv"
      style={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "60px",
      }}
    >
      <LoadingIndicator />
    </div>
  ) : (
    <>
      {user.userType === "Fan" ? (
        <FanProfilepage
          userData={user}
          currentFaveArtists={currentFaveArtists}
          currentSavedEvents={currentSavedEvents}
          onEventClick={handleEventClick}
          onHeartClick={handleHeartClick}
          isTouring={isTouring}
        />
      ) : user.userType === "Artist" ? (
        <ArtistProfilepage
          userData={user}
          onHeartClick={handleHeartClick}
          currentSavedEvents={currentSavedEvents}
          onEventClick={handleEventClick}
          currentFaveArtists={currentFaveArtists}
          isTouring={isTouring}
        />
      ) : null}
    </>
  );
};
export default UserProfilepage;
