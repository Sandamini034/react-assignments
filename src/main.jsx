import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Assignment_3 from "./assignments/Assignment_3.jsx";
import Assignment_4 from "./assignments/Assignment_4.jsx";
import Assignment_5 from "./assignments/Assignment_5.jsx";
import Assignment_6 from "./assignments/Assignment_6.jsx";
import Assignment_7 from "./assignments/Assignment_7.jsx";
import Assignment_8 from "./assignments/Assignment_8.jsx";
import Assignment_9 from "./assignments/Assignment_9.jsx";
import Assignment_10 from "./assignments/Assignment_10.jsx";
import Assignment_11 from "./assignments/Assignment_11.jsx";
import Home from "./assignments/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ASG-01" element={<Assignment_1 />}></Route>
        <Route path="/ASG-02" element={<Assignment_2 />}></Route>
        <Route path="/ASG-03" element={<Assignment_3 />}></Route>
        <Route path="/ASG-04" element={<Assignment_4 />}></Route>
        <Route path="/ASG-05" element={<Assignment_5 />}></Route>
        <Route path="/ASG-06" element={<Assignment_6 />}></Route>
        <Route path="/ASG-07" element={<Assignment_7 />}></Route>
        <Route path="/ASG-08" element={<Assignment_8 />}></Route>
        <Route path="/ASG-09" element={<Assignment_9 />}></Route>
        <Route path="/ASG-10" element={<Assignment_10 />}></Route>
        <Route path="/ASG-11" element={<Assignment_11 />}></Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
