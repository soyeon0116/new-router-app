import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../apis/post";
import "./index.css";
import { createPortal } from "react-dom";

export default function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  let latestId = localStorage.getItem("latestId") || "";

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};
    data.title = title;
    data.body = body;
    await updatePost(id, data).then((res) => setPost(res));
    setShowModal(false);
    localStorage.setItem("latestId", id);
    navigate(`/posts/${id}`);
  };

  if (!post) return <div className="PostDetailContainer">....Loading</div>;

  return (
    <div className="editDiv">
      <h2>Edit Post ID : {id}</h2>
      <p>마지막 수정한 ID : {latestId}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="body"
          value={post.body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit" onClick={() => setShowModal(true)}>
          Submit
        </button>
      </form>
      {showModal &&
        createPortal(
          <div className="modalBack">
            <div className="modalContent">
              <h1>수정중입니다..</h1>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
