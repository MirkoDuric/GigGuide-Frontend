import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/Signup-Login.css";
import logo from "../css/logo.png";

const Login = () => {
  return (
    <div className="container">
      <img className="logo" src={logo}></img>
      <Form className="signup-form" onSubmit>
        <p className="signup-title">
          <span className="signup-title-span">Log in</span> and enjoy our
          GigGuide<span className="signup-title-span">!</span>
        </p>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
};
export default Login;
