import axios from "axios";
import { useState, useEffect ,useRef} from "react";

//helpers
const baseURL = import.meta.env.VITE_API_BASE_URL;
const instance1 = axios.create({
  baseURL: baseURL,
});

//code is using an axios request interceptor to automatically
//attach an authentication token to every HTTP request

//=============== Note===============
//An interceptor runs before every request is sent to the server
instance1.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token_15") || sessionStorage.getItem("token_15");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

function LogginScreen({
  email,
  setEmail,
  password,
  setPassword,
  setKeepLoggedIn,
  disabled,
  msg,
  login,
}) {
  return (
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
  );
}

function ProfileScreen({ userData, setUserData, logout, editUser , updateUserProfile, activation,fileInputRef,activation1}) {
  return (
    <div className="container2">
      <h1>{userData.name}</h1>
      <img src={userData.avatar} />
      <pre>{JSON.stringify(userData, null, 1)}</pre>
      <div className="edit">
        <input
          disabled={activation}
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        ></input>
        <input
          disabled={activation}
          value={userData.description}
          onChange={(e) =>
            setUserData({ ...userData, description: e.target.value })
          }
        ></input>
        <button onClick={() => editUser(userData.name, userData.description)} disabled={activation}>
          Edit User Data
        </button>
      </div>
      <div className="edit">
            <h3>Edit Profile Picture</h3>
            <input type="file" ref={fileInputRef} disabled={activation1} accept="images/*"></input>
            <button disabled={activation1}
              onClick={updateUserProfile}
            >
              Save
            </button>
          </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Assignment_15() {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activation1, setActivation1] = useState(false);
  const [activation, setActivation] = useState(false);

  const fileInputRef = useRef();

  const fetchUserData = async () => {
    try {
      const resp = await instance1.get("/user");
      setUserData(resp.data);
      setMsg("");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setDisabled(true);
    try {
      const resp = await instance1.post("/login", { email, password });
      if (keepLoggedIn) {
        localStorage.setItem("token_15", resp.data.access_token);
      } else {
        sessionStorage.setItem("token_15", resp.data.access_token);
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
      await instance1.post("/logout");
      localStorage.removeItem("token_15");
      sessionStorage.removeItem("token_15");
      setUserData(null);
      setMsg("");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }
    setDisabled(false);
  };

  const editUser = async (name, description) => {
    setActivation(true);
    try {
      const resp = await instance1.put("/user", { name, description });
      setUserData(resp.data);
      setMsg("Profile updated successfully");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }
    setActivation(false);
  };

  const updateUserProfile = async () => {

    setActivation1(true);
    const file = fileInputRef.current.files[0];
    if (!file) {
      setMsg("Please select a file");
      setActivation(false);
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const resp = await instance1.post("/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserData({...userData,...resp.data});
      setMsg("Profile picture updated successfully");
    } catch (err) {
      setMsg(err?.response?.data?.error?.message ?? "Error occurred");
    }
    setActivation1(false);
  }

  useEffect(() => {
    const token =
      localStorage.getItem("token_15") || sessionStorage.getItem("token_15");
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : userData ? (
        <ProfileScreen
          userData={userData}
          setUserData={setUserData}
          logout={logout}
          editUser={editUser}
          editUserData={editUser}
          updateUserProfile={updateUserProfile} 
          activation1= {activation1}
          setActivation1={setActivation1}
          activation={activation}
          setActivation={setActivation}
          fileInputRef={fileInputRef}
        />
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

export default Assignment_15;
