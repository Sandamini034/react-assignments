import axios from "axios";
import { useEffect, useState } from "react";

// helpers 

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// API requests 
const requestLogin = async (email, password, keepLoggedIn) => {
  try {
    const resp = await axios.post(baseURL + "/login", { email, password });
    if (keepLoggedIn) {
      localStorage.setItem("token", resp.data.access_token);
    } else {
      sessionStorage.setItem("token", resp.data.access_token);
    }
    return null;
  } catch (err) {
    return err?.response?.data?.error?.message ?? "Error occurred";
  }
};

const requestDetails = async () => {
  try {
    const resp = await axios.get(baseURL + "/user", {
      headers: { Authorization: getToken() },
    });
    return { data: resp.data, error: null };
  } catch (err) {
    return { data: null, error: err?.response?.data?.error?.message ?? "Error occurred" };
  }
};

const requestLogout = async () => {
  try {
    await axios.post(baseURL + "/logout", null, {
      headers: { Authorization: getToken() },
    });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    return null;
  } catch (err) {
    return err?.response?.data?.error?.message ?? "Error occurred";
  }
};

function LoginScreen({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    setDisabled(true);
    const error = await requestLogin(email, password, keepLoggedIn);
    error ? setMsg(error) : setLogged(true);
    setDisabled(false);
  };

  return (
    <div className="login-box">
      <h3>Login</h3>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} />
      <div className="login">
        <input type="checkbox" onChange={(e) => setKeepLoggedIn(e.target.checked)} />
        <label>Keep me logged in</label>
      </div>
      <button onClick={handleLogin} disabled={disabled}>Login</button>
      {msg && <h3>{msg}</h3>}
    </div>
  );
}

function ProfileScreen({ setLogged }) {
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState("");

  const loadDetails = async () => {
    const { data, error } = await requestDetails();
    error ? setMsg(error) : setUserData(data);
  };

  const handleLogout = async () => {
    const error = await requestLogout();
    error ? setMsg(error) : setLogged(false);
  };

  useEffect(() => { loadDetails() }, []);

  if (!userData) return "Loading...";

  return (
    <div className="container2">
      <h1>{userData.name}</h1>
      <img src={userData.avatar} alt="avatar" />
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {msg && <h3>{msg}</h3>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default function Assignment_13() {
  const [logged, setLogged] = useState(null);
  useEffect(() => { setLogged(getToken() !== null) }, []);
  if (logged === true) return <ProfileScreen setLogged={setLogged} />;
  if (logged === false) return <LoginScreen setLogged={setLogged} />
}