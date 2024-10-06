import { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import Header from "../components/Header";

import axios from "axios";
import "./PostPage.css";

export default function PostPage() {
  const navigate=useNavigate()
  const [postInfo, setPostInfo] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/profile", {
          withCredentials: true,
        });
        const postResponse = await axios.get(`/post/${id}`);

        setPostInfo(postResponse.data);
        setUsername(userResponse.data);

        setFlag(userResponse.data.id === postResponse.data[0].id);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete=async()=>{
    try {
      await axios.delete(`/delete/${id}` ,{
        withCredentials: true,
      })
      navigate('/')


      
    } catch (err) {
      console.log(err);
    }
  }
  const handleCommentSubmit = async () => {
    try {
      await axios.post(`/comment`, {
        comment: newComment,
        post_id: id,
      });
      setNewComment("");
      const { data } = await axios.get(`/post/${id}`);
      setPostInfo(data);
    } catch (err) {
      console.log(err);
    }
  };







  if (!postInfo[0] && !username) {
    return <div>Loading...{console.log(postInfo)}</div>;
  }
  function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  return (
    <div className="container">
      <Header />

      <div className="post-page">
        <h1>{postInfo[0].title}</h1>
        <div className="edit">
          <div className="username">--written by <strong>{capitalizeFirstLetter(postInfo[0].user_name)}</strong></div>
          {flag ? (
           <div style={{ marginRight: '10px' }}>
              <Link to={`/edit/${id}`} className="buttonstyle">
              Edit Post
            </Link>
            <Link onClick ={handleDelete} className="buttonstyle">
              Delete Post
            </Link>
            </div>
            
          ) : (
            <></>
          )}
        </div>
        <div className="image">
          <img src={`http://localhost:5000/${postInfo[0].cover}`} alt="" />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo[0].content }}
        />
        
      </div>
      <div className="user-info">
        <textarea
          id="comment-box"
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleCommentSubmit}>
          Post Comment
        </button>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {postInfo
          .filter((post) => post.comment)
          .reverse()
          .map((post, index) => (
            <div key={index} className="comment">
              <p>{`"${post.comment}"`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
