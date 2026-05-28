import "./Assignment_29.css";
import { useState, useEffect } from "react";

function DisplayContent() {
  const divs = [];

  for (let i = 0; i < 2; i++) {
    divs.push(
      <div key={i} className="displayBoxs">
        <div className="insideBox">
          <div className="firstRow">
            <div id={`smallColorBox${i}`}></div>
            <div className="insideRow" />
          </div>
          <div className="secondRow" />
          <div className="thirdRow" />
          <div className="fourthRow" />
        </div>
      </div>
    );
  }

  return <div className="contentBox">{divs}</div>;
}

function DisplayGrap() {
  const columns = [];

  for (let i = 0; i < 9; i++) {
    columns.push(
      <div key={i} className="graphColumn">
        <div id={`column${i}`} className="columnFill" />
      </div>
    );
  }

  return <div className="graph">{columns}</div>;
}

function setTheme(theme) {
  document.body.setAttribute("prefers-color-scheme", theme);
  localStorage.setItem("theme", theme);
}

function Assignment_29() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    setIsDark(savedTheme === "dark");
  }, []);

  function handleToggle(e) {
    const theme = e.target.checked ? "dark" : "light";
    setTheme(theme);
    setIsDark(e.target.checked);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="Mode">
        <h1>{isDark ? "Dark mode" : "Light mode"}</h1>
        <input
          type="checkbox"
          className="toggle-switch"
          checked={isDark}
          onChange={handleToggle}
        />
        <div className="contentBody">
          <input type="search" placeholder="Search..."></input>
          <img id="searchIcon" />
          <DisplayContent />
          <DisplayGrap />
        </div>
      </div>
    </div>
  );
}

export default Assignment_29;
