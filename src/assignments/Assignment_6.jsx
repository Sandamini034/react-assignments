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
    return(
        <>
        <div className="box4">
            <input type="text" placeholder="rule name" value={ruleName} 
            onChange={(e)=>setRuleName(e.target.value)}
            ></input>
            <input type="text" placeholder="rule value" value={ruleValue}
            onChange ={(e)=>setRuleValue(e.target.value)}
            ></input>
            <button onClick={()=>add()}>Add</button>
            {style.map((item,index)=>(
                <li key={index}>
                    {item.ruleName} : {item.ruleValue}
                </li>
            ))}
        </div>
        </>
    )
}

export default Assignment_6