import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/post");
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="indexPage">
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </div>
  );
}
