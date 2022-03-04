import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import auth from "../Auth/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

export default function NavBar() {
  let navigate = useNavigate();
  let handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3500/student/logout",
    }).then((res) => {
      auth.logout();
      navigate("/", { replace: true });
    });
  };
  return (
    <div>
      <Navbar
        className="navStyle"
        collapseOnSelect
        bg="light shadow"
        expand="lg"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/addcourse">
            Assignment2 | Registration System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/addcourse">Add Course</Nav.Link>
              <Nav.Link href="/allstudents">All Students</Nav.Link>
              <Nav.Link href="/allcourses">Available Courses</Nav.Link>
              <Nav.Link href="/enrolled">Enrolled Courses</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link onClick={handleSubmit}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
