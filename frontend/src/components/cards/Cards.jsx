import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function Cards({ students }) {
  return (
    <div className="cardsWrapper">
      <div className="cards">
        {students.length === 0 && <p>No student(s) found</p>}
        {students.map((student) => {
          return (
            <div key={student._id} className="card">
              <img
                src={
                  student.imagePic
                    ? "http://localhost:5000/" + student.imagePic
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="profile pic"
              />
              <h3>{`${student.firstName} ${student.lastName}`}</h3>
              <div className="text">
                <p>
                  <span className="label">Student ID:</span>
                </p>
                <p>
                  <span className="info">{student.studentId}</span>
                </p>
                <p>
                  <span className="label">Course:</span>
                </p>
                <p>
                  <span className="info">{student.course}</span>
                </p>
                <p>
                  <span className="label">RFID Number:</span>
                </p>
                <p>
                  <span className="info">{student.rfidBadgeNumber}</span>
                </p>
              </div>
              <div className="btnContainer">
                <Link to={`edit/${student._id}`} className="cardBtn m-top">
                  Edit
                </Link>
                <Link to={`delete/${student._id}`} className="cardBtn m-top">
                  Delete
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
