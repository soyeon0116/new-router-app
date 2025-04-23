import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/post";
import "./index.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  if (!post) return <div className="PostDetailContainer">....Loading</div>;
  return (
    <div className="detailWrap">
      <h2>Post ID : {post.id}</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>
        <button>Edit</button>
      </Link>
      <button>즐겨찾기</button>
    </div>
  );
}
