import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import "../Event.css";

const Event = (props) => {
  const bands = props.bands;
  const type = props.type;
  let eventKey = 0;

  return (
    <Accordion className="accordion">
      {bands.length
        ? type === "local"
          ? bands.map((band) => {
              eventKey++;
              return band.upcomingEvents ? (
                band.upcomingEvents.length ? (
                  <AccordionItem eventKey={eventKey}>
                    <AccordionHeader className="row">
                      <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                        <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              src={`http://localhost:8000/${band.profilePicture}`}
                              alt="Artist Image"
                            />
                          </Figure>
                        </a>
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
                      <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
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
                      </a>
                    </Accordion.Body>
                  </AccordionItem>
                ) : null
              ) : null;
            })
          : bands.map((band) => {
              eventKey++;
              return band._embedded.attractions[0].upcomingEvents ? (
                band._embedded.attractions[0].upcomingEvents._total > 0 ? (
                  band._embedded.venues[0].country.countryCode === "US" ? (
                    <AccordionItem eventKey={eventKey}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <a href={band._embedded.venues[0].url}>
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
                          </a>
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
                        <a href={`${band.url}`}>
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
                        </a>
                      </Accordion.Body>
                    </AccordionItem>
                  ) : (
                    <AccordionItem eventKey={eventKey}>
                      <AccordionHeader className="row">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                          <a href={band._embedded.venues[0].url}>
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
                          </a>
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
                        <a href={`${band.url}`}>
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
                        </a>
                      </Accordion.Body>
                    </AccordionItem>
                  )
                ) : null
              ) : null;
            })
        : null}
    </Accordion>
  );
};

export default Event;
