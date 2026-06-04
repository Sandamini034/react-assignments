import { useSelector, useDispatch } from "react-redux";
import "./Assignment_34.css";
import { setForm, resetForm } from "./store";
import { Button, Input, InputAdornment, TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Butterfly from "../Butterfly.jsx";
import { useEffect, useState } from "react";
import backgroundImage from "./quiz.png";

function Assignment_34() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [statesReady, setStatesReady] = useState(false);

  const dispatch = useDispatch();

  const name = useSelector((states) => states.common.name);
  const email = useSelector((states) => states.common.email);
  const age = useSelector((states) => states.common.age);

  useEffect(() => {
    if (name !== undefined && email !== undefined && age !== undefined) {
      setStatesReady(true);
    }
  }, [name, email, age]);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(true); 
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setForm({ name, value }));
  };

  const isLoading = !bgLoaded || !statesReady;

  if (isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Butterfly />
      </Box>
    );
  }

  return (
    <Box
      className="bg"
      style={{ backgroundImage: `url(${backgroundImage})` }} 
    >
      <div className="redux-form-container">
        <div className="header">
        <Butterfly />
        <h2>Redux Form </h2>
        </div>
        <form>
          <Input
            className="input-field"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            onChange={handleChange}
          />
          <Input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            startAdornment={
              <InputAdornment position="start">
                <AttachEmailIcon />
              </InputAdornment>
            }
            onChange={handleChange}
          />
          <TextField
            className="input-field"
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            size="small"
            label="Age"
            variant="standard"
            color="secondary"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SentimentSatisfiedAltIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 1, max: 100 },
              },
            }}
            onChange={handleChange}
          />
          <Button
            id="inputButton"
            startIcon={<RestartAltIcon />}
            size="small"
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => dispatch(resetForm())}
          >
            Reset
          </Button>
        </form>

        <Box className="reduxBox">
          <Typography className="typography">Name: {name}</Typography>
          <Typography className="typography">Email: {email}</Typography>
          <Typography className="typography">Age: {age}</Typography>
        </Box>
      </div>
    </Box>
  );
}

export default Assignment_34;