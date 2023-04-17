import React, { useState } from "react";

import ArtistCard from "./ArtistCard.js";
import Carousel from "react-grid-carousel";

const ControlledCarousel = (props) => {
  const bands = props.bands;
  const type = props.type;
  const onHeartClick = props.onHeartClick;
  const currentFaveArtists = props.currentFaveArtists;

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
      responsiveLayout={[
        {
          breakpoint: 1200,
          cols: 5,
          rows: 1,
          gap: 10,
          loop: true,
          hideArrow: false,
          showDots: true,
        },
        {
          breakpoint: 992,
          cols: 4,
          rows: 1,
          gap: 10,
          loop: true,
          hideArrow: false,
          showDots: true,
        },
        {
          breakpoint: 768,
          cols: 3,
          rows: 1,
          gap: 10,
          loop: true,
          hideArrow: false,
          showDots: true,
        },
        /*  {
          breakpoint: 576,
          cols: 2,
          rows: 1,
          gap: 10,
          loop: true,
          hideArrow: false,
          showDots: true,
        }, */
      ]}
      mobileBreakpoint={576}
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
                      onHeartClick={onHeartClick}
                      currentFaveArtists={currentFaveArtists}
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
                        band.images.find(
                          (element) =>
                            element.ratio === "16_9" && element.height > 150
                        ).url
                      }
                      id={
                        band._embedded.attractions[0]
                          ? band._embedded.attractions[0].id
                          : band.id
                      }
                      touring={
                        band._embedded.attractions[0].upcomingEvents
                          ? band._embedded.attractions[0].upcomingEvents
                              ._total > 0
                            ? true
                            : false
                          : false
                      }
                      onHeartClick={onHeartClick}
                      currentFaveArtists={currentFaveArtists}
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
