import axios from "axios";
import {useState} from "react";

function Assignment_11(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

  const login = () => {
    axios.post("https://auth.dnjs.lk/api/login", {
        email: email,
        password: password
    }).then((response) => {
        console.log(response.data);
        setMsg("Login Successful");

        axios
        .get("https://auth.dnjs.lk/api/user", {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          console.log("Request completed");
        });
    }).catch((error) => {
        setMsg(error.message);
    });

  }


  
return(
    <>
    <div className="login-box">
        <h1>Login</h1>
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button onClick={login}>Login</button>

        {msg && (
                <h3>{msg}</h3>  
        )}
    </div>
    </>
)
}

export default Assignment_11;