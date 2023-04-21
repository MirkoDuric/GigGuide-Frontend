import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Button from "react-bootstrap/Button";
import "../Event.css";
import { Nav } from "react-bootstrap";

const Event = (props) => {
  const bands = props.bands;
  const type = props.type;
  const currentSavedEvents = props.currentSavedEvents;
  const id = sessionStorage.getItem("userId");
  let eventKey = 0;

  return (
    <Accordion className="accordion" key={type}>
      {bands.length ? (
        type === "local" ? (
          bands
            .map((band) => {
              return band.upcomingEvents
                ? band.upcomingEvents.length
                  ? band.upcomingEvents.map((event) => {
                      eventKey++;
                      return (
                        <AccordionItem
                          className="AcordionItem"
                          type={type}
                          eventKey={eventKey}
                        >
                          <AccordionHeader className="row">
                            <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                              <Nav.Link
                                href={`/${band._id}/event/${event._id}`}
                              >
                                <Figure>
                                  <Figure.Image
                                    className="event-img-container"
                                    width={"100%"}
                                    src={`http://localhost:8000/${band.profilePicture}`}
                                    alt="Artist Image"
                                  />
                                </Figure>
                              </Nav.Link>
                            </div>
                            <div className="col eventTitle">
                              <h2>
                                {band.name} at {event.eventName}
                              </h2>
                              <h3>
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
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
                            <Nav.Link href={`/${band._id}/event/${event._id}`}>
                              <div className="col-7 col-sm-9">
                                <div className="row">
                                  <h4>{event.venue} </h4>
                                  <p className="venueAddress">
                                    {event.address}
                                  </p>
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
                                    (savedEvent) => savedEvent.id === event._id
                                  ) ? (
                                    <Button
                                      variant="success"
                                      className="saveEventButton"
                                      onClick={props.onEventClick}
                                      value="Saved"
                                      title={JSON.stringify(band)}
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
                                      title={JSON.stringify(band)}
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
                                    title={JSON.stringify(band)}
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
                  : null
                : null;
            })
            .some((el) => el !== null) ? (
            bands.map((band) => {
              return band.upcomingEvents
                ? band.upcomingEvents.length
                  ? band.upcomingEvents.map((event) => {
                      eventKey++;
                      return (
                        <AccordionItem
                          className="AcordionItem"
                          type={type}
                          eventKey={eventKey}
                        >
                          <AccordionHeader className="row">
                            <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                              <Nav.Link
                                href={`/${band._id}/event/${event._id}`}
                              >
                                <Figure>
                                  <Figure.Image
                                    width={"100%"}
                                    src={`http://localhost:8000/${band.profilePicture}`}
                                    alt="Artist Image"
                                  />
                                </Figure>
                              </Nav.Link>
                            </div>
                            <div className="col eventTitle">
                              <h2>
                                {band.name} at {event.eventName}
                              </h2>
                              <h3>
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
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
                            <Nav.Link href={`/${band._id}/event/${event._id}`}>
                              <div className="col-7 col-sm-9">
                                <div className="row">
                                  <h4>{event.venue} </h4>
                                  <p className="venueAddress">
                                    {event.address}
                                  </p>
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
                                    (savedEvent) => savedEvent.id === event._id
                                  ) ? (
                                    <Button
                                      variant="success"
                                      className="saveEventButton"
                                      onClick={props.onEventClick}
                                      value="Saved"
                                      title={JSON.stringify(band)}
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
                                      title={JSON.stringify(band)}
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
                                    title={JSON.stringify(band)}
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
                  : null
                : null;
            })
          ) : (
            <>
              <div className="noShowsdiv">
                <h6>No Upcoming Shows</h6>
              </div>
            </>
          )
        ) : bands
            .map((band) => {
              eventKey++;
              return band._embedded.attractions ? (
                band._embedded.attractions[0].upcomingEvents ? (
                  band._embedded.attractions[0].upcomingEvents._total > 0 ? (
                    band._embedded.venues[0].country.countryCode === "US" ? (
                      <AccordionItem type={type} eventKey={eventKey}>
                        <AccordionHeader className="row">
                          <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                            <Nav.Link
                              href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                            >
                              <Figure>
                                <Figure.Image
                                  className="event-img-container"
                                  width={"100%"}
                                  alt="Artist Image"
                                  src={
                                    band.images.find(
                                      (element) =>
                                        element.ratio === "16_9" &&
                                        element.height > 150
                                    ).url
                                  }
                                />
                              </Figure>
                            </Nav.Link>
                          </div>
                          <div className="col eventTitle">
                            <h2>{band.name}</h2>
                            <h3>
                              {new Date(
                                band.dates.start.dateTime
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              ,{" "}
                              {new Date(
                                band.dates.start.dateTime
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h3>
                          </div>
                        </AccordionHeader>
                        <Accordion.Body>
                          <Nav.Link
                            href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                          >
                            <div className="col-7 col-sm-9">
                              <div className="row">
                                <h4>{band._embedded.venues[0].name}</h4>

                                <p className="venueAddress">
                                  {band._embedded.venues[0].address.line1},{" "}
                                  {band._embedded.venues[0].city.name},{" "}
                                  {band._embedded.venues[0].state.name}{" "}
                                  {band._embedded.venues[0].postalCode},{" "}
                                  {band._embedded.venues[0].country.name}
                                </p>
                              </div>
                              <div className="row">
                                <p className="eventInfo">{band.info}</p>
                              </div>
                            </div>
                          </Nav.Link>
                          <div className="col-5 col-sm-3 saveEventdiv">
                            {id ? (
                              currentSavedEvents.length ? (
                                currentSavedEvents.find(
                                  (event) => event.id === band.id
                                ) ? (
                                  <Button
                                    variant="success"
                                    className="saveEventButton"
                                    onClick={props.onEventClick}
                                    value="Saved"
                                    title={JSON.stringify(band)}
                                  >
                                    Saved
                                  </Button>
                                ) : (
                                  <Button
                                    variant="primary"
                                    className="saveEventButton"
                                    onClick={props.onEventClick}
                                    value="Save Event"
                                    title={JSON.stringify(band)}
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
                                  title={JSON.stringify(band)}
                                >
                                  Save Event
                                </Button>
                              )
                            ) : null}
                          </div>
                        </Accordion.Body>
                      </AccordionItem>
                    ) : (
                      <AccordionItem type={type} eventKey={eventKey}>
                        <AccordionHeader className="row">
                          <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                            <Nav.Link
                              href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                            >
                              <Figure>
                                <Figure.Image
                                  className="event-img-container"
                                  width={"100%"}
                                  alt="Artist Image"
                                  src={
                                    band.images.find(
                                      (element) =>
                                        element.ratio === "16_9" &&
                                        element.height > 150
                                    ).url
                                  }
                                />
                              </Figure>
                            </Nav.Link>
                          </div>
                          <div className="col eventTitle">
                            <h2>{band.name}</h2>
                            <h3>
                              {new Date(
                                band.dates.start.dateTime
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              ,{" "}
                              {new Date(
                                band.dates.start.dateTime
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h3>
                          </div>
                        </AccordionHeader>
                        <Accordion.Body>
                          <Nav.Link
                            href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                          >
                            <div className="col-7 col-sm-9">
                              <div className="row">
                                <h4>{band._embedded.venues[0].name}</h4>

                                <p className="venueAddress">
                                  {band._embedded.venues[0].address.line1},{" "}
                                  {band._embedded.venues[0].city.name},{" "}
                                  {band._embedded.venues[0].postalCode},{" "}
                                  {band._embedded.venues[0].country.name}
                                </p>
                              </div>
                              <div className="row">
                                <p className="eventInfo">{band.info}</p>
                              </div>
                            </div>
                          </Nav.Link>
                          <div className="col-5 col-sm-3 saveEventdiv">
                            {id ? (
                              currentSavedEvents.length ? (
                                currentSavedEvents.find(
                                  (event) => event.id === band.id
                                ) ? (
                                  <Button
                                    variant="success"
                                    className="saveEventButton"
                                    onClick={props.onEventClick}
                                    value="Saved"
                                    title={JSON.stringify(band)}
                                  >
                                    Saved
                                  </Button>
                                ) : (
                                  <Button
                                    variant="primary"
                                    className="saveEventButton"
                                    onClick={props.onEventClick}
                                    value="Save Event"
                                    title={JSON.stringify(band)}
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
                                  title={JSON.stringify(band)}
                                >
                                  Save Event
                                </Button>
                              )
                            ) : null}
                          </div>
                        </Accordion.Body>
                      </AccordionItem>
                    )
                  ) : null
                ) : null
              ) : null;
            })
            .some((el) => el !== null) ? (
          bands.map((band) => {
            eventKey++;
            return band._embedded.attractions ? (
              band._embedded.attractions[0].upcomingEvents ? (
                band._embedded.attractions[0].upcomingEvents._total > 0 ? (
                  band._embedded.venues[0].country.countryCode === "US" ? (
                    <AccordionItem type={type} eventKey={eventKey}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Nav.Link
                            href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                          >
                            <Figure>
                              <Figure.Image
                                className="event-img-container"
                                width={"100%"}
                                alt="Artist Image"
                                src={
                                  band.images.find(
                                    (element) =>
                                      element.ratio === "16_9" &&
                                      element.height > 150
                                  ).url
                                }
                              />
                            </Figure>
                          </Nav.Link>
                        </div>
                        <div className="col eventTitle">
                          <h2>{band.name}</h2>
                          <h3>
                            {new Date(
                              band.dates.start.dateTime
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            ,{" "}
                            {new Date(
                              band.dates.start.dateTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h3>
                        </div>
                      </AccordionHeader>
                      <Accordion.Body>
                        <Nav.Link
                          href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                        >
                          <div className="col-7 col-sm-9">
                            <div className="row">
                              <h4>{band._embedded.venues[0].name}</h4>

                              <p className="venueAddress">
                                {band._embedded.venues[0].address.line1},{" "}
                                {band._embedded.venues[0].city.name},{" "}
                                {band._embedded.venues[0].state.name}{" "}
                                {band._embedded.venues[0].postalCode},{" "}
                                {band._embedded.venues[0].country.name}
                              </p>
                            </div>
                            <div className="row">
                              <p className="eventInfo">{band.info}</p>
                            </div>
                          </div>
                        </Nav.Link>
                        <div className="col-5 col-sm-3 saveEventdiv">
                          {id ? (
                            currentSavedEvents.length ? (
                              currentSavedEvents.find(
                                (event) => event.id === band.id
                              ) ? (
                                <Button
                                  variant="success"
                                  className="saveEventButton"
                                  onClick={props.onEventClick}
                                  value="Saved"
                                  title={JSON.stringify(band)}
                                >
                                  Saved
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  className="saveEventButton"
                                  onClick={props.onEventClick}
                                  value="Save Event"
                                  title={JSON.stringify(band)}
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
                                title={JSON.stringify(band)}
                              >
                                Save Event
                              </Button>
                            )
                          ) : null}
                        </div>
                      </Accordion.Body>
                    </AccordionItem>
                  ) : (
                    <AccordionItem type={type} eventKey={eventKey}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Nav.Link
                            href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                          >
                            <Figure>
                              <Figure.Image
                                className="event-img-container"
                                width={"100%"}
                                alt="Artist Image"
                                src={
                                  band.images.find(
                                    (element) =>
                                      element.ratio === "16_9" &&
                                      element.height > 150
                                  ).url
                                }
                              />
                            </Figure>
                          </Nav.Link>
                        </div>
                        <div className="col eventTitle">
                          <h2>{band.name}</h2>
                          <h3>
                            {new Date(
                              band.dates.start.dateTime
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            ,{" "}
                            {new Date(
                              band.dates.start.dateTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h3>
                        </div>
                      </AccordionHeader>
                      <Accordion.Body>
                        <Nav.Link
                          href={`/${band._embedded.attractions[0].id}/event/${band.id}`}
                          className="eventDetails"
                        >
                          <div className="col-7 col-sm-9">
                            <div className="row">
                              <h4>{band._embedded.venues[0].name}</h4>

                              <p className="venueAddress">
                                {band._embedded.venues[0].address.line1},{" "}
                                {band._embedded.venues[0].city.name},{" "}
                                {band._embedded.venues[0].postalCode},{" "}
                                {band._embedded.venues[0].country.name}
                              </p>
                            </div>
                            <div className="row">
                              <p className="eventInfo">{band.info}</p>
                            </div>
                          </div>
                        </Nav.Link>
                        <div className="col-5 col-sm-3 saveEventdiv">
                          {id ? (
                            currentSavedEvents.length ? (
                              currentSavedEvents.find(
                                (event) => event.id === band.id
                              ) ? (
                                <Button
                                  variant="success"
                                  className="saveEventButton"
                                  onClick={props.onEventClick}
                                  value="Saved"
                                  title={JSON.stringify(band)}
                                >
                                  Saved
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  className="saveEventButton"
                                  onClick={props.onEventClick}
                                  value="Save Event"
                                  title={JSON.stringify(band)}
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
                                title={JSON.stringify(band)}
                              >
                                Save Event
                              </Button>
                            )
                          ) : null}
                        </div>
                      </Accordion.Body>
                    </AccordionItem>
                  )
                ) : null
              ) : null
            ) : null;
          })
        ) : (
          <>
            <div className="noShowsdiv">
              <h6>No Upcoming Shows</h6>
            </div>
          </>
        )
      ) : null}
    </Accordion>
  );
};

export default Event;
