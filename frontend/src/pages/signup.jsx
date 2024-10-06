import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import toast from "react-hot-toast";
import "./signup.css";
export default function Signup() {
  const [data, setData] = useState({
    user: "",
    email: "",
    dob: null,
    password: "",
  });

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const { user, password, email, dob } = data;
    console.log(data);
    try {
      const { data } = await axios.post("/register", {
        user: user,
        email: email,
        password: password,
        dob: `${dob.$y}-${dob.$M + 1}-${dob.$D}`,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <form className="styled-form" onSubmit={registerUser}>
        <h1> SIGN UP</h1>
        <TextField
          id="filled-basic"
          label="Username"
          margin="normal"
          variant="filled"
          value={data.user}
          placeholder="Enter Name"
          onChange={(e) => {
            setData({ ...data, user: e.target.value });
            console.log(`${data.dob.$D}/${data.dob.$M + 1}/${data.dob.$y}`);
          }}
        />

        <DatePicker
          label="Date of birth"
          type="date"
          value={data.dob}
          onChange={(e) => setData({ ...data, dob: e })}
          sx={{
            ".MuiButtonBase-root": {
              display: "contents",
            },
          }}
        />

        <TextField
          id="filled-basic"
          label="E-mail"
          margin="normal"
          variant="filled"
          value={data.email}
          placeholder="Enter E-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          id="filled-basic"
          label="Password"
          margin="normal"
          variant="filled"
          type="password"
          value={data.password}
          placeholder="Enter Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}
