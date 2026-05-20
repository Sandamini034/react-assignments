import "./Assignment_24.css"
import MoonSpirit from "../assets/moon_spirit_yue.jpg"
function Stars(){
    return(
        <div className="stars">
        <img src={MoonSpirit}
        style={{
            width: "500px",
            height:"500px",
            borderRadius: "50%",
            boxShadow: "0 0 50px rgba(255, 255, 255, 0.8)",
        }}></img>
            {Array.from({ length: 100 }, (_, i) => (
        <span key={i}
        style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40}px`,
            animation: `twinkle ${Math.random() * 10 + 1}s infinite`,
            color:"white",
        }}
        >*</span>
         ))}
        </div>
    )
}

function moon(){
    return(
        <div className="moon">
            <Stars />
        </div>
    )
}

export default moon;