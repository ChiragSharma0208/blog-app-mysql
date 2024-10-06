import Editor from "../components/editor";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/post/${id}`);
        console.log("Fetched data:", data);
        setTitle(data[0].title);
        setSummary(data[0].summary);
        setContent(data[0].content);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const updatePost = async (ev) => {
    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    console.log(data);
    try {
      const { info } = await axios.put(`/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(info);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forms-container">
      editpage
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
          onClick={updatePost}
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
