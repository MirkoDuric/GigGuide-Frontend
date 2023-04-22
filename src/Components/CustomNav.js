import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../Components/Button";
import "../CustomNav.css";

const CustomNav = (props) => {
  const id = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const onHomeClick = () => {
    setExpanded(false);
    navigate("/homepage");
  };
  const onProfileClick = () => {
    setExpanded(false);
    navigate(`/userprofile/${id}`);
  };
  const onLocalArtistsClick = () => {
    setExpanded(false);
    navigate("/localartists");
  };
  const onSearchClick = () => {
    setExpanded(false);
    navigate("/search/0/0/0/0");
  };
  const onLogoutClick = () => {
    setExpanded(false);
    navigate("/");
  };
  return id ? (
    <Navbar bg="dark" expand={expanded} className="navdiv" fixed="top">
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
              <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
              <Nav.Link onClick={onProfileClick}>Profile</Nav.Link>
              <Nav.Link onClick={onLocalArtistsClick}>Local Artists</Nav.Link>
              <Nav.Link onClick={onSearchClick}>Search</Nav.Link>
              <Nav.Link
                onClick={() => {
                  sessionStorage.clear();
                  onLogoutClick();
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
        <Button name="localartists" />
        <Button name="homepage" />
        <Button name="signup" />
        <Button name="login" />
      </div>
    </Navbar>
  );
  <Outlet />;
};

export default CustomNav;
