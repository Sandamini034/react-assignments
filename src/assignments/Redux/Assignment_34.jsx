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
import backgrounImage from "./quiz.png";

function Assignment_34() {
  const dispatch = useDispatch();

  const name = useSelector((states) => states.common.name);
  const email = useSelector((states) => states.common.email);
  const age = useSelector((states) => states.common.age);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setForm({ name, value }));
  };

  return (
    <Box className="bg">
      <div className="redux-form-container">
        <h2>Redux Form</h2>
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
            onChange={(event) => handleChange(event)}
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
            onChange={(event) => handleChange(event)}
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
            onChange={(event) => handleChange(event)}
          />
          <Button
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

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2px",
            marginLeft: "10px",
            flexWrap: "wrap",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <Typography
            style={{ marginTop: "20px", overflow: "hidden", maxWidth: "45vw" }}
          >
            Name: {name}
          </Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Age:{age}</Typography>
        </Box>
      </div>
    </Box>
  );
}

export default Assignment_34;
