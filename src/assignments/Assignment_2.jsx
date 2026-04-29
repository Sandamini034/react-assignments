import "./Assignment_2.css";
import { useState } from "react";

function Assignment_2() {
  const [selectedOperation, setSelectedOperation] = useState("add");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [output, setOutput] = useState("");
  const isReady = input1 !== "" && input2 !== "" && selectedOperation !== "";

  const handleCalculate = () => {
    if (!isReady) {
      alert("Please enter both numbers");
      return;
    }

    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);

    let result;

    switch (selectedOperation) {
      case "add":
        result = num1 + num2;
        break;
      case "sub":
        result = num1 - num2;
        break;
      case "mul":
        result = num1 * num2;
        break;
      case "div":
        if (num2 === 0) {
          alert("Cannot divide by zero");
          return;
        }
        result = num1 / num2;
        break;
      default:
        result = "Invalid operation";
    }
    setOutput(result);
  };
  return (
    <>
      <div className="container2">
        <h1>Simple Calculator</h1>
        <input
          value={input1}
          type="number"
          onChange={(e) => setInput1(e.target.value)}
        ></input>
        <input
          value={input2}
          type="number"
          onChange={(e) => setInput2(e.target.value)}
        ></input>

        <select onChange={(e) => setSelectedOperation(e.target.value)}>
          <option value="add">addition</option>
          <option value="sub">subtraction</option>
          <option value="mul">multiplication</option>
          <option value="div">division</option>
        </select>
        {!isReady && <p>Please enter both numbers to enable calculation</p>}
        {isReady && <button onClick={handleCalculate}>Calculate</button>}
        <label>{output}</label>
      </div>
    </>
  );
}

export default Assignment_2;
