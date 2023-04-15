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
  let eventKey = 0;

  return (
    <Accordion className="accordion" key={type}>
      {bands.length ? (
        type === "local" ? (
          bands
            .map((band) => {
              eventKey++;
              return band.upcomingEvents ? (
                band.upcomingEvents.length ? (
                  <AccordionItem
                    className="AcordionItem"
                    type={type}
                    eventKey={eventKey}
                  >
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Nav.Link
                          href={`https://${band.upcomingEvents[0].ticketUrl}`}
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
                        <h2>{band.name}</h2>
                        <h3>
                          {new Date(
                            band.upcomingEvents[0].date
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          ,{" "}
                          {new Date(
                            band.upcomingEvents[0].startTime
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h3>
                        <Button variant="primary">Save Event</Button>
                      </div>
                    </AccordionHeader>
                    <Accordion.Body>
                      <Nav.Link
                        href={`https://${band.upcomingEvents[0].ticketUrl}`}
                      >
                        <div className="row">
                          <p>{band.upcomingEvents[0].venue} </p>
                          <p className="venueAddress">
                            {band.upcomingEvents[0].address}
                          </p>
                        </div>
                        <div className="row">
                          <p className="eventInfo">
                            {band.upcomingEvents[0].info}
                          </p>
                        </div>
                      </Nav.Link>
                    </Accordion.Body>
                  </AccordionItem>
                ) : null
              ) : null;
            })
            .some((el) => el !== null) ? (
            bands.map((band) => {
              eventKey++;
              return band.upcomingEvents ? (
                band.upcomingEvents.length ? (
                  <AccordionItem
                    className="AcordionItem"
                    type={type}
                    eventKey={eventKey}
                  >
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <Nav.Link
                          href={`https://${band.upcomingEvents[0].ticketUrl}`}
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
                        <h2>{band.name}</h2>
                        <h3>
                          {new Date(
                            band.upcomingEvents[0].date
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          ,{" "}
                          {new Date(
                            band.upcomingEvents[0].startTime
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h3>
                      </div>
                    </AccordionHeader>
                    <Accordion.Body>
                      <Nav.Link
                        href={`https://${band.upcomingEvents[0].ticketUrl}`}
                      >
                        <div className="row">
                          <p>{band.upcomingEvents[0].venue} </p>
                          <p className="venueAddress">
                            {band.upcomingEvents[0].address}
                          </p>
                        </div>
                        <div className="row">
                          <p className="eventInfo">
                            {band.upcomingEvents[0].info}
                          </p>
                        </div>
                      </Nav.Link>
                    </Accordion.Body>
                  </AccordionItem>
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
                            <Nav.Link href={`${band.url}`}>
                              <Figure>
                                <Figure.Image
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
                            <Button variant="primary">Save Event</Button>
                          </div>
                        </AccordionHeader>
                        <Accordion.Body>
                          <Nav.Link href={`${band.url}`}>
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
                          </Nav.Link>
                        </Accordion.Body>
                      </AccordionItem>
                    ) : (
                      <AccordionItem type={type} eventKey={eventKey}>
                        <AccordionHeader className="row">
                          <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                            <Nav.Link href={band._embedded.venues[0].url}>
                              <Figure>
                                <Figure.Image
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
                            <Button variant="primary">Save Event</Button>
                          </div>
                        </AccordionHeader>
                        <Accordion.Body>
                          <Nav.Link href={`${band.url}`}>
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
                          </Nav.Link>
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
                          <Nav.Link href={`${band.url}`}>
                            <Figure>
                              <Figure.Image
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
                        <Nav.Link href={`${band.url}`}>
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
                        </Nav.Link>
                        <div className="col-1">
                          <Button variant="primary" style={{ zIndex: "100" }}>
                            Save Event
                          </Button>
                        </div>
                      </Accordion.Body>
                    </AccordionItem>
                  ) : (
                    <AccordionItem type={type} eventKey={eventKey}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <Nav.Link href={band._embedded.venues[0].url}>
                            <Figure>
                              <Figure.Image
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
                        <Nav.Link href={`${band.url}`} className="eventDetails">
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
                        </Nav.Link>
                        <div className="col-1">
                          <Button variant="primary" style={{ zIndex: "100" }}>
                            Save Event
                          </Button>
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
