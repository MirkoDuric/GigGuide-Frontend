import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const ArtistProfilepage = (userData) => {
  //Mock data for artist user
  const user = userData.userData;
  const {
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
    userType,
  } = user;

  const id = sessionStorage.getItem("userId");

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
        `http://localhost:8000/api/user/${id}/biography`,
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
      .put(`http://localhost:8000/api/user/${id}/song`, payload, { headers })
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
  console.log("MY EVENT TIME", eventDate._d);
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
      .put(`http://localhost:8000/api/user/${id}/upcomingEvent`, payload, {
        headers,
      })
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
  console.log(upcomingEvents);
  return (
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
              {content === "" ? <p>{"No content jet"}</p> : <p>{content}</p>}
              <Button
                className="edit-bio-button"
                onClick={() => handleEditButtonClick()}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </section>
      <section className="events-and-fav-artist-contaiener">
        <article className="favourite-artists-events">
          <p className="event-list-title">{userName} Upcoming Shows:</p>
          <Accordion className="accordion">
            {upcomingEvents.length
              ? upcomingEvents.map((show, index) => {
                  console.log(show.eventName);
                  return show?.eventName ? (
                    <AccordionItem eventKey={index}>
                      <AccordionHeader className="row">
                        <div className="col eventTitle">
                          <h3>{show.artistName}</h3>
                          <p>
                            {new Date(show.eventDate ?? "").toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <div className="row">
                          <h3>{show.eventVenue ?? ""}</h3>
                          <p className="venueAddress">{show.address ?? ""}</p>
                        </div>
                        <div className="row">
                          <p>{show.info ?? ""}</p>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  ) : null;
                })
              : null}
            <Button
              className="create-event-button"
              variant="primary"
              onClick={() => setShowEventModal(true)}
            >
              Create event
            </Button>
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
          ) : null}
          <Button
            className="add-song-button"
            onClick={() => setShowSongsModal(true)}
          >
            Add New Song
          </Button>
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
  );
};

export default ArtistProfilepage;
