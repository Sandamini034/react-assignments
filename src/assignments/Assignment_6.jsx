import "./Assignment_6.css"
import { useState } from "react"

function Assignment_6(){
    const[style,setStyle]=useState([]);
    const[ruleName,setRuleName]=useState("");
    const[ruleValue,setRuleValue]=useState("");

    const add=()=>{
        if(!ruleName || !ruleValue){
            alert("Please enter both rule name and rule value!");
            return;
        }
        setStyle([...style,{ruleName,ruleValue}]);
        setRuleName("");
        setRuleValue("");
    }

    const del=(index)=>{
        const newStyle = style.filter((_,i)=>i!==index);
        setStyle(newStyle);
    }

    return(
        <>
        <br></br>
        <div className="box4">
        <h2>Style</h2>
            <div className="inputBox">
            <input type="text" placeholder="rule name" value={ruleName} 
            onChange={(e)=>setRuleName(e.target.value)}></input>
            <input type="text" placeholder="rule value" value={ruleValue}
            onChange ={(e)=>setRuleValue(e.target.value)}></input>
            </div>
            <button onClick={()=>add()}>Add</button>
            <br></br>
            {style.map((item,index)=>(
                <li key={index}>
                    {item.ruleName} : "{item.ruleValue}" 
                    <button onClick={()=>del(index)}>Delete</button>
                </li>
            ))}
            <br></br>
            <div style={style.reduce((obj,item)=>({
                ...obj,
                [item.ruleName]:item.ruleValue
            }),{})}>
                This text is styled.
            </div>

        </div>
        </>
    )
}

export default Assignment_6