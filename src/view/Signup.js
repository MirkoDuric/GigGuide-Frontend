import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Signup-Login.css";
import logo from "../css/logo.png";
import { countryNames, genreNames } from "../utils";

const Signup = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userType, setUserType] = useState("fan");
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [id, setId] = useState(sessionStorage.getItem("userId"));

  useEffect(() => {
    if (id) {
      navigate("/homepage");
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("profile", profile);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("userType", userType);
    formData.append("genre", genre);
    setSuccess(true);
    /*   const payload = {
      name,
      age,
      username,
      password,
      city,
      country,
      userType,
      profile: profile,
    }; */
    //const headers = { "Content-Type": "aplication/json" };
    //const headers = { "Content-Type": "multipart/form-data" };
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/user/signup`,
        {
          method: "POST",

          //headers,
          //body: payload,
          body: formData,
        }
      );
      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message);
      }
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setProfile(img);
  };

  return (
    <div className="container signupdiv">
      <img className="logo" src={logo}></img>
      {success ? (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Successful signup!</Modal.Title>
          </Modal.Header>
        </Modal>
      ) : (
        <Form className="signup-form" onSubmit={handleSubmit}>
          <p className="signup-title">
            <span className="signup-title-span">Sign up</span> and enjoy our
            GigGuide<span className="signup-title-span">!</span>
          </p>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Repeat the password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose your profile image:</Form.Label>
            <Form.Control
              type="file"
              name="profile"
              onChange={handleFileChange}
            />
            <Form.Text className="text-muted">
              Please select an image to upload.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Country:</Form.Label>
            <Form.Select
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            >
              <option key="blankChoice" hidden value>
                {" "}
                --Country--{" "}
              </option>
              <option>None</option>
              {countryNames.map((countryName) => {
                return <option key={countryName}>{countryName}</option>;
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formUserType">
            <Form.Label>Are you a fan or an artist?</Form.Label>
            <Form.Check
              inline
              label="Fan"
              type="radio"
              id="fan"
              name="userType"
              value="Fan"
              checked={userType === "Fan"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <Form.Check
              inline
              label="Artist"
              type="radio"
              id="Artist"
              name="userType"
              value="Artist"
              checked={userType === "Artist"}
              onChange={(e) => setUserType(e.target.value)}
            />
          </Form.Group>
          {userType === "Artist" ? (
            <Form.Group controlId="formGenre">
              <Form.Label>Genre:</Form.Label>
              <Form.Select
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              >
                <option key="blankChoice" hidden value>
                  {" "}
                  --Genre--{" "}
                </option>
                <option>None</option>
                {genreNames.map((genreName) => {
                  return <option>{genreName}</option>;
                })}
              </Form.Select>
            </Form.Group>
          ) : null}
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      )}
    </div>
  );
};
export default Signup;
