import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/profile", {
          withCredentials: true,
        });
        setUsername(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const logout = async () => {
    try {
      await axios.post("/logout", {
        withCredentials: true,
      });
      setUsername(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <header className="header">
      <ul className="nav">
        <li>
          <Link to="/" className="logo">
            LOGO
          </Link>
        </li>
      </ul>
      {username ? (
        <ul className="nav">
          <li>
            <Link to="/create" className="button">
              Create Post
            </Link>
          </li>
          <li>
            <Link onClick={logout} className="button">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li>
            <Link to="/login" className="button">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="button">
              Signup
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
