import "./Assignment_3.css";
import { useState } from "react";

function Assignment_3() {
  const [array, setArray] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(false);

  const average = array.length > 0 ? total / array.length : 0;

  const add = () => {
    const num = Number(number);
    setDisabled(true);

    if(number==="" || isNaN(num)){
      setDisabled(false);
      return;
    }

    setDisabled(false);
    setArray([...array, num]);
    setTotal(total + num);
    setNumber("");
  };

  return (
    <>
      <div className="box4">
        <ul>
          {array.map((item, index) => (
            <li key={index}>{item}</li>
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

export default Assignment_3;
