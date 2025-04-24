import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/post";
import "./index.css";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { createPortal } from "react-dom";

export default function PostDetail() {
  const localFav = localStorage.getItem("favList") || [];
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isFav, setIsFav] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  const handleAddFavList = () => {
    // setIsFav((prev) => prev.forEach(v => v.id === id j))
    localStorage.setItem("favList", JSON.stringify(isFav));
  };

  if (!post) return <div className="PostDetailContainer">....Loading</div>;
  return (
    <div className="detailWrap">
      <h2>
        <span>{isFav ? <IoMdStar /> : <IoIosStarOutline />}</span>
        Post ID : {post.id}
      </h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => setShowModal(true)}>즐겨찾기</button>
      {showModal &&
        createPortal(
          <div className="modalBack">
            <div className="modalContent">
              <h3>즐겨찾기 목록</h3>
              <ul>
                <li>목록이 없습니다.</li>
              </ul>
              <button onClick={handleAddFavList}>추가</button>
              <button onClick={() => setShowModal(false)}>닫기</button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
