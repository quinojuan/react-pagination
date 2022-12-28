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
      <Records data={data}/>
    </div>
  );
}

export default App;
