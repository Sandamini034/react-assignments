import axios from "axios";
import { useState, useEffect } from "react";

function Assignment_12() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

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
        const loginToken = response.data.access_token;

        axios
          .get("https://auth.dnjs.lk/api/user", {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            const fetchedUserData = response.data;
            setUserData(fetchedUserData);
            setToken(loginToken);

            if (keepLoggedIn) {
              localStorage.setItem("accessToken", token);
            } else {
              sessionStorage.setItem("accessToken", token);
            }
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

  useEffect(() => {
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (storedToken) {
      axios
        .get("https://auth.dnjs.lk/api/user", {
          header: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUserData(response.data);
          setToken(storedToken);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");
        });
    }
  }, []);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    setEmail("");
    setPassword("");
    setMsg("");
  };

  return (
    <>
      {userData ? (
        <div className="container2">
          <h1>{userData.name}</h1>
          <img src={userData.avatar}></img>
          <pre>{JSON.stringify(userData, null, 1)}</pre>
          <button onClick={logout}>Logout</button>
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

          <div className="login">
            <input
              type="checkbox"
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            ></input>
            <label>Keep me logged in</label>
          </div>
          {msg && <h3>{msg}</h3>}
        </div>
      )}
    </>
  );
}

export default Assignment_12;
