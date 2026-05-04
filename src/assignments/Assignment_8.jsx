import "./Assignment_8.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_8() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const search = () => {
    setDisabled(true);
    axios
      .get("https://apis.dnjs.lk/objects/colors.php?search=" + searchText)
      .then((response) => {
        setData(response.data);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setDisabled(false);
      });
  };

  useEffect(() => {
    search();
  }, []);

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
        <button disabled={disabled}
        onClick={() => search(searchText)}>Search</button>
      </div>
      <div className="colorBox">
        <h1>Colors</h1>
        <br></br>
        <div className="color-box">
          <ul>
            {data.map((item, index) => (
              <li key={index} style={{color:item.code}}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Assignment_8;
