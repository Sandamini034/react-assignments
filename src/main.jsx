import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Home from "./assignments/home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ASG-01" element={<Assignment_1 />}></Route>
        <Route path="/ASG-02" element={<Assignment_2 />}></Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
