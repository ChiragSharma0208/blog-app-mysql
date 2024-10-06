import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ post_id, title, summary, cover, id }) {
  console.log(cover);
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${post_id}`}>
          <img src={"http://localhost:5000/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${post_id}`}>
          <h2 className="heading">{title}</h2>
        </Link>

        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
