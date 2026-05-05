import axios from "axios";
import { useState, useEffect } from "react";

function Assignment_13() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

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

        axios
          .get("https://auth.dnjs.lk/api/user", {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            const fetchedUserData = response.data;
            setUserData(fetchedUserData);

            if (keepLoggedIn) {
              localStorage.setItem("userData", JSON.stringify(fetchedUserData));
            } else {
              sessionStorage.setItem(
                "userData",
                JSON.stringify(fetchedUserData)
              );
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
    const storedUserData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const logout = () => {
    axios.post("https://auth.dnjs.lk/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${userData.access_token}`,
      },
    })
    setUserData(null);
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
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

export default Assignment_13;
