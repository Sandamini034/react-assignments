import "./Assignment_7.css";
import { useState, useEffect, use } from "react";
import axios from "axios";

function Assignement_7() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(" https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="colorBox">
      <h1>Colors</h1>
      <div className="color-box">
        {data.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Assignement_7;
