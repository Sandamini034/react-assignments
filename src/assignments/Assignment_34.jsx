import { useSelector, useDispatch } from "react-redux";
import { setName, setEmail, setAge, resetForm } from "./store";
import "./Assignment_34.css";

function Assignment_34() {
  const dispatch = useDispatch();

  const name = useSelector((states) => states.common.name);
  const email = useSelector((states) => states.common.email);
  const age = useSelector((states) => states.common.age);

  return (
    <div className="redux-form-container"
      style={{
        borderRadius: "10px",
        background:
          "linear-gradient(to right, rgba(255,150,0), rgba(150,250,0))",
        width: "300px",
        height: "400px",
        padding: "20px",
      }}
    >
      <h2 style={{ display: "flex", justifyContent: "center" }}>Redux Form</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          backgroundColor: "rgba(50,50,50,0.8)",
          padding: "20px",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => dispatch(setName(event.target.value))}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => dispatch(setEmail(event.target.value))}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => dispatch(setAge(Number(event.target.value)))}
        />
        <button type="button" onClick={() => dispatch(resetForm())}>
          Reset
        </button>
      </form>

      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}

export default Assignment_34;
