import "./Assignment_29.css";
import { useState, useEffect } from "react";

function Assignment_29() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleToggle = (e) => {
    const dark = e.target.checked;
    setIsDark(dark);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="Mode">
        <h1>{isDark ? "Dark mode" : "Light mode"}</h1>
        <input
          type="checkbox"
          className="toggle-switch"
          checked={isDark}
          onChange={handleToggle}
        />
      </div>

      <div className="contentBody">
        <input type="search" placeholder="Search..." />
        <img id="searchIcon" />

        <div className="contentBox">
          {Array(2)
            .fill(2)
            .map((_, i) => (
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
            ))}
        </div>
        <div className="graph">
          {Array(9)
            .fill(9)
            .map((_, i) => (
              <div key={i} className="graphColumn">
                <div id={`column${i}`} className="columnFill" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Assignment_29;
