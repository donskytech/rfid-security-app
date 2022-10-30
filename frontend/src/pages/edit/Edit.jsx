import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Edit() {
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
  // The profile picture file
  const [file, setFile] = useState(null);
  // Messages used to display if successful or error during updating
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

  // Update our state object
  const updateStudent = (e) => {
    const fieldName = e.target.name;
    setStudent((currentStudent) => ({
      ...currentStudent,
      [fieldName]: e.target.value,
    }));
  };

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
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
      await axios.put(
        "http://localhost:5000/api/students/" + student._id,
        studenData
      );
      showMessage(true, "info", "Successfully edited student information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // The user interface for the Edit page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Edit Student</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : student.imagePic
                    ? `http://localhost:5000/${student.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>Add
                Profile Pic
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
                  className="editInputs"
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
                  className="editInputs"
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
                  className="editInputs"
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
                  className="editInputs"
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
                  className="editInputs"
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
                  className="editInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Edit
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
