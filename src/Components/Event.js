import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

const Event = (props) => {
  //const bands = props.bands;
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
      upcomingEvents: [1],
    },
  ];

  return (
    <Stack gap={2}>
      {bands.length
        ? bands.type !== "local"
          ? bands.map((band) => {
              return band.upcomingEvents ? (
                band.upcomingEvents.length ? (
                  <a href={`https://${band.upcomingEvents[0].ticketUrl}`}>
                    <div className="row">
                      <div className="col-2">
                        <Figure>
                          <Figure.Image
                            width={"100%"}
                            alt="171x180"
                            src={band.profilePicture}
                          />
                        </Figure>
                      </div>
                      <div className="col">
                        <Card>
                          <Card.Header>
                            <h2>{band.name}</h2>
                          </Card.Header>
                          <Card.Body>
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
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <div className="hr" />
                  </a>
                ) : null
              ) : null;
            })
          : bands.map((band) => {
              return (
                <a href={band._embedded.venues[0].url}>
                  <div className="row">
                    <div className="col">
                      <Figure>
                        <Figure.Image
                          width={171}
                          height={180}
                          alt="171x180"
                          src={band.images[1]}
                        />
                      </Figure>
                    </div>
                    <div className="col">
                      <Card>
                        <Card.Body>
                          <div className="row">
                            <h3>{band.name}</h3>
                          </div>
                          <div className="row">
                            <h6>{band._embedded.venues[0].name}</h6>
                            <br />
                            <p>
                              {band._embedded.venues[0].address},{" "}
                              {band._embedded.venues[0].city},{" "}
                              {band._embedded.venues[0].state}{" "}
                              {band._embedded.venues[0].postalCode}
                            </p>
                          </div>
                          <div className="row">
                            <p className="eventDate">
                              {band.dates.start.localDate},{" "}
                              {band.dates.start.localTime}
                            </p>
                          </div>
                          <div className="row">
                            <p className="eventInfo">{band.info}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                  <div className="hr" />
                </a>
              );
            })
        : null}
    </Stack>
  );
};

export default Event;
