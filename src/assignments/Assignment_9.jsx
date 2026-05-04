import "./Assignment_9.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_9() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const search = (searchText) => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php?search=" + searchText)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const fetchData = () => {
    axios
      .get(
        ` https://apis.dnjs.lk/objects/colors.php?search=${searchText}&page=${page}&limit=${limit}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  return (
    <>
      <div className="inputBox2">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => search(searchText)}>Search</button>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="colorBox">
        <h1>Colors</h1>
        <br></br>
        <div className="color-box">
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pageBox">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span> Page {page + 1} </span>
        <button onClick={() => {setPage(page + 1);
          fetchData();
        } }>Next</button>
      </div>
    </>
  );
}

export default Assignment_9;
