import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/Signup-Login.css";
import logo from "../css/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    const payload = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        payload,
        { headers }
      );
      if (response.status === 200) {
        const { data } = await response;
        const token = data.token;
        const id = data.response._id;
        console.log(token);
        console.log(id);
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("userId", id);

        navigate("/homepage");
      } else {
        const errorData = response.data;
        console.log(errorData);
        navigate("/login");
        throw new Error(errorData.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <Form className="signup-form" onSubmit={handleLogin}>
        <p className="signup-title">
          <span className="signup-title-span">Log in</span> and enjoy our
          GigGuide<span className="signup-title-span">!</span>
        </p>
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
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
