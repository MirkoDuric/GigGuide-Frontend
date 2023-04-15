import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router";
import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../Components/Button";
import "../CustomNav.css";

const CustomNav = (props) => {
  const id = sessionStorage.getItem("userId");
  const navigation = useNavigate();
  return id ? (
    <Navbar bg="dark" expand={false} className="navdiv" fixed="top">
      <Container fluid>
        <Navbar.Brand>
          <div className="col Logodiv">
            <Button name="Logo" /> {"  "}
            <span className="titlespan">
              <span className="titlespan-bold">Gig</span>Guide
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${false}`}
          className="toggleButton"
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
          className="toggleButton"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              bg="dark"
              id={`offcanvasNavbarLabel-expand-${false}`}
            >
              <div className="col Logodiv">
                <Button name="Logo" /> {"  "}
                <span className="titlespan">
                  <span className="titlespan-bold">Gig</span>Guide
                </span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href={`/homepage`}>Home</Nav.Link>
              <Nav.Link href={`/user/fan/${id}`}>Profile</Nav.Link>
              <Nav.Link href={`/search/0/0/0/0`}>Search</Nav.Link>
              <Nav.Link href={`/Local Artists`}>Local Artists</Nav.Link>
              <Nav.Link href={`/user/fan/${id}/events`}>My Events</Nav.Link>
              <Nav.Link
                href={`/`}
                onClick={() => {
                  sessionStorage.clear();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ) : (
    <Navbar bg="dark" className="navdiv" fixed="top">
      <div className="col Logodiv">
        <Button name="Logo" /> {"  "}
        <span className="titlespan">
          <span className="titlespan-bold">Gig</span>Guide
        </span>
      </div>
      <div className="col buttonsdiv">
        <Button name="Local Artists" />
        <Button name="Homepage" />
        <Button name="Signup" />
        <Button name="Login" />
      </div>
    </Navbar>
  );
  <Outlet />;
};

export default CustomNav;
