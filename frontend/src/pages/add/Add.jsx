import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";
import "./add.css";

export default function Add() {
  // For navigation during button click
  const navigate = useNavigate();
  // State object of our student
  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    course: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });

  // represents the profile picture uploaded
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Used for updating our state object
  const updateStudent = (e) => {
    const fieldName = e.target.name;
    setStudent((currentStudent) => ({
      ...currentStudent,
      [fieldName]: e.target.value,
    }));
  };

  // Show info or error message during calling of the Axios REST API
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit and using FormData API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studenData = new FormData();
    studenData.append("studentId", student.studentId);
    studenData.append("firstName", student.firstName);
    studenData.append("lastName", student.lastName);
    studenData.append("course", student.course);
    studenData.append("address", student.address);
    studenData.append("rfidBadgeNumber", student.rfidBadgeNumber);
    if (file) {
      studenData.append("file", file);
    }
    try {
      await axios.post("http://localhost:5000/api/students", studenData);
      showMessage(true, "info", "Successfully added student information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Displays the form for Adding
  return (
    <>
      <Header />
      <div className="header">
        <h1>Add Student</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon">
                  Add Profile Pic
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
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
                  onChange={updateStudent}
                  className="addInputs"
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
                  onChange={updateStudent}
                  className="addInputs"
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
                  onChange={updateStudent}
                  className="addInputs"
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
                  onChange={updateStudent}
                  className="addInputs"
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
                  onChange={updateStudent}
                  className="addInputs"
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
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Add
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
