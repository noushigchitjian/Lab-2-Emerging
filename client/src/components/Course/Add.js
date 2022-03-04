import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

toast.configure();

export default function AddCourse(props) {
  const [courseCode, setCourseCode] = useState();
  const [courseName, setCourseName] = useState();
  const [sections, setSections] = useState();
  const [semester, setSemester] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        courseCode: courseCode,
        courseName: courseName,
        section: sections,
        semester: semester,
      },
      withCredentials: true,
      url: "http://localhost:3500/course/addcourse",
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === "yes") {
          toast.success(response.data.message);
          navigate("/allcourses", { replace: true });
        } else if (response.data.message === "") {
          toast.error(response.data.message);
          auth.logout();
          navigate("/", { replace: true });
        } else toast.error(response.data.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <h1>Add Course</h1>
        <br />
        <Form.Group controlId="formSemester">
          <Form.Label>Semester Term</Form.Label>
          <Form.Select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            required={true}
          >
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="COMP 122"
            onChange={(event) => setCourseCode(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Programming 2"
            onChange={(event) => setCourseName(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="formCourseSection">
          <Form.Label>Section Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="3"
            onChange={(event) => setSections(event.target.value)}
            required={true}
          />
        </Form.Group>

        <p></p>
        <Button variant="success" size="lg" type="submit">
          Add Course
        </Button>
      </Form>
    </div>
  );
}
