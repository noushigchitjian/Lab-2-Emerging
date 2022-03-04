import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
toast.configure();
export default function EditSection(props) {
  const location = useLocation();
  const [courseId, setCourseId] = useState(location.state.courseId);
  const [courseCode, setCourseCode] = useState(location.state.courseCode);
  const [courseName, setCourseName] = useState(location.state.courseName);
  const [section, setSection] = useState(location.state.section);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        courseId: courseId,
        section: section,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/updatecourse",
    }).then((response) => {
      if (response.data.message === "session expired") {
        toast.error(response.data.message);
        auth.logout();
        navigate("/", { replace: true });
      } else {
        toast(response.data.message);
        navigate("/enrolled", { replace: true });
      }
    });
  };

  return (
    <div>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <h1>Update Your Course Section</h1>

        <Form.Group className="mb-3" size="lg" controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text" value={courseCode} disabled={true} />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" value={courseName} disabled={true} />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formSection">
          <Form.Label>Section you you would like to change</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Section"
            onChange={(event) => setSection(event.target.value)}
            required={true}
            value={section}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
