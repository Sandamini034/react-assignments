import axios from "axios";
import { useState, useEffect } from "react";

 //helpers
 const baseURL = import.meta.env.VITE_API_BASE_URL;
 const instance = axios.create({
   baseURL: baseURL,
 });

 //code is using an axios request interceptor to automatically
 //attach an authentication token to every HTTP request

 //=============== Note===============
 //An interceptor runs before every request is sent to the server
 instance.interceptors.request.use((config) => {
   const token = localStorage.getItem("token_13") || sessionStorage.getItem("token_13");
   if (token) {
     config.headers.Authorization = token;
   }
   return config;
 });

function LogginScreen({email, setEmail, password, setPassword, setKeepLoggedIn, disabled, msg, login}) {
  return(
    <div className="login-box">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disabled}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disabled}
      />
      <button onClick={login} disabled={disabled}>
        Login
      </button>
      <div className="login">
        <input
          type="checkbox"
          onChange={(e) => setKeepLoggedIn(e.target.checked)}
        />
        <label>Keep me logged in</label>
      </div>
      {msg && <h3>{msg}</h3>}
    </div>
  ) 
}

function ProfileScreen({userData, logout}) {
  return(
    <div className="container2">
      <h1>{userData.name}</h1>
      <img src={userData.avatar} />
      <pre>{JSON.stringify(userData, null, 1)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

function Assignment_13() {

  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const resp = await instance.get("/user");
      setUserData(resp.data);
      setMsg("");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }finally{
      setLoading(false);
    }
  };

  const login = async () => {
    setDisabled(true);
    try {
      const resp = await instance.post("/login", { email, password });
      if (keepLoggedIn) {
        localStorage.setItem("token_13", resp.data.access_token);
      } else {
        sessionStorage.setItem("token_13", resp.data.access_token);
      }
      setMsg("");
      await fetchUserData();
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }
    setDisabled(false);
  };

  const logout = async () => {
    setDisabled(true);
    try {
      await instance.post("/logout");
      localStorage.removeItem("token_13");
      sessionStorage.removeItem("token_13");
      setUserData(null);
      setMsg("");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }
    setDisabled(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token_13") || sessionStorage.getItem("token_13");
    if (token) {
      fetchUserData();
    }else{
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : userData ? (
        <ProfileScreen userData={userData} logout={logout} />
      ) : (
        <LogginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setKeepLoggedIn={setKeepLoggedIn}
          disabled={disabled}
          msg={msg}
          login={login}
        />
      )}
      
    </div>
  );
}

export default Assignment_13;