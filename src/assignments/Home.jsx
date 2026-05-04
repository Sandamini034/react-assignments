import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="home">
        <nav className="box4">
        <h1>React Assignments</h1>
        <Link to="/ASG-01" >Assignment-01</Link>
        <Link to="/ASG-02" >Assignment-02</Link>
        <Link to="/ASG-03" >Assignment-03</Link>
        <Link to="/ASG-04" >Assignment-04</Link>
        <Link to="/ASG-05" >Assignment-05</Link>
        <Link to="/ASG-06" >Assignment-06</Link>
        <Link to="/ASG-07" >Assignment-07</Link>
        <Link to="/ASG-08" >Assignment-08</Link>
        <Link to="/ASG-09" >Assignment-09</Link>
        </nav>
        </div>
    )
}

export default Home