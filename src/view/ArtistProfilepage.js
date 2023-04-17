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

const ArtistProfilepage = () => {
  //Mock data for artist user
  const [artistUser, setArtistUser] = useState({
    id: "",
    name: "Domino Efekt",
    username: "Dominoefekt",
    city: "Bijeljina",
    country: "Bosnia and Herzegovina",
    upcomingShows: [
      {
        eventName: "Prva svirka",
        artistName: "Domino Efekt",
        eventDate: "2023-05-25T00:00:00.000Z",
        eventVenue: "Pub Fort",
        eventAddress: "Vojvode Misica 1, 74213, Doboj, BiH",
        eventInfo: "Ulaz besplatan. Lijep provod!",
      },
    ],
    songs: [
      { name: "song one", duration: "4:32", releaseDate: "January 1, 1970" },
      { name: "song two", duration: "4:32", releaseDate: "January 1, 1970" },
    ],
    userProfileImg: "",
    userBannerImg: "",
    bio: "Mi smo jedan manji bend iz Bijeljine. Lendice smo",
  });

  //STATE VARIABLES AND FUNCTIONS FOR CREATING BIO CONTENT
  const [content, setContent] = useState(artistUser.bio);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateButtonClick = () => {
    setIsEditMode(false);
  };
  // MODAL DATA FOR CREATING NEW SONGS
  const [showSongsModal, setShowSongsModal] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    duration: "",
    releaseDate: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Send the new song to the server using Axios
    axios.post("/api/add-song", newSong).then((response) => {
      // Update the artistUser object with the new song
      setArtistUser((prevArtistUser) => ({
        ...prevArtistUser,
        songs: [...prevArtistUser.songs, response.data],
      }));
      // Hide the modal
      setShowSongsModal(false);
    });
  };
  //MODAL DATA FOR CREATING NEW EVENT
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventInfo, setEventInfo] = useState("");

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      eventName,
      artistName: artistUser.name,
      eventAddress,
      eventDate: new Date(eventDate + "T" + eventTime + ":00").toISOString(),
      eventVenue,
      eventInfo,
    };
    // send newEvent object to database with axios.post or similar method
    // and then update the artistUser object with the new event
    // for example, you could do:
    // artistUser.upcomingShows.push(newEvent);
    // and then close the modal and reset the form inputs
    setShowEventModal(false);
    setEventName("");
    setEventAddress("");
    setEventDate("");
    setEventTime("");
    setEventVenue("");
    setEventInfo("");
  };
  return (
    <main className="profile-container">
      <section className="img-container">
        <article>
          {artistUser.userBannerImg ? (
            <Image
              fluid={true}
              className="banner-img"
              src={`http://localhost:8000/${artistUser.userBannerImg}`}
              alt="Banner img"
            />
          ) : (
            <Image fluid={true} className="no-banner-img" alt="No banner img" />
          )}
        </article>
        <article>
          {artistUser.userProfileImg ? (
            <Image
              fluid={true}
              className="profile-img"
              roundedCircle={true}
              src={`http://localhost:8000/${artistUser.userProfileImg}`}
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
          <p className="name">{artistUser.name}</p>
          <p className="username">{artistUser.username}</p>
        </article>
      </section>
      <section className="artist-bio">
        <p className="bio-title">{artistUser.name} Biography:</p>
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
              <Button onClick={() => handleUpdateButtonClick()}>Update</Button>
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
          <p className="favourite-artists-events">
            {artistUser.name} upcoming shows:
          </p>
          <Accordion className="accordion">
            {artistUser.upcomingShows.length
              ? artistUser.upcomingShows.map((show, index) => {
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
                          <p className="venueAddress">
                            {show.eventAddress ?? ""}
                          </p>
                        </div>
                        <div className="row">
                          <p>{show.eventInfo ?? ""}</p>
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
                  {/* <Datetime
                    onChange={(value) => setEventDate(value)}
                    required
                  /> */}
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </article>
      </section>
      <section className="artist-songs-section">
        <p>{artistUser.name}, songs:</p>
        <article className="songs-container">
          {artistUser.songs.length ? (
            <ListGroup as="ol" numbered>
              {artistUser.songs.map((song) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{song.name}</div>
                      Release date: {song.releaseDate}
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
                  <Form.Label>Song Name</Form.Label>
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
                <Button className="modal-add-song-button" type="submit">
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
