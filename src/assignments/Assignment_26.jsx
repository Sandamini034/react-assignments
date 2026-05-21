import "./Assignment_26.css";
import Butterfly from "./Butterfly";
import {useState, useEffect} from 'react'

function Assignment_26(){

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 2000)
    }, [])

    if(loading){
        return(
            <Butterfly hovered={true} />
        )
    }

    return(
        <div className="puzzelDisplay">
            <div className="puzzelBox" style={{backgroundColor:"white"}}></div>
            <input type="range"></input>
            <button>Start Puzzel</button>
        </div>
    )
}

export default Assignment_26;