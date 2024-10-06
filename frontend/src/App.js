import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Homepage from "./pages/homepage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/PostPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Headers "] = "*";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/edit/:id" element={<EditPost />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
