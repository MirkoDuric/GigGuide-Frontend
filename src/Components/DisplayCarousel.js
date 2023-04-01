import React, { useState } from "react";

import ArtistCard from "./ArtistCard.js";
import Carousel from "react-grid-carousel";

const ControlledCarousel = (props) => {
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
          ticketUrl: "ticket url",
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
    <Carousel
      cols={3}
      rows={1}
      gap={10}
      loop={true}
      scrollSnap={true}
      hideArrow={false}
      style={{ height: "25%" }}
    >
      {bands.length
        ? bands.map((band, index) => {
            return (
              index < 15 && (
                <Carousel.Item>
                  <ArtistCard
                    className="band"
                    name={band.name}
                    profilePicture={band.profilePicture}
                    id={band._id}
                    touring={
                      band.upcomingEvents
                        ? band.upcomingEvents.length
                          ? true
                          : false
                        : false
                    }
                  />
                </Carousel.Item>
              )
            );
          })
        : null}
    </Carousel>
  );
};

export default ControlledCarousel;
