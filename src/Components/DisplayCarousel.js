import React, { useState } from "react";

import ArtistCard from "./ArtistCard.js";
import Carousel from "react-grid-carousel";

const ControlledCarousel = (props) => {
  const bands = props.bands;

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
        ? bands.map((band, index) => {
            return (
              index < 18 && (
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
