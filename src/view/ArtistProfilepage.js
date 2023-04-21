import { Image } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import "../Profilepage.css";
import "../ArtistCard.css";
import { useNavigate } from "react-router";
import { InputGroup, FormControl, Button, ModalBody } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Modal, Form, Nav } from "react-bootstrap";
import Datetime from "react-datetime";
import PlannedEvents from "../Components/PlannedEvents";

const ArtistProfilepage = (userData) => {
  const user = userData.userData;
  const navigate = useNavigate();
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
    bio,
    songsList,
    upcomingEvents,
    plannedEvents,
    userType,
  } = user;
  const currentFaveArtists = userData.currentFaveArtists;
  const currentSavedEvents = userData.currentSavedEvents;
  const id = sessionStorage.getItem("userId");
  let eventKey = 0;

  //STATE VARIABLES AND FUNCTIONS FOR CREATING BIO CONTENT
  const [content, setContent] = useState(bio);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateButtonClick = (e) => {
    e.preventDefault();
    const payload = { bio: content };
    const headers = { "Content-Type": "application/json" };
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}api/user/${id}/biography`,
        JSON.stringify(payload),
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditMode(false);
        window.location.reload();
      });
  };

  // MODAL DATA FOR CREATING NEW SONGS
  const [showSongsModal, setShowSongsModal] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    duration: "",
    url: "",
    releaseDate: "",
    album: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const headers = { "Content-Type": "application/json" };
    const payload = newSong;
    // Send the new song to the server using Axios
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}/song`, payload, {
        headers,
      })
      .then((response) => {
        console.log("MY NEW SONG IS IN DB", response.data);
      })
      .catch((err) => {
        console.log("DID'T ADD MY NEW SONG", err);
      })
      .finally(() => {
        // Hide the modal
        setShowSongsModal(false);
        setNewSong({
          name: "",
          duration: "",
          url: "",
          releaseDate: "",
          album: "",
        });
        window.location.reload();
      });
  };
  //MODAL DATA FOR CREATING NEW EVENT
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventInfo, setEventInfo] = useState("");
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      eventName,
      artistName: userName,
      date: new Date(eventDate._d).toISOString(),
      venue: eventVenue,
      address: eventAddress,
      info: eventInfo,
    };

    const headers = { "Content-Type": "application/json" };
    const payload = newEvent;

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}api/user/${id}/upcomingEvent`,
        payload,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data); // log the newly created event object
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setShowEventModal(false);
        setEventName("");
        setEventAddress("");
        setEventDate("");
        setEventVenue("");
        setEventInfo("");
        window.location.reload();
      });
  };
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
              alt="No Profile Image"
            />
          )}
        </article>
      </section>
      <section className="name-location-container">
        <article style={{ display: "flex", flexDirection: "column" }}>
          <Row className="col-6 col-sm-5 col-md-4">
            <Col>
              <p className="name">{userName}</p>
              <p className="username">{userUsername}</p>
            </Col>
            <Col>
              <div className="liked">
                {id ? (
                  currentFaveArtists.length ? (
                    currentFaveArtists.find(
                      (artist) => artist.id === userId
                    ) ? (
                      <Image
                        roundedCircle={true}
                        src={`${process.env.REACT_APP_BACKEND_URL}profile-pics/Filled.png`}
                        alt="Filled Heart"
                        className="favorite"
                        onClick={userData.onHeartClick}
                        id={userId}
                        title={userName}
                        data-touring={userData.isTouring}
                        pic={userProfileImg}
                      ></Image>
                    ) : (
                      <Image
                        roundedCircle={true}
                        src={`${process.env.REACT_APP_BACKEND_URL}profile-pics/Outline.png`}
                        alt="Heart Outline"
                        className="favorite"
                        onClick={userData.onHeartClick}
                        id={userId}
                        title={userName}
                        data-touring={userData.isTouring}
                        pic={userProfileImg}
                      ></Image>
                    )
                  ) : (
                    <Image
                      roundedCircle={true}
                      src={`${process.env.REACT_APP_BACKEND_URL}profile-pics/Outline.png`}
                      alt="Heart Outline"
                      className="favorite"
                      onClick={userData.onHeartClick}
                      id={userId}
                      title={userName}
                      data-touring={userData.isTouring}
                      pic={userProfileImg}
                    ></Image>
                  )
                ) : null}
              </div>
            </Col>
          </Row>
        </article>
      </section>
      <section className="artist-bio">
        <p className="bio-title">{userName} Biography:</p>
        <div className="bio-div">
          {isEditMode ? (
            <InputGroup>
              <FormControl
                as="textarea"
                rows={1}
                value={content}
                onChange={handleContentChange}
                className="bio-textarea"
              />
              <Button
                className="modal-submit-button bio"
                onClick={handleUpdateButtonClick}
              >
                Update
              </Button>
            </InputGroup>
          ) : (
            <>
              {content === "" ? <p>{"No content yet"}</p> : <p>{content}</p>}
              {id === userId ? (
                <Button
                  className="edit-bio-button"
                  onClick={() => handleEditButtonClick()}
                >
                  Edit
                </Button>
              ) : null}
            </>
          )}
        </div>
      </section>
      <section className="events-and-fav-artist-contaiener">
        <article className="favourite-artists-events">
          <p className="event-list-title">{userName} Upcoming Shows:</p>
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
                              src={userProfileImg}
                              alt="Artist Image"
                            />
                          </Figure>
                        </Nav.Link>
                      </div>
                      <div className="col eventTitle">
                        <h2>
                          {userName} at {event.eventName}
                        </h2>
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
                      <div className="col-5 col-sm-3 saveEventdiv"></div>
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
          {id === userId ? (
            <Button
              className="create-event-button"
              variant="primary"
              onClick={() => setShowEventModal(true)}
            >
              Create event
            </Button>
          ) : null}

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
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event address</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventAddress}
                    onChange={(e) => setEventAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event date and time</Form.Label>
                  <Datetime
                    onChange={(value) => setEventDate(value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event venue</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event info</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={eventInfo}
                    onChange={(e) => setEventInfo(e.target.value)}
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
      <section className="artist-songs-section">
        <p className="song-list-title">{userName}, songs:</p>
        <article className="songs-container">
          {songsList.length ? (
            <ListGroup as="ol" numbered>
              {songsList.map((song) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{song.name}</div>
                      Release date:{" "}
                      {new Date(song.releaseDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <Badge bg="primary" pill>
                      Song duration: {song.duration}
                    </Badge>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <div className="noShowsdiv">
              <h6>No Songs Available</h6>
            </div>
          )}
          {id === userId ? (
            <Button
              className="add-song-button"
              onClick={() => setShowSongsModal(true)}
            >
              Add New Song
            </Button>
          ) : null}
          <Modal show={showSongsModal} onHide={() => setShowSongsModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="songName">
                  <Form.Label>Song Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newSong.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="songDuration">
                  <Form.Label>Song Duration</Form.Label>
                  <Form.Control
                    type="text"
                    name="duration"
                    value={newSong.duration}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="songUrl">
                  <Form.Label>Song URL(optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={newSong.url}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="songReleaseDate">
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="releaseDate"
                    value={newSong.releaseDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="songAlbum">
                  <Form.Label>Album(optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="album"
                    value={newSong.album}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button className="modal-submit-button" type="submit">
                  Add Song
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </article>
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

export default ArtistProfilepage;
