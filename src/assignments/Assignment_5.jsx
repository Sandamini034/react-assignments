import "./Assignment_5.css"
import {useState} from "react"

function Assignment_5(){
    const [array, setArray] = useState([]);
    const [total, setTotal] = useState(0);
    const [number, setNumber] = useState("");
  
    const average = array.length > 0 ? total / array.length : 0;
    const num = Number(number);
  
    const add = () => {
      if (number === "" || isNaN(num)) {
        alert("Please enter a numeric value!");
        return;
      }
  
      setArray([...array, num]);
      setTotal(total + num);
    };
  
    const del = (index) => {
      const removed = array[index];
      const newArray = array.filter((_, i) => i !== index);
      setArray(newArray);
      setTotal(total - removed);
    };

    const moveUp = (index)=>{
        if(index===0)return;
        let temp;
        const newArray =[...array];
        temp = newArray[index-1];
        newArray[index-1]=newArray[index];
        newArray[index]=temp;
        setArray(newArray);
    }

    const moveDown = (index)=>{
        if(index===array.length-1)return;
        let temp;
        const newArray =[...array];
        temp = newArray[index+1];
        newArray[index+1]=newArray[index];
        newArray[index]=temp;
        setArray(newArray);
    }
  
    return (
      <>
        <div className="box4">
            <div className="buttonBox">
            <button onClick={()=>setArray([...array].sort((a,b)=>a-b))}>Sort Accending</button>
            <button onClick={()=>setArray([...array].sort((a,b)=>b-a))}>Sort Descending</button>
            </div>
          <ul>
            {array.map((item, index) => (
              <li key={index}>
                {item}{" "}
                <div className="btns">
                <button onClick={() => del(index)} key={index}>
                  Delete
                </button>
                <button onClick={() => moveUp(index)} key={index}>
                  Move Up
                </button>
                <button onClick={() => moveDown(index)} key={index}>
                  Move Down
                </button>
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
          <button onClick={add}>Add</button>
        </div>
      </>
    );
}

export default Assignment_5