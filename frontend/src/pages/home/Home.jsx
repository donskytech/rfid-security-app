import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";

export default function Home() {
  // state variables
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(students.length / recordsPerPage);

  // Get Students on initial load
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
    setLoading(false);
  };

  // function called to search for student
  const searchStudent = async (studentId, rfId) => {
    let url;
    if (studentId && rfId) {
      url = `http://localhost:5000/api/students?studentId=${studentId}&rfId=${rfId}`;
    } else if (studentId) {
      url = `http://localhost:5000/api/students?studentId=${studentId}`;
    } else if (rfId) {
      url = `http://localhost:5000/api/students?rfId=${rfId}`;
    }
    const res = await axios.get(url);
    setStudents(res.data);
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      {loading && <div>Loading page....</div>}
      <Header />
      <QueryFilter searchStudent={searchStudent} getStudents={getStudents} />
      <Cards students={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
