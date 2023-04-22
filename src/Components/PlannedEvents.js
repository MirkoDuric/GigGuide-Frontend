import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import "../Event.css";
import { Nav } from "react-bootstrap";

const PlannedEvents = (props) => {
  const plannedEvents = props.plannedEvents;
  const currentSavedEvents = props.currentSavedEvents;
  const id = sessionStorage.getItem("userId");
  let eventKey = 0;

  return (
    <Accordion>
      {plannedEvents.length ? (
        plannedEvents.map((event) => {
          eventKey++;
          return (
            <AccordionItem className="AcordionItem" eventKey={eventKey}>
              <AccordionHeader className="row">
                <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                  <Nav.Link href={`/${event.bandId}/event/${event.id}`}>
                    <Figure>
                      <Figure.Image
                        className="event-img"
                        width={"100%"}
                        src={event.profilePicture}
                        alt="Artist Image"
                      />
                    </Figure>
                  </Nav.Link>
                </div>
                <div className="col eventTitle">
                  <h2>
                    {event.artistName} at {event.eventName}
                  </h2>
                  <h3>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    ,{" "}
                    {new Date(event.startTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                </div>
              </AccordionHeader>
              <Accordion.Body>
                <Nav.Link href={`/${event.bandId}/event/${event.id}`}>
                  <div className="col-7 col-sm-9">
                    <div className="row">
                      <h4>{event.venue} </h4>
                      <p className="venueAddress">{event.address}</p>
                    </div>
                    <div className="row">
                      <p className="eventInfo">{event.info}</p>
                    </div>
                  </div>
                </Nav.Link>
                <div className="col-5 col-sm-3 saveEventdiv">
                  {id ? (
                    currentSavedEvents.length ? (
                      currentSavedEvents.find(
                        (savedEvent) => savedEvent.id === event.id
                      ) ? (
                        <Button
                          variant="success"
                          className="saveEventButton"
                          onClick={props.onEventClick}
                          value="Saved"
                          id={JSON.stringify(event)}
                        >
                          Saved
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="saveEventButton"
                          onClick={props.onEventClick}
                          value="Save Event"
                          id={JSON.stringify(event)}
                        >
                          Save Event
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="primary"
                        className="saveEventButton"
                        onClick={props.onEventClick}
                        value="Save Event"
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
  );
};

export default PlannedEvents;
