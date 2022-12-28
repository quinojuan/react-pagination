import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import Records from "./components/Records";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1)
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10)

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

  // Records to be desplayed on the current page
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

  // calculates the number of pages
  const nPages = Math.ceil(data.length /recordsPerPage)

  useEffect(() => {
    axios("http://localhost:3002/MOCK_DATA.json")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "There was an error while retrieving the data",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, []);


  return (
    <div className="container">
      <Records data={currentRecords}/>
    </div>
  );
}

export default App;
