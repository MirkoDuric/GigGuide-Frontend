import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import "../Profilepage.css";
import "../ArtistCard.css";
import Carousel from "react-grid-carousel";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Modal, Form } from "react-bootstrap";
import Datetime from "react-datetime";
import moment from "moment";
import LoadingIndicator from "../Components/LoadingIndicator";
import { getCountryCode } from "../utils";
import { Nav } from "react-bootstrap";

const EventsPage = () => {
  const { userId, eventId } = useParams();
  const id = sessionStorage.getItem("userId");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventInfo, setEventInfo] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newEventAddress, setNewEventAddress] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventInfo, setNewEventInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [userBannerImg, setUserBannerImg] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [artistName, setArtistName] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [currentSavedEvents, setCurrentSavedEvents] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  let eventKey = 0;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/artists/${userId}`)
      .then((response) => {
        setUserName(response.data.name);
        setUserBannerImg(response.data.bannerPicture);
        setUserProfileImg(response.data.profilePicture);
        setUserUsername(response.data.username);
        setArtistName(response.data.name);
        setUpcomingEvents(response.data.upcomingEvents);
        const event = response.data.upcomingEvents.filter(
          (upcomingEvent) => upcomingEvent._id === eventId
        );
        setEventDate({ _d: event[0].date.toString() });
        setEventVenue(event[0].venue);
        setEventInfo(event[0].info);
        setEventAddress(event[0].address);
        setEventName(event[0].eventName);
        setNewEventDate({ _d: event[0].date.toString() });
        setNewEventVenue(event[0].venue);
        setNewEventInfo(event[0].info);
        setNewEventAddress(event[0].address);
        setNewEventName(event[0].eventName);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (id) {
      axios
        .get(`http://localhost:8000/api/artists/${id}`)
        .then((response) => {
          setCity(response.data.city);
          setCountry(response.data.country);
          setCountryCode(getCountryCode(response.data.country));
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

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const date = new Date(newEventDate._d).toISOString();
    const info = newEventInfo;
    const address = newEventAddress;
    const venue = newEventVenue;
    const eventName = newEventName;
    setEventDate(date);
    setEventInfo(newEventInfo);
    setEventAddress(newEventAddress);
    setEventVenue(newEventVenue);
    setEventName(newEventName);

    const headers = { "Content-Type": "application/json" };
    const payload = {
      eventName,
      artistName,
      date,
      startTime: date,
      venue,
      address,
      info,
    };

    axios
      .put(
        `http://localhost:8000/api/user/${userId}/upcomingEvent/${eventId}`,
        payload,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data); // log the edited event object
        setSuccess(true);
        setTimeout(() => {
          navigate(`/userprofile`);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowEventModal(false);
      });
  };

  const handleEventClick = async (e) => {
    e.preventDefault();
    let eventInfo = "";
    let plannedEvents = currentSavedEvents;
    const band = JSON.parse(e.target.title);
    if (e.target.id) {
      const event = JSON.parse(e.target.id);
      eventInfo = {
        id: event._id,
        ticketUrl: event.ticketUrl,
        profilePicture: band.profilePicture,
        artistName: band.name,
        date: event.date,
        startTime: event.startTime,
        venue: event.venue,
        address: event.address,
        info: event.info,
      };
    } else {
      eventInfo = band;
    }
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
    }
    if (id) {
      const payload = { plannedEvents };
      try {
        const response = await axios.put(
          `http://localhost:8000/api/user/${id}/plannedEvents`,
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

  return success ? (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Upcoming Show Updated!</Modal.Title>
      </Modal.Header>
    </Modal>
  ) : isLoading ? (
    <LoadingIndicator />
  ) : (
    <main className="profile-container">
      <section className="img-container">
        <article>
          {userBannerImg ? (
            <Image
              fluid={true}
              className="banner-img"
              src={`http://localhost:8000/${userBannerImg}`}
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
          <p className="name">{userName}</p>
          <p className="username">{userUsername}</p>
        </article>
        {id === userId ? (
          <article className="edit-event-container">
            <Button
              className="create-event-button"
              variant="primary"
              onClick={() => setShowEventModal(true)}
            >
              Edit Event
            </Button>
          </article>
        ) : null}
      </section>
      <section className="artist-bio">
        <p className="bio-title">{eventName} Information:</p>
        <div className="info-div">
          {eventInfo.length ? (
            <p className="info-textarea">{eventInfo}</p>
          ) : eventInfo === "" ? (
            <p>{"No Event Info"}</p>
          ) : (
            <p>{eventInfo}</p>
          )}
        </div>
      </section>
      <section className="events-and-fav-artist-contaiener">
        <article className="favourite-artists-events">
          <p className="event-list-title">
            More Upcoming Shows From {userName}:
          </p>
          <Accordion className="accordion">
            {upcomingEvents.length ? (
              upcomingEvents.map((event) => {
                eventKey++;
                return (
                  <AccordionItem className="AcordionItem" eventKey={eventKey}>
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Nav.Link href={`/${userId}/event/${event._id}`}>
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              src={`http://localhost:8000/${userProfileImg}`}
                              alt="Artist Image"
                            />
                          </Figure>
                        </Nav.Link>
                      </div>
                      <div className="col eventTitle">
                        <h2>{userName}</h2>
                        <h3>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          ,{" "}
                          {new Date(event.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </h3>
                      </div>
                    </AccordionHeader>
                    <Accordion.Body>
                      <Nav.Link href={`/${userId}/event/${event._id}`}>
                        <div className="row">
                          <p>{event.venue} </p>
                          <p className="venueAddress">{event.address}</p>
                        </div>
                        <div className="row">
                          <p className="eventInfo">{event.info}</p>
                        </div>
                      </Nav.Link>
                      <div className="col-5 col-sm-3 saveEventdiv">
                        {id ? (
                          currentSavedEvents.length ? (
                            currentSavedEvents.find(
                              (savedEvent) => savedEvent.id === event._id
                            ) ? (
                              <Button
                                variant="success"
                                className="saveEventButton"
                                onClick={handleEventClick}
                                value="Saved"
                                title={JSON.stringify({
                                  profilePicture: userProfileImg,
                                  name: userName,
                                })}
                                id={JSON.stringify(event)}
                              >
                                Saved
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                className="saveEventButton"
                                onClick={handleEventClick}
                                value="Save Event"
                                title={JSON.stringify({
                                  profilePicture: userProfileImg,
                                  name: userName,
                                })}
                                id={JSON.stringify(event)}
                              >
                                Save Event
                              </Button>
                            )
                          ) : (
                            <Button
                              variant="primary"
                              className="saveEventButton"
                              onClick={handleEventClick}
                              value="Save Event"
                              title={JSON.stringify({
                                profilePicture: userProfileImg,
                                name: userName,
                              })}
                              id={JSON.stringify(event)}
                            >
                              Save Event
                            </Button>
                          )
                        ) : null}
                      </div>
                    </Accordion.Body>
                  </AccordionItem>
                );
              })
            ) : (
              <div className="noShowsdiv">
                <h6>No Upcoming Shows</h6>
              </div>
            )}
          </Accordion>

          <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create new event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEventSubmit}>
                <Form.Group>
                  <Form.Label>Event name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event address</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEventAddress}
                    onChange={(e) => setNewEventAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event date and time</Form.Label>
                  <Datetime
                    onChange={(value) => {
                      setNewEventDate(value);
                    }}
                    required
                    value={newEventDate}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event venue</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event info</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newEventInfo}
                    onChange={(e) => setNewEventInfo(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  className="modal-submit-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </article>
      </section>
    </main>
  );
};

export default EventsPage;
