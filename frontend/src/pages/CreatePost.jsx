import Editor from "../components/editor";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/profile", {
          withCredentials: true,
        });

        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  async function createNewPost(ev) {
    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("id", user.id);
    ev.preventDefault();
    console.log(data);

    try {
      const { info } = await axios.post("/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(info);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="forms-container">
      <form className="post-form">
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button
          onClick={createNewPost}
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
