import axios from "axios";
import { useState, useEffect } from "react";
import FanProfilepage from "./FanProfilepage";
import ArtistProfilepage from "./ArtistProfilepage";

const UserProfilepage = () => {
  const id = sessionStorage.getItem("userId");

  const [user, setUser] = useState({
    userUsername: "",
    userName: "",
    userAge: null,
    userCity: "",
    userCountry: "",
    userProfileImg: "",
    userBannerImg: "",
    favouriteArtists: [],
    bio: "",
    songsList: [],
    upcomingEvents: [],
    userType: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}`)
      .then((response) => {
        setUser({
          userUsername: response.data.username,
          userName: response.data.name,
          userAge: response.data.age,
          userCity: response.data.city,
          userCountry: response.data.country,
          userProfileImg: response.data.profilePicture,
          userBannerImg: "",
          favouriteArtists: response.data.favouriteArtists,
          bio: response.data.bio,
          songsList: response.data.songsList,
          upcomingEvents: response.data.upcomingEvents,
          userType: response.data.userType,
        });
      });
  }, []);
  return (
    <>
      {user.userType === "Fan" ? (
        <FanProfilepage userData={user} />
      ) : (
        <>
          {user.userType === "Artist" ? (
            <ArtistProfilepage userData={user} />
          ) : null}
        </>
      )}
    </>
  );
};
export default UserProfilepage;
