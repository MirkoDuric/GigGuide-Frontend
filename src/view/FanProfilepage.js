import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Image, Nav, Button, Modal, ModalBody } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Carousel from "react-grid-carousel";
import "../Profilepage.css";
import "../ArtistCard.css";
import ArtistCard from "../Components/ArtistCard";
import LoadingIndicator from "../Components/LoadingIndicator";
import PlannedEvents from "../Components/PlannedEvents";

const FanProfilepage = (userData) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let eventKey = 0;
  const user = userData.userData;
  const currentSavedEvents = userData.currentSavedEvents;
  //data that I got once I filtered the list of local artists based on the n
  const [favouriteLocalArtists, setFavouriteLocalArtists] = useState([]);
  // getting all mainstream artists from ticketmaster
  const [mainstreamArtists, setMainstreamArtists] = useState([]);

  const id = sessionStorage.getItem("userId");

  const {
    userId,
    userUsername,
    userName,
    userAge,
    userCity,
    userCountry,
    userProfileImg,
    userBannerImg,
    favouriteArtists,
    plannedEvents,
  } = user;

  /* const getArtistInfo = async () => {
    let mainstream = [];
    let local = [];
    for (let i = 0; i < favouriteArtists.length; i++) {
      const id = favouriteArtists[i].id;
      if (id.length < 20) {
        const result = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&attractionId=${id}&locale=*&segmentName=Music`
        );
        mainstream.push(result.data._embedded.events[0]);
      } else {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/artists/${id}`
        );
        local.push(result.data);
      }
      setMainstreamArtists(mainstream);
      setFavouriteLocalArtists(local);
    }
  };

  // getting basic user data
  useEffect(() => {
    setIsLoading(true);
    getArtistInfo();
    /* favouriteArtists.forEach((artist) => {
      console.log(artist.id.length); */
  /* if (artist.id.length < 20) {
        setTimeout(() => {
          console.log("paused");
        }, 6000);
        axios
          .get(
            `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&attractionId=${artist.id}&locale=*&segmentName=Music`
          )
          .then((res) => {
            if (!res.data) {
              console.log("User not found, move to the next one.");
            } else {
              setMainstreamArtists([
                ...mainstreamArtists,
                res.data._embedded.events[0],
              ]);
            }
            /* setMainstreamArtists(popularArtists); 
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}api/artists/${artist.id}`)
          .then((res) => {
            if (!res.data) {
              console.log("User not found, move to the next one.");
            } else {
              setFavouriteLocalArtists([...favouriteLocalArtists, res.data]);
            }
            /* setFavouriteLocalArtists(localArtist); 
          })
          .catch((err) => {});
      } 
    });
    setIsLoading(false);
  }, []); */

  console.log(plannedEvents);
  return user.userName ? (
    <main className="profile-container">
      <section className="img-container">
        <article>
          {userBannerImg ? (
            <Image
              fluid={true}
              className="banner-img"
              src={userBannerImg}
              alt="Banner img"
            />
          ) : null}
        </article>
        <article>
          {userProfileImg ? (
            <Image
              fluid={true}
              className="profile-img"
              roundedCircle={true}
              src={userProfileImg}
              alt="Profile img"
            />
          ) : (
            <Image
              fluid={true}
              className="no-profile-img"
              roundedCircle={true}
              alt="No profile img"
            />
          )}
        </article>
      </section>
      <section className="name-location-container">
        <article>
          <p className="name-and-age">
            {userName}, <span className="age">({userAge})</span>
          </p>
          <p className="username">({userUsername})</p>
        </article>
      </section>
      <section className="events-and-fav-artist-contaiener">
        <article className="favourite-artists-carousel">
          <p className="favourite-artists-title">My favourite artists:</p>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            cols={6}
            rows={1}
            gap={10}
            loop={true}
            scrollSnap={true}
            hideArrow={false}
            showDots={true}
            style={{ height: "100%" }}
            responsiveLayout={[
              {
                breakpoint: 1200,
                cols: 5,
                rows: 1,
                gap: 10,
                loop: true,
                hideArrow: false,
                showDots: true,
              },
              {
                breakpoint: 992,
                cols: 4,
                rows: 1,
                gap: 10,
                loop: true,
                hideArrow: false,
                showDots: true,
              },
              {
                breakpoint: 768,
                cols: 3,
                rows: 1,
                gap: 10,
                loop: true,
                hideArrow: false,
                showDots: true,
              },
              {
                breakpoint: 576,
                cols: 2,
                rows: 1,
                gap: 10,
                loop: true,
                hideArrow: false,
                showDots: true,
              },
              {
                breakpoint: 350,
                cols: 1,
                rows: 1,
                gap: 10,
                loop: true,
                hideArrow: false,
                showDots: true,
              },
            ]}
            mobileBreakpoint={3}
          >
            {favouriteArtists.length
              ? favouriteArtists.map((artist, index) => {
                  return artist ? (
                    <Carousel.Item key={index}>
                      <ArtistCard
                        className="band "
                        name={artist.name}
                        id={artist.id}
                        profilePicture={artist.pic}
                        touring={artist.touring}
                        onHeartClick={userData.onHeartClick}
                        currentFaveArtists={userData.currentFaveArtists}
                      />
                    </Carousel.Item>
                  ) : null;
                })
              : null}
          </Carousel>
        </article>
        <article className="saved-upcoming-events">
          <p className="saved-events-title">Saved upcoming events:</p>
          <PlannedEvents
            plannedEvents={plannedEvents}
            currentSavedEvents={currentSavedEvents}
            onEventClick={userData.onEventClick}
          />

          {/* plannedEvents.length !== 0 ? (
            plannedEvents.map((event, index) => {
              return event.address ? (
                <Accordion key={index}>
                  <AccordionItem eventKey={index}>
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Figure>
                          <Figure.Image
                            width={"100%"}
                            src={`${process.env.REACT_APP_BACKEND_URL}${event.profilePicture}`}
                            alt="Artist Image"
                          />
                        </Figure>
                      </div>
                      <div className="col eventTitle">
                        <h3>{event.artistName}</h3>
                        <p>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="row">
                        <h3>{event.venue}</h3>
                      </div>
                      <div className="row">
                        <p className="venueAddress">{event.address}</p>
                        <p>{event.info}</p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Accordion key={index}>
                  <AccordionItem eventKey={index}>
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Figure>
                          <Figure.Image
                            width={"100%"}
                            src={`${event.images[0].url}`}
                            alt="Artist Image"
                          />
                        </Figure>
                      </div>
                      <div className="col eventTitle">
                        <h3>{event.name}</h3>
                        <p>
                          {new Date(
                            event.dates.start.dateTime
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="row">
                        <h3>{event._embedded.venues[0].name}</h3>
                      </div>
                      <div className="row">
                        <p className="venueAddress">
                          {event._embedded.venues.address},
                          {event._embedded.venues.city},
                          {event._embedded.venues.country}
                        </p>
                        <p>{event.info ? event.info : "No additional info"}</p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              );
            })
          ) : (
            <p className="no-saved-events">Still no events saved!</p>
          )} */}
        </article>
        {/* <article className="favourite-artists-events">
          <p className="favourite-artists-events">
            Your favourite artists events :
          </p>
          <Accordion className="accordion">
            {favouriteLocalArtists.length
              ? favouriteLocalArtists.map((artist, index) => {
                  return artist?.upcomingEvents.length ? (
                    <AccordionItem eventKey={index}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              src={`${process.env.REACT_APP_BACKEND_URL}${artist.profilePicture}`}
                              alt="Artist Image"
                            />
                          </Figure>
                        </div>
                        <div className="col eventTitle">
                          <h3>{artist.name}</h3>
                          <p>
                            {new Date(
                              artist.upcomingEvents[index].date ?? ""
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <div className="row">
                          <h3>{artist.upcomingEvents[index].venue ?? ""}</h3>
                          <p className="venueAddress">
                            {artist.upcomingEvents[index].address ?? ""}
                          </p>
                        </div>
                        <div className="row">
                          <p>{artist.upcomingEvents[index].info ?? ""}</p>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  ) : null;
                })
              : null}
            {mainstreamArtists.length
              ? mainstreamArtists.map((artist, index) => {
                  return artist ? (
                    <AccordionItem
                      eventKey={index + favouriteLocalArtists.length}
                    >
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              src={
                                artist.images.find(
                                  (element) =>
                                    element.ratio === "16_9" &&
                                    element.height > 150
                                ).url
                              }
                              alt="Artist Image"
                            />
                          </Figure>
                        </div>
                        <div className="col eventTitle">
                          <h3>{artist._embedded.attractions[0].name}</h3>
                          <p>
                            {new Date(
                              artist.dates.start.dateTime ?? ""
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            ,{" "}
                            {new Date(
                              artist.dates.start.dateTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <a href={`${artist.url}`}>
                          <div className="row">
                            <h3>
                              {artist._embedded.venues[0].venue
                                ? artist._embedded.venues[0].venue
                                : artist.name}
                            </h3>
                            <p className="venueAddress">
                              {artist._embedded.venues[0].address.line1},{" "}
                              {artist._embedded.venues[0].city.name},{" "}
                              {/* {artist._embedded.venues[0].state.name}{" "} 
                              {artist._embedded.venues[0].postalCode},{" "}
                              {artist._embedded.venues[0].country.name}
                            </p>
                          </div>
                        </a>
                        <div className="row">
                          <p>{artist.info ?? "No additional info"}</p>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  ) : null;
                })
              : null}
          </Accordion>
        </article> */}
      </section>
    </main>
  ) : (
    <Modal show={true} centered>
      <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
        <Modal.Title>Profile Not Found</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Homepage
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default FanProfilepage;
