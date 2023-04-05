import React, { useState } from "react";

import ArtistCard from "./ArtistCard.js";
import Carousel from "react-grid-carousel";

const ControlledCarousel = (props) => {
  const bands = props.bands;
  const type = props.type;

  return (
    <Carousel
      cols={6}
      rows={1}
      gap={10}
      loop={true}
      scrollSnap={true}
      hideArrow={false}
      showDots={true}
      style={{ height: "100%" }}
      //mobileBreakpoint={650}
    >
      {bands.length
        ? type === "local"
          ? bands.map((band, index) => {
              return (
                index < 18 && (
                  <Carousel.Item>
                    <ArtistCard
                      className="band"
                      name={band.name}
                      profilePicture={`http://localhost:8000/${band.profilePicture}`}
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
          : bands.map((band, index) => {
              return (
                index < 18 && (
                  <Carousel.Item>
                    <ArtistCard
                      className="band"
                      name={band.name}
                      profilePicture={
                        band.images.find((element) => element.ratio === "16_9")
                          .url
                      }
                      id={band.id}
                      touring={
                        band._embedded.attractions[0].upcomingEvents
                          ? band._embedded.attractions[0].upcomingEvents
                              ._total > 0
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
