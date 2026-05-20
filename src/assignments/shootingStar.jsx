import Katara from "../assets/katara3.png"

function shootingStar(){
    return(
        <div className="shooting-stars">
         <img src={Katara}
         style={{
           fliter:"invert(0)",
         }}/>
        {Array.from({ length: 200 }, (_, i) => (
    <div>
        <span id="head" key={i}
    style={{
        position: "absolute",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 10}px`,
        animation: `fly ${Math.random() * 5 + 1}s infinite`,
    }}
    >💧</span>
    </div>

     ))}
    </div>
    )
}

export default shootingStar;