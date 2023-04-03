import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Signup-Login.css";
import logo from "../css/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userType, setUserType] = useState("fan");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { name, age, username, password, city, country, userType };
    const headers = { "Content-Type": "aplication/json" };

    try {
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
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

  return (
    <div className="container">
      <img className="logo" src={logo}></img>
      <Form className="signup-form" onSubmit={() => handleSubmit()}>
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
          <Form.Control type="email" placeholder="Enter email" />
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
            autocomplete="new-password"
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Repeat the password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autocomplete="new-password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose your profile image:</Form.Label>
          <Form.Control type="file" />
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
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUserType">
          <Form.Label>Are you a fan or an artist?</Form.Label>
          <Form.Check
            inline
            label="Fan"
            type="radio"
            id="fan"
            name="userType"
            value="fan"
            checked={userType === "fan"}
            onChange={(e) => setUserType(e.target.value)}
          />
          <Form.Check
            inline
            label="Artist"
            type="radio"
            id="artist"
            name="userType"
            value="artist"
            checked={userType === "artist"}
            onChange={(e) => setUserType(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
export default Signup;
