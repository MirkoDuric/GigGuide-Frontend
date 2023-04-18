import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Image } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import Carousel from "react-grid-carousel";
import "../Profilepage.css";
import "../ArtistCard.css";
import ArtistCard from "../Components/ArtistCard";
import LoadingIndicator from "../Components/LoadingIndicator";

const FanProfilepage = (userData) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const user = userData.userData;

  //data that I got once I filtered the list of local artists based on the n
  const [favouriteLocalArtists, setFavouriteLocalArtists] = useState([]);
  // getting all mainstream artists from ticketmaster
  const [mainstreamArtists, setMainstreamArtists] = useState([]);

  // const id = sessionStorage.getItem("userId");

  const {
    userUsername,
    userName,
    userAge,
    userCity,
    userCountry,
    userProfileImg,
    userBannerImg,
    favouriteArtists,
    planedEvents,
  } = user;

  // getting basic user data
  useEffect(() => {
    console.log(user);
    let localArtist = [];
    for (const artist of favouriteArtists) {
      axios
        .get(`http://localhost:8000/api/artists/${artist.id}`)
        .then((res) => {
          if (!res.data) {
            console.log("User not found, move to the next one.");
          } else {
            console.log(res.data);
            localArtist = [...favouriteLocalArtists, res.data];
            console.log("My locals array", localArtist);
          }
          setFavouriteLocalArtists(localArtist);
          console.log("My final locals array", favouriteLocalArtists);
        })
        .catch((err) => {
          console.log(err);
        });

      let popularArtists = [];
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API}&keyword=${artist.name}`
        )
        .then((res) => {
          if (!res.data) {
            console.log("User not found, move to the next one.");
          } else {
            console.log(res.data);
            popularArtists = [
              ...mainstreamArtists,
              res.data._embedded.events[0],
            ];
            console.log("My populars array", popularArtists);
          }
          setMainstreamArtists(popularArtists);
          console.log("My final populars array", mainstreamArtists);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <main className="profile-container">
      <section className="img-container">
        <article>
          {userProfileImg ? (
            <Image
              fluid={true}
              className="banner-img"
              src={`http://localhost:8000/${userProfileImg}`}
              alt="Banner img"
            />
          ) : (
            <Image fluid={true} className="no-banner-img" alt="No banner img" />
          )}
        </article>
        <article>
          {userProfileImg ? (
            <Image
              fluid={true}
              className="profile-img"
              roundedCircle={true}
              src={`http://localhost:8000/${userProfileImg}`}
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
        <article className="saved-upcoming-events">
          <p className="saved-events-title">Saved upcoming events:</p>
          {planedEvents ? (
            planedEvents.map((event, index) => {
              return (
                <Accordion key={index}>
                  <AccordionItem eventKey={index}>
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Figure>
                          <Figure.Image
                            width={"100%"}
                            src={`http://localhost:8000/${event.profilePicture}`}
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
                        <h5>{event.venue}</h5>
                      </div>
                      <div className="row">
                        <p className="venueAddress">{event.address}</p>
                        <p>{event.info}</p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              );
            })
          ) : (
            <p className="no-saved-events">Still no events saved!</p>
          )}
        </article>
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
            {favouriteLocalArtists.length
              ? favouriteLocalArtists.map((artist, index) => {
                  return artist ? (
                    <Carousel.Item key={index}>
                      <ArtistCard
                        currentFaveArtists={artist}
                        className="band"
                        name={artist.name}
                        id={artist._id}
                        profilePicture={`http://localhost:8000/${artist.profilePicture}`}
                      />
                    </Carousel.Item>
                  ) : null;
                })
              : null}
            {mainstreamArtists.length
              ? mainstreamArtists.map((artist, index) => {
                  return artist ? (
                    <Carousel.Item key={index + favouriteLocalArtists.length}>
                      <ArtistCard
                        className="band"
                        currentFaveArtists={artist}
                        name={artist.name}
                        id={artist.id}
                        profilePicture={
                          artist.images &&
                          artist.images.find(
                            (element) =>
                              element.ratio === "16_9" && element.height > 150
                          )?.url
                        }
                      />
                    </Carousel.Item>
                  ) : null;
                })
              : null}
          </Carousel>
        </article>
        <article className="favourite-artists-events">
          <p className="favourite-artists-events">
            Your favourite artists events :
          </p>
          <Accordion className="accordion">
            {favouriteLocalArtists.length !== 0
              ? favouriteLocalArtists.map((artist, index) => {
                  return artist?.upcomingEvents ? (
                    <AccordionItem eventKey={index}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              src={`http://localhost:8000/${artist.profilePicture}`}
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
            {mainstreamArtists.length !== 0
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
                            <h3>{artist._embedded.venues[0].name ?? ""}</h3>
                            <p className="venueAddress">
                              {artist._embedded.venues[0].address.line1},{" "}
                              {artist._embedded.venues[0].city.name},{" "}
                              {artist._embedded.venues[0].state.name}{" "}
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
        </article>
      </section>
    </main>
  );
};

export default FanProfilepage;
