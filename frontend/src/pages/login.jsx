import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";

import toast from "react-hot-toast";
import "./login.css";

export default function Login() {
  const [data, setData] = useState({
    user: "",

    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const { user, password } = data;
    try {
      const { data } = await axios.post("/login", {
        user: user,

        password: password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form className="styled-form" onSubmit={loginUser}>
        <h1>LOGIN</h1>
        <TextField
          id="filled-basic"
          label="Username"
          margin="normal"
          variant="filled"
          value={data.user}
          placeholder="Enter username"
          onChange={(e) => setData({ ...data, user: e.target.value })}
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
