import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Button from "react-bootstrap/Button";
import "../Event.css";
import { NavLink } from "react-router-dom";

const Event = (props) => {
  const type = props.type;
  const events = props.events;
  console.log(events);
  const bands = props.events;
  const currentSavedEvents = props.events;
  const id = sessionStorage.getItem("userId");
  let eventKey = 0;

  return (
    <Accordion className="accordion" key={type}>
      {events.length ? (
        type === "local" ? (
          events
            .map((event) => {
              if (event.artistType === "local") {
                eventKey++;
                return (
                  <AccordionItem
                    className="AcordionItem"
                    type={type}
                    eventKey={eventKey}
                  >
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <NavLink to={`/${event.bandId}/event/${event.id}`}>
                          <Figure>
                            <Figure.Image
                              className="event-img"
                              width={"100%"}
                              src={`http://localhost:8000/${event.profilePicture}`}
                              alt="Artist Image"
                            />
                          </Figure>
                        </NavLink>
                      </div>
                      <div className="col eventTitle">
                        <h2>{event.name}</h2>
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
                      <NavLink to={`/${event.bandId}/event/${event.id}`}>
                        <div className="row">
                          <p>{event.venue} </p>
                          <p className="venueAddress">{event.address}</p>
                        </div>
                        <div className="row">
                          <p className="eventInfo">{event.info}</p>
                        </div>
                      </NavLink>
                      <div className="col-1">
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
                                title={JSON.stringify(event)}
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
                                title={JSON.stringify(event)}
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
                              title={JSON.stringify(event)}
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
              }
            })
            .some((el) => el !== undefined) ? (
            events.map((event) => {
              if (event.artistType === "local") {
                eventKey++;
                return (
                  <AccordionItem
                    className="AcordionItem"
                    type={type}
                    eventKey={eventKey}
                  >
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <NavLink to={`/${event.bandId}/event/${event.id}`}>
                          <Figure>
                            <Figure.Image
                              className="event-img"
                              width={"100%"}
                              src={event.profilePicture}
                              alt="Artist Image"
                            />
                          </Figure>
                        </NavLink>
                      </div>
                      <div className="col eventTitle">
                        <h2>{event.name}</h2>
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
                      <NavLink to={`/${event.bandId}/event/${event.id}`}>
                        <div className="row">
                          <p>{event.venue} </p>
                          <p className="venueAddress">{event.address}</p>
                        </div>
                        <div className="row">
                          <p className="eventInfo">{event.info}</p>
                        </div>
                      </NavLink>
                      <div className="col-1">
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
                                title={JSON.stringify(event)}
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
                                title={JSON.stringify(event)}
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
                              title={JSON.stringify(event)}
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
              }
            })
          ) : (
            <div className="noShowsdiv">
              <h6>No Upcoming Saved Shows</h6>
            </div>
          )
        ) : type === "non-local" ? (
          bands
            .map((band) => {
              if (band._embedded) {
                eventKey++;
                return band._embedded.attractions ? (
                  band._embedded.attractions[0].upcomingEvents ? (
                    band._embedded.attractions[0].upcomingEvents._total > 0 ? (
                      band._embedded.venues[0].country.countryCode === "US" ? (
                        <AccordionItem type={type} eventKey={eventKey}>
                          <AccordionHeader className="row">
                            <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                              <NavLink to={`${band.url}`}>
                                <Figure>
                                  <Figure.Image
                                    className="event-img"
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
                              </NavLink>
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
                            <NavLink to={`${band.url}`}>
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
                            </NavLink>
                            <div className="col-1">
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
                              <NavLink to={band._embedded.venues[0].url}>
                                <Figure>
                                  <Figure.Image
                                    className="event-img"
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
                              </NavLink>
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
                            <NavLink to={`${band.url}`}>
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
                            </NavLink>
                            <div className="col-1">
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
              }
            })
            .some((el) => el !== null) ? (
            bands.map((band) => {
              if (band._embedded) {
                eventKey++;
                return band._embedded.attractions ? (
                  band._embedded.attractions[0].upcomingEvents ? (
                    band._embedded.attractions[0].upcomingEvents._total > 0 ? (
                      band._embedded.venues[0].country.countryCode === "US" ? (
                        <AccordionItem type={type} eventKey={eventKey}>
                          <AccordionHeader className="row">
                            <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                              <NavLink to={`${band.url}`}>
                                <Figure>
                                  <Figure.Image
                                    className="event-img"
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
                              </NavLink>
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
                            <NavLink to={`${band.url}`}>
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
                            </NavLink>
                            <div className="col-1">
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
                              <NavLink to={band._embedded.venues[0].url}>
                                <Figure>
                                  <Figure.Image
                                    className="event-img"
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
                              </NavLink>
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
                            <NavLink
                              to={`${band.url}`}
                              className="eventDetails"
                            >
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
                            </NavLink>
                            <div className="col-1">
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
              }
            })
          ) : null
        ) : (
          <>
            <div className="noShowsdiv">
              <h6>No Upcoming Saved Shows</h6>
            </div>
          </>
        )
      ) : null}
    </Accordion>
  );
};

export default Event;
