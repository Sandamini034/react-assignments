import "./Assignment_4.css";
import { useState } from "react";

function Assignment_4() {
  const [array, setArray] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(false);

  const average = array.length > 0 ? total / array.length : 0;
  const num = Number(number);

  const add = () => {
    setDisabled(true);

    if (number === "" || isNaN(num)) {
      setDisabled(false);
      return;
    }

    setDisabled(false);
    setArray([...array, num]);
    setTotal(total + num);
    setNumber("");
  };

  const del = (index) => {
    const removed = array[index];
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
    setTotal(total - removed);
  };

  return (
    <>
      <div className="box4">
        <ul>
          {array.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <button onClick={() => del(index)} key={index}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <label>total : {total}</label>
        <label>average : {average}</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <br></br>
        <button onClick={add} disabled={disabled}>Add</button>
      </div>
    </>
  );
}

export default Assignment_4;
