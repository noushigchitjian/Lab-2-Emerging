import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EnrolledCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
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
          setData(res.data);
          setShowLoading(false);
        }
      });
    };

    fetchData();
  }, [showLoading]);

  const drop = (id) => {
    console.log("");
    axios({
      method: "POST",
      data: {
        courseId: id,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/dropcourse",
    }).then((res) => {
      console.log(res);
      if (res.data.message === "") {
        auth.logout();
        toast.error(res.data.message);
        navigate("/", { replace: true });
      } else {
        toast.success(res.data.message);
        setShowLoading(true);
      }
    });
  };

  return (
    <div>
      <NavBar />
      {showLoading && (
        <Spinner animation="border" role="status">
          <span></span>
        </Spinner>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Course Section</th>
            <th>Drop/Edit Course</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr>
              <td>{item._id.courseCode}</td>
              <td>{item._id.courseName}</td>
              <td>{item.section}</td>
              <td>
                <td>
                  <Button
                    variant="dark"
                    size="lg"
                    onClick={() =>
                      navigate("/edit", {
                        state: {
                          courseId: item._id._id,
                          courseCode: item._id.courseCode,
                          courseName: item._id.courseName,
                          section: item.section,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>
                </td>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => {
                    drop(item._id._id);
                  }}
                >
                  Drop
                </Button>
              </td>
            </tr>
          ))}{" "}
        </tbody>
      </Table>
    </div>
  );
}
