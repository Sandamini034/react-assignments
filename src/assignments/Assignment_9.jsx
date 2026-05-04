import "./Assignment_9.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_9() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [disabled, setDisabled] = useState(false);

  const pageNumbers = Array.from(
    { length: Math.ceil(100 / limit) },
    (_, i) => i
  );

  const fetchData = () => {
    setData([]);
    setDisabled(true);
    axios
      .get(
        ` https://apis.dnjs.lk/objects/colors.php?search=${searchText}&page=${page}&limit=${limit}`
      )
      .then((response) => {
        setData(response.data.data);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setDisabled(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <>
      <div className="inputBox2">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          disabled={disabled}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={fetchData} disabled={disabled}>
          Search
        </button>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
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
              <li key={item.name} style={{ color: item.code }}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pageBox">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            disabled={disabled || page === num}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Assignment_9;
