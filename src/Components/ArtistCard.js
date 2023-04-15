import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../ArtistCard.css";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import Image from "react-bootstrap/Image";

const ArtistCard = (props) => {
  const bandName = props.name;
  const bandPic = props.profilePicture;
  const isTouring = props.touring;
  const bandId = props.id;
  const currentFaveArtists = props.currentFaveArtists;
  const id = sessionStorage.getItem("userId");

  return (
    <Card
      className="bg-dark text-white artistCard"
      style={{ width: "auto" }}
      key={bandId}
    >
      <Nav.Link href={"artist/" + bandId}>
        <Card.Img src={bandPic} alt="Artist Picture" />
      </Nav.Link>
      <Card.ImgOverlay>
        <div className="favoritediv">
          {id ? (
            currentFaveArtists.length ? (
              currentFaveArtists.find((artist) => artist.id === bandId) ? (
                <Image
                  roundedCircle={true}
                  src={`http://localhost:8000/profile-pics/Filled.png`}
                  alt="Filled Heart"
                  className="favorite"
                  onClick={props.onHeartClick}
                  id={bandId}
                  title={bandName}
                ></Image>
              ) : (
                <Image
                  roundedCircle={true}
                  src={`http://localhost:8000/profile-pics/Outline.png`}
                  alt="Heart Outline"
                  className="favorite"
                  onClick={props.onHeartClick}
                  id={bandId}
                  title={bandName}
                ></Image>
              )
            ) : (
              <Image
                roundedCircle={true}
                src={`http://localhost:8000/profile-pics/Outline.png`}
                alt="Heart Outline"
                className="favorite"
                onClick={props.onHeartClick}
                id={bandId}
                title={bandName}
              ></Image>
            )
          ) : null}
        </div>
        <Nav.Link href={"artist/" + bandId}>
          <Card.Title className="bandName">{bandName}</Card.Title>
          {isTouring ? (
            <Card.Footer className="isTouring">Upcoming Shows</Card.Footer>
          ) : null}
        </Nav.Link>
      </Card.ImgOverlay>
    </Card>
  );
};

export default ArtistCard;
