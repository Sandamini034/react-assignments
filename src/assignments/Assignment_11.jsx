import axios from "axios";
import { useState } from "react";
import "./Assignment_11.css";

function Assignment_11() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);

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
        setLoggedIn(true);
        setDisabled(false);

        axios
          .get("https://auth.dnjs.lk/api/user", {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setUserData(response.data);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            console.log("Request completed");
          });
      })
      .catch((error) => {
        setMsg(error?.response?.data?.error?.message ?? "An error occurred");
        setDisabled(false);
      });
  };

  return (
    <>
      {loggedIn ? (
        <div className="container2">
          {userData ? (
            <>
              <h1>{userData.name}</h1>
              <img src={userData.avatar}></img>
              <pre>{JSON.stringify(userData, null, 1)}</pre>
            </>
          ) : (
            <p>Loading user data...</p>
          )}{" "}
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Assignment_11;
