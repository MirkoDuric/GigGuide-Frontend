import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

const Event = (props) => {
  //const bands = props.bands;
  //const type = props.type;
  let eventKey = 0;
  const type = "";
  const bands = [
    {
      _id: "6425f346b08f3d401bad0c77",
      name: "Ed Brown",
      email: "ebro1230@gmail.com",
      username: "ebro1230",
      password: "$2b$10$AT61yBQ3X11uub0h6Qbr/O6wEbMgSgRQsbBYDE/n5n4yi4i9/HejG",
      city: "Dresden",
      country: "Germany",
      createdAt: "2023-03-30T20:38:30.264Z",
      updatedAt: "2023-04-01T07:40:01.255Z",
      __v: 0,
      songsList: [
        {
          name: "testChange",
          duration: 600,
          _id: "6427dfd1b64daafa5ade2c55",
        },
      ],
      upcomingEvents: [
        {
          date: "2023-03-30T20:40:29.292Z",
          startTime: "2023-03-30T20:40:29.292Z",
          venue: "Ed's House",
          address: "123 Fake Street",
          ticketUrl: "www.google.com",
          info: "Small and intimate venue with great acoustics",
          _id: "6425f3bdb08f3d401bad0c7f",
        },
      ],
      profilePicture: "http://localhost:8000/profile-pics/P1010305.JPG",
    },
    {
      _id: "642752643a4d7da0d52fe3f7",
      name: "Jack Yellow",
      email: "jackieb@gmail.com",
      username: "jb123",
      password: "$2b$10$EAXhAyXAAYU4TMzFX.LKYO6vqT5CLXQeCF9jpCQyJEhESKKatghta",
      profilePicture: "http://localhost:8000/profile-pics/P1010541.JPG",
      bannerPicture: "banner-pics\\P1010533.JPG",
      city: "Los Angeles",
      country: "USA",
      createdAt: "2023-03-31T21:36:36.094Z",
      updatedAt: "2023-03-31T21:54:11.356Z",
      __v: 0,
      upcomingEvents: [],
    },
    {
      _id: "6427fe6cacc63a072c26b2e9",
      name: "Jack Black",
      email: "jackieb2@gmail.com",
      username: "jb1234",
      password: "$2b$10$QGAN5CtpeY2A04Yodr0e4OhGG4QyUJREYmKVCvAYap9yMw./Bk9OC",
      profilePicture: "http://localhost:8000/profile-pics/P1010408.JPG",
      city: "Los Angeles",
      country: "USA",
      createdAt: "2023-04-01T09:50:36.320Z",
      updatedAt: "2023-04-01T09:50:36.320Z",
      __v: 0,
      upcomingEvents: [],
    },
    {
      _id: "6427fe6cacc63a072c26b2e9",
      name: "Fletcher",
      email: "jackieb2@gmail.com",
      username: "jb1234",
      password: "$2b$10$QGAN5CtpeY2A04Yodr0e4OhGG4QyUJREYmKVCvAYap9yMw./Bk9OC",
      profilePicture: "http://localhost:8000/profile-pics/P1010381.JPG",
      city: "Los Angeles",
      country: "USA",
      createdAt: "2023-04-01T09:50:36.320Z",
      updatedAt: "2023-04-01T09:50:36.320Z",
      __v: 0,
      upcomingEvents: [
        {
          date: "2023-03-30T20:40:29.292Z",
          startTime: "2023-03-30T20:40:29.292Z",
          venue: "Ed's House",
          address: "123 Fake Street",
          ticketUrl: "www.google.com",
          info: "Small and intimate venue with great acoustics",
          _id: "6425f3bdb08f3d401bad0c7f",
        },
      ],
    },
    {
      _id: "6427fe6cacc63a072c26b2e9",
      name: "Dermot Kennedy",
      email: "jackieb2@gmail.com",
      username: "jb1234",
      password: "$2b$10$QGAN5CtpeY2A04Yodr0e4OhGG4QyUJREYmKVCvAYap9yMw./Bk9OC",
      profilePicture: "http://localhost:8000/profile-pics/P1010479.JPG",
      city: "Los Angeles",
      country: "USA",
      createdAt: "2023-04-01T09:50:36.320Z",
      updatedAt: "2023-04-01T09:50:36.320Z",
      __v: 0,
      upcomingEvents: [
        {
          date: "2023-03-30T20:40:29.292Z",
          startTime: "2023-03-30T20:40:29.292Z",
          venue: "Ed's House",
          address: "123 Fake Street",
          ticketUrl: "www.google.com",
          info: "Small and intimate venue with great acoustics",
          _id: "6425f3bdb08f3d401bad0c7f",
        },
      ],
    },
  ];

  const shania = [
    {
      name: "Shania Twain: Queen Of Me Tour",
      type: "event",
      id: "G5eVZ94L3b7SJ",
      test: false,
      url: "https://concerts.livenation.com/shania-twain-queen-of-me-tour-charlotte-north-carolina-06-28-2023/event/2D005D57D2604CE6",
      locale: "en-us",
      images: [
        {
          ratio: "3_2",
          url: "https://s1.ticketm.net/dam/a/1d1/47cc9b10-4904-4dec-b1d6-539e44a521d1_1825531_RETINA_PORTRAIT_3_2.jpg",
          width: 640,
          height: 427,
          fallback: false,
        },
        {
          ratio: "16_9",
          url: "https://s1.ticketm.net/dam/a/1d1/47cc9b10-4904-4dec-b1d6-539e44a521d1_1825531_EVENT_DETAIL_PAGE_16_9.jpg",
          width: 205,
          height: 115,
          fallback: false,
        },
      ],
      sales: {},
      dates: {
        start: {
          localDate: "2023-06-28",
          localTime: "19:30:00",
          dateTime: "2023-06-28T23:30:00Z",
          dateTBD: false,
          dateTBA: false,
          timeTBA: false,
          noSpecificTime: false,
        },
      },
      classifications: [],
      promoter: {},
      promoters: [],
      info: "Show 7:30pm. This is an outdoor venue with portions of the reserved seats under cover. The show will take place rain or shine. All dates, acts, & ticket prices subject to change without notice. All tickets are subject to applicable service fees via all points of sale. Children under 2 are free as long as they don't take up a seat.",
      pleaseNote:
        "Show 7:30pm. This is an outdoor venue with portions of the reserved seats under cover. The show will take place rain or shine. All dates, acts, & ticket prices subject to change without notice. All tickets are subject to applicable service fees via all points of sale. Children under 2 are free as long as they don't take up a seat.",
      priceRanges: [],
      products: [],
      seatmap: {},
      accessibility: {},
      ticketLimit: {},
      ageRestrictions: {},
      ticketing: {},
      _links: {},
      _embedded: {
        venues: [
          {
            name: "PNC Music Pavilion",
            type: "venue",
            id: "KovZpZAEkeJA",
            test: false,
            url: "https://www.ticketmaster.com/pnc-music-pavilion-tickets-charlotte/venue/368716",
            locale: "en-us",
            aliases: [],
            images: [],
            postalCode: "28262",
            timezone: "America/New_York",
            city: {
              name: "Charlotte",
            },
            state: {
              name: "North Carolina",
              stateCode: "NC",
            },
            country: {
              name: "United States Of America",
              countryCode: "US",
            },
            address: {
              line1: "707 Pavilion Boulevard",
            },
          },
        ],
      },
    },
  ];

  return (
    <Accordion>
      {bands.length
        ? type !== "local"
          ? bands.map((band) => {
              eventKey++;
              return band.upcomingEvents ? (
                band.upcomingEvents.length ? (
                  <Accordion.Item eventKey={eventKey}>
                    <Accordion.Header className="row">
                      <div className="col-2">
                        <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
                          <Figure>
                            <Figure.Image
                              width={"100%"}
                              alt="171x180"
                              src={band.profilePicture}
                            />
                          </Figure>
                        </a>
                      </div>
                      <div className="col">
                        <h2>{band.name}</h2>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body
                    //className="overflow-auto"
                    //style={{ maxHeight: "20vw" }}
                    >
                      <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
                        <div className="row">
                          <h4>
                            {band.upcomingEvents[0].venue} -{" "}
                            {band.upcomingEvents[0].date},{" "}
                            {band.upcomingEvents[0].startTime}
                          </h4>

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
                  </Accordion.Item>
                ) : null
              ) : null;
            })
          : shania.map((band) => {
              eventKey++;
              return (
                <Accordion.Item eventKey={eventKey}>
                  <Accordion.Header className="row">
                    <div className="col-2">
                      <a href={band._embedded.venues[0].url}>
                        <Figure>
                          <Figure.Image
                            width={"100%"}
                            alt="171x180"
                            src={band.images[1].url}
                          />
                        </Figure>
                      </a>
                    </div>
                    <div className="col">
                      <h2>{band.name}</h2>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body
                    className="overflow-auto"
                    style={{ maxHeight: "20vw" }}
                  >
                    <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
                      <div className="row">
                        <h4>
                          {band._embedded.venues[0].name} -{" "}
                          {band.dates.start.localDate},{" "}
                          {band.dates.start.localTime}
                        </h4>

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
                </Accordion.Item>
              );
            })
        : null}
    </Accordion>
  );
};

export default Event;
