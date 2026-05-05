import axios from "axios";
import { useState } from "react";
import "./Assignment_10.css";

function Assignment_10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const login = () => {
    setDisabled(true);
    axios
      .post("https://auth.dnjs.lk/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setMsg("Login Successful");
        setDisabled(false);
      })
      .catch((error) => {
        //console.log(error.response.data.error.message);
        setMsg(error?.response?.data?.error?.message ?? "An error occurred");
        setDisabled(false);
      });
  };

  return (
    <>
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={disabled}
        ></input>
        <button onClick={login} disabled={disabled}>
          Login
        </button>

        {msg && <h3>{msg}</h3>}
      </div>
    </>
  );
}

export default Assignment_10;
