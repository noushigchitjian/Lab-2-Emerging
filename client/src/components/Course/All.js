import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
toast.configure();
export default function AllCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [Enrolled, setEnrolled] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3500/course",
      }).then((result) => {
        if (result.data.message === "") {
          toast.error(result.data.message);
          auth.logout();
          navigate("/", { replace: true });
        } else {
          setData(result.data);
          setShowLoading(false);
        }
      });
    };

    const getStudentCourses = () => {
      let temp = [];
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3500/student/courses",
      }).then((res) => {
        if (res.data.message === "") {
          toast.error(res.data.message);
          auth.logout();
          navigate("/", { replace: true });
        } else {
          res.data.map((item, idx) => {
            temp.push(item._id._id);
          });
          setEnrolled(temp);
        }
      });
    };
    fetchData();
    getStudentCourses();
  }, [showLoading]);

  const enroll = (id) => {
    axios({
      method: "POST",
      data: {
        courseId: id,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/addcourse",
    }).then((res) => {
      if (res.data.message === "") {
        toast.error(res.data.message);
        auth.logout();
        navigate("/", { replace: true });
      } else setShowLoading(true);
    });
  };

  const drop = (id) => {
    axios({
      method: "POST",
      data: {
        courseId: id,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/dropcourse",
    }).then((res) => {
      if (res.data.message === "") {
        toast.error(res.data.message);
        auth.logout();
        navigate("/", { replace: true });
      } else setShowLoading(true);
    });
  };

  const deleteCourse = async (id) => {
    drop(id);
    axios({
      method: "POST",
      data: {
        courseId: id,
      },
      withCredentials: true,
      url: "http://localhost:3500/course/delete",
    }).then((res) => {
      if (res.data.message === "") {
        toast.error(res.data.message);
        auth.logout();
        navigate("/", { replace: true });
      } else {
        toast(res.data.message);
        setShowLoading(true);
      }
    });
  };

  const enrolledStudents = (id) => {
    navigate("/enrolledstudents", { state: { id: id } });
  };

  return (
    <div>
      <NavBar />
      {showLoading && (
        <Spinner animation="border" role="status">
          <span></span>
        </Spinner>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Enrolled Courses</th>
            <th>Delete Course</th>
            <th>Enrolled Students</th>
            <th>
              <Button variant="dark" onClick={() => navigate("/addcourse")}>
                Add Course
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr>
              <td>{item.courseCode}</td>
              <td>{item.courseName}</td>
              <td>
                {!Enrolled.includes(item._id) ? (
                  <Button
                    variant="dark"
                    size="lg"
                    onClick={() => {
                      enroll(item._id);
                    }}
                  >
                    Enroll Course
                  </Button>
                ) : (
                  <Button variant="success" size="lg" disabled={true}>
                    Enrolled Courses
                  </Button>
                )}
              </td>

              <td>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => deleteCourse(item._id)}
                >
                  Delete Course
                </Button>
              </td>
              <td>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => {
                    enrolledStudents(item._id);
                  }}
                >
                  Enrolled Students
                </Button>
              </td>
            </tr>
          ))}{" "}
        </tbody>
      </Table>
    </div>
  );
}
