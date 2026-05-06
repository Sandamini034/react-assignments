import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Assignment_15() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [activation, setActivation]= useState(false);
  const fileInputRef = useRef(null);

  const login = () => {
    setDisabled(true);
    axios
      .post("https://auth.dnjs.lk/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const newToken = response.data.access_token;
        setToken(newToken);
        console.log(response.data);
        setMsg("Login Successful");
        setDisabled(false);

        axios
          .get("https://auth.dnjs.lk/api/user", {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            const fetchedUserData = response.data;
            setUserData(fetchedUserData);

            if (keepLoggedIn) {
              localStorage.setItem("accessToken", newToken);
            } else {
              sessionStorage.setItem("accessToken", newToken);
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

  const logout = () => {
    axios.post(
      "https://auth.dnjs.lk/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserData(null);
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    setEmail("");
    setPassword("");
    setMsg("");
  };

  const updateUserData = () => {
    axios
      .put(
        "https://auth.dnjs.lk/api/user",
        {
          name: userData.name,
          description: userData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedToken = response.data.access_token;
        const storage = localStorage.getItem("accessToken")
          ? localStorage
          : sessionStorage;
        storage.setItem("accessToken", updatedToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUserProfile = () => {
    const file = fileInputRef.current?.files[0];

    if(!file){
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    setActivation(true);

    axios
      .post(
        "https://auth.dnjs.lk/api/avatar",formData,
        {
          headers: {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setActivation(false);
        const updatedToken = response.data.access_token;
        const storage = localStorage.getItem("accessToken")
          ? localStorage
          : sessionStorage;
        storage.setItem("accessToken", updatedToken);
        setUserData((prev)=>({...prev,avatar:response.data.avatar}))
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (storedToken) {
      axios
        .get("https://auth.dnjs.lk/api/user", {
          headers: { Authorization: `Bearer ${storedToken}` },
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

  return (
    <>
      {userData ? (
        <div className="box">
        <div className="container2">
          <h1>{userData.name}</h1>
          <img src={userData.avatar}></img>
          <pre>
            {JSON.stringify(
              userData,
              ["id", "email", "subscribed", "description"],
              1
            )}
          </pre>
          <div className="edit">
            <h3>Edit User Data</h3>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            ></input>
            <input
              type="text"
              value={userData.description}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
            ></input>
            <button
              onClick={() => {
                updateUserData();
              }}
            >
              Save
            </button>
          </div>
          <div className="edit">
            <h3>Edit Profile Picture</h3>
            <input type="file" ref={fileInputRef} disabled={activation}></input>
            <button disabled={activation}
              onClick={() => {
                updateUserProfile();
              }}
            >
              Save
            </button>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
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

export default Assignment_15;
