import "./Assignment_29.css";
import { useState, useEffect } from "react";

function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
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
    <div className="Mode">
      <h1>{isDark ? "Dark mode" : "Light mode"}</h1>
      <input
        type="checkbox"
        className="toggle-switch"
        checked={isDark}
        onChange={handleToggle}
      />
    </div>
  );
}

export default Assignment_29;
