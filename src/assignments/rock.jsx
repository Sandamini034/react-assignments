import Toph from '../assets/toph.png';
import Rock from '../assets/rock.png';
import "./Assignment_24.css"

function rock(){
    return(
        <div className="rock">
            <img src={Toph} />
            {Array.from({ length: 10 }, (_, i) => (
    <div>
        <img src={Rock} className="ball" key={i}
    style={{
        position: "absolute",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 10}px`,
        animation: `move ${Math.random() * 5 + 1}s infinite`,
    }}
    ></img>
    </div>

     ))}
        </div>
    )
}

export default rock;