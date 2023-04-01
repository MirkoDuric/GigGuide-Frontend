import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "../ArtistCard.css";
import { NavLink } from "react-router-dom";

const ArtistCard = (props) => {
  const bandName = props.name;
  const bandPic = props.profilePicture;
  const isTouring = props.touring;
  const bandId = props.id;

  return (
    <NavLink to={"artist/" + bandId}>
      <Card className="bg-dark text-white artistCard" style={{ width: "auto" }}>
        <Card.Img src={bandPic} alt="Band Pic" />
        <Card.ImgOverlay>
          <Card.Title className="bandName">{bandName}</Card.Title>
          {isTouring ? (
            <span className="isTouring">Band has Upcoming Shows</span>
          ) : null}
        </Card.ImgOverlay>
      </Card>
    </NavLink>
  );
};

export default ArtistCard;
