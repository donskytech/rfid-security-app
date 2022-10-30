import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Delete() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our student state information
  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    course: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Get the student information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getStudent = async () => {
      const res = await axios.get("http://localhost:5000/api/students/" + id);
      setStudent(res.data);
    };
    getStudent();
  }, []);

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/students/" + student._id);
      showMessage(true, "info", "Successfully deleted student information");
      clearStudentInfo();
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Clear student info after deletion
  const clearStudentInfo = () => {
    setStudent({
      studentId: "",
      firstName: "",
      lastName: "",
      course: "",
      address: "",
      rfidBadgeNumber: "",
      imagePic: "",
    });
  };

  // The user interface for the Delete page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Delete Student</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  student.imagePic
                    ? `http://localhost:5000/${student.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="studentId" className="fieldLabel">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  value={student.studentId}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="firstName" className="fieldLabel">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={student.firstName}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="lastName" className="fieldLabel">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={student.lastName}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="course" className="fieldLabel">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={student.course}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={student.address}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="rfidBadgeNumber" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="text"
                  name="rfidBadgeNumber"
                  id="rfidBadgeNumber"
                  value={student.rfidBadgeNumber}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Delete
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
