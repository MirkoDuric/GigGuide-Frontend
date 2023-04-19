import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FanProfilepage from "./FanProfilepage";
import ArtistProfilepage from "./ArtistProfilepage";

const UserProfilepage = () => {
  const { userId } = useParams();
  const id = sessionStorage.getItem("userId");
  const [user, setUser] = useState({
    userUsername: "",
    userName: "",
    userAge: null,
    userCity: "",
    userCountry: "",
    userProfileImg: "",
    userBannerImg: "",
    favouriteArtists: [],
    bio: "",
    songsList: [],
    upcomingEvents: [],
    plannedEvents: [],
    userType: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/user/${userId}`)
      .then((response) => {
        setUser({
          userUsername: response.data.username,
          userName: response.data.name,
          userAge: response.data.age,
          userCity: response.data.city,
          userCountry: response.data.country,
          userProfileImg: response.data.profilePicture,
          userBannerImg: "",
          favouriteArtists: response.data.favouriteArtists,
          bio: response.data.bio,
          songsList: response.data.songsList,
          upcomingEvents: response.data.upcomingEvents,
          plannedEvents: response.data.plannedEvents,
          userType: response.data.userType,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.request.status === 500) {
          axios
            .get(
              `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&attractionId=${userId}&locale=*&segmentName=Music`
            )
            .then((response) => {
              const user = response.data._embedded.events[0];
              let upcomingEvents = [9];
              if (user._embedded.attractions[0].upcomingEvents._total > 0) {
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
                    (element) =>
                      element.ratio === "16_9" && element.height > 150
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
            });
        }
      });
  }, []);
  return (
    <>
      {user.userType === "Fan" ? (
        <FanProfilepage userData={user} />
      ) : (
        <>
          {user.userType === "Artist" ? (
            <ArtistProfilepage userData={user} />
          ) : null}
        </>
      )}
    </>
  );
};
export default UserProfilepage;
