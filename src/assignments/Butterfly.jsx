import "./Assignment_26.css";
import "./Assignment_19.css";

function Butterfly({ hovered }) {
  return (
   <div style={{display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:"-6vw",
   }}>
     <div className="watchOwl">
      <div
        className="bubble1"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball1">
          <div className="pupil1"></div>
        </div>
      </div>
      <div
        className="bubble2"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball2">
          <div className="pupil2"></div>
        </div>
      </div>
      <div
        className="bubble3"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball3">
          <div className="pupil3"></div>
        </div>
      </div>
      <div
        className="bubble4"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball4">
          <div className="pupil4"></div>
        </div>
      </div>
    </div>
   </div>
  );
}

export default Butterfly;
