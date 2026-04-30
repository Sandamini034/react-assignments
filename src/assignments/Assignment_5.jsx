import "./Assignment_5.css";
import { useState } from "react";

function Assignment_5() {
  const [array, setArray] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [direction, setDirection] = useState(1);

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

  const move = (index, direction) => {
    if (
      (index === 0 && direction === -1) ||
      (index === array.length - 1 && direction === 1)
    )
      return;
    const newArray = [...array];
    let temp = newArray[index + direction];
    newArray[index + direction] = newArray[index];
    newArray[index] = temp;
    setArray(newArray);
  };

  const sort = (direction) => {
    const newArray = [...array].sort((a, b) =>
      direction === 1 ? a - b : b - a
    );
    setArray(newArray);
  };

  return (
    <>
      <div className="box4">
        <div className="buttonBox">
          <button onClick={() => sort(1)}>Sort Accending</button>
          <button onClick={() => sort(-1)}>Sort Descending</button>
        </div>
        <ul>
          {array.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <div className="btns">
                <button onClick={() => del(index)}>Delete</button>
                <button onClick={() => move(index, -1)}>Move Up</button>
                <button onClick={() => move(index, 1)}>Move Down</button>
              </div>
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
        <button onClick={add} disabled={disabled}>
          Add
        </button>
      </div>
    </>
  );
}

export default Assignment_5;
