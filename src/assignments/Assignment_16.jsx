import axios from "axios";
import { useEffect, useRef, useState } from "react";

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

const requestUpdateUser = async (name, description) => {
  try {
    const resp = await axios.put(baseURL + "/user", { name, description }, {
      headers: { Authorization: getToken() },
    });
    return { data: resp.data, error: null };
  } catch (err) {
    return { data: null, error: err?.response?.data?.error?.message ?? "Error occurred" };
  }
};

const requestUpdateAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const resp = await axios.post(baseURL + "/avatar", formData, {
      headers: { Authorization: getToken(), "Content-Type": "multipart/form-data" },
    });
    return { data: resp.data, error: null };
  } catch (err) {
    return { data: null, error: err?.response?.data?.error?.message ?? "Error occurred" };
  }
};

const requestUpdatePassword = async (old_password, new_password) => {
  try {
    await axios.put(baseURL + "/password", { old_password, new_password }, {
      headers: { Authorization: getToken() },
    });
    return null;
  } catch (err) {
    return err?.response?.data?.error?.message ?? "Error occurred";
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

const validatePassword = (newPassword, confirmation) => {
  if (newPassword.length < 8 || confirmation.length < 8) return "Password must be at least 8 characters";
  if (newPassword.length > 40) return "Password must not exceed 40 characters";
  if (!newPassword.match(/\d/)) return "Password must contain at least one number";
  if (!newPassword.match(/[a-z]/)) return "Password must contain at least one lowercase letter";
  if (!newPassword.match(/[A-Z]/)) return "Password must contain at least one uppercase letter";
  if (!newPassword.match(/[@#$*\-\/]/)) return "Password must contain at least one special character (@, #, $, *, -, /)";
  if (newPassword !== confirmation) return "Passwords do not match";
  return null;
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
  const [editDisabled, setEditDisabled] = useState(false);
  const [avatarDisabled, setAvatarDisabled] = useState(false);
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const fileInputRef = useRef();

  const loadDetails = async () => {
    const { data, error } = await requestDetails();
    error ? setMsg(error) : setUserData(data);
  };

  const handleEditUser = async () => {
    setEditDisabled(true);
    const { data, error } = await requestUpdateUser(userData.name, userData.description);
    error ? setMsg(error) : (setUserData(data), setMsg("Profile updated successfully"));
    setEditDisabled(false);
  };

  const handleUpdateAvatar = async () => {
    setAvatarDisabled(true);
    const file = fileInputRef.current.files[0];
    if (!file) { setMsg("Please select a file"); setAvatarDisabled(false); return; }
    const { data, error } = await requestUpdateAvatar(file);
    error ? setMsg(error) : (setUserData({ ...userData, ...data }), setMsg("Avatar updated successfully"));
    setAvatarDisabled(false);
  };

  const handleUpdatePassword = async () => {
    setPasswordDisabled(true);
    if (!oldPassword || !newPassword || !confirmation) { setMsg("Please fill in all fields"); setPasswordDisabled(false); return; }
    const validationError = validatePassword(newPassword, confirmation);
    if (validationError) { setMsg(validationError); setPasswordDisabled(false); return; }
    const error = await requestUpdatePassword(oldPassword, newPassword);
    if (error) {
      setMsg(error);
    } else {
      setMsg("Password updated successfully");
      setOldPassword(""); setNewPassword(""); setConfirmation("");
    }
    setPasswordDisabled(false);
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

      <div className="edit">
        <h3>Edit Profile</h3>
        <input value={userData.name} disabled={editDisabled} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        <input value={userData.description} disabled={editDisabled} onChange={(e) => setUserData({ ...userData, description: e.target.value })} />
        <button onClick={handleEditUser} disabled={editDisabled}>Save Changes</button>
      </div>

      <div className="edit">
        <h3>Edit Profile Picture</h3>
        <input type="file" ref={fileInputRef} accept="image/*" disabled={avatarDisabled} />
        <button onClick={handleUpdateAvatar} disabled={avatarDisabled}>Upload Avatar</button>
      </div>

      <div className="edit">
        <h3>Change Password</h3>
        <input type="password" placeholder="Current Password" value={oldPassword} disabled={passwordDisabled} onChange={(e) => setOldPassword(e.target.value)} />
        <input type="password" placeholder="New Password" value={newPassword} disabled={passwordDisabled} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm New Password" value={confirmation} disabled={passwordDisabled} onChange={(e) => setConfirmation(e.target.value)} />
        <button onClick={handleUpdatePassword} disabled={passwordDisabled}>Change Password</button>
      </div>

      {msg && <h3>{msg}</h3>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default function Assignment_16() {
  const [logged, setLogged] = useState(null);
  useEffect(() => { setLogged(getToken() !== null) }, []);
  if (logged === true) return <ProfileScreen setLogged={setLogged} />;
  if (logged === false) return <LoginScreen setLogged={setLogged} />;
}