import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Auth.css";
import auth from "./Auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
toast.configure();

export default function Login(props) {
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentNumber !== undefined && password !== undefined) {
      axios({
        method: "POST",
        data: {
          studentNumber: studentNumber,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:3500/student/login",
      }).then((res) => {
        if (res.data.studentNumber) {
          auth.login(res.data.studentNumber);
          navigate("/addcourse", { replace: true });
        } else toast.error(res.data.message);
      });
    }
  };
  return (
    <FormLayout
      handleSubmit={handleSubmit}
      setStudentNumber={setStudentNumber}
      setPassword={setPassword}
    />
  );
}
function FormLayout(props) {
  return (
    <div className="Login">
      <Form onSubmit={props.handleSubmit}>
        <h2 className="h2text" text-align="center">
          Login
        </h2>
        <br />
        <Form.Group className="mb-3" size="lg" controlId="formEmail">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="fill your student ID"
            onChange={(event) => props.setStudentNumber(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Fill your password"
            onChange={(event) => props.setPassword(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Button variant="success" size="lg" type="submit">
          Login
        </Button>
        <br></br>
        <a href="/register" class="btn btn-outline-secondary btn-lg">
          Register
        </a>
      </Form>
    </div>
  );
}
