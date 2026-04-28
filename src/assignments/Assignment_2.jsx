import "./Assignment_2.css"
import {useState} from "react"

function Assignment_2(){

    const [selectedOperation, setSelectedOperation] = useState("add");

    const handleCalculate = () => {
        if(selectedOperation === "add") {
            // perform addition
        }
        else if(selectedOperation === "sub") {
            // perform subtraction
        }
        else if(selectedOperation === "mul") {
            // perform multiplication
        }
        else if(selectedOperation === "div") {
            // perform division
        }
    }
    return (
       <>
        <div className="container2">
            <h1>Simple Calculator</h1>
            <input type="number"></input>
            <input type="number"></input>
            <select onChange={(e)=>setSelectedOperation(e.target.value)}>
                <option value="add">addition</option>
                <option value="sub">subtraction</option>
                <option value="mul">multiplication</option>
                <option value="div">division</option>
            </select>
            <button>Calculate</button>
        </div>
       </>
    )
}

export default Assignment_2;