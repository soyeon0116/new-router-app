import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/post";
import "./index.css";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { createPortal } from "react-dom";

const init = () => {
  return JSON.parse(localStorage.getItem("favList")) || [];
};
export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localFav, setLocalFav] = useState(init);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
    for (let i = 0; i < localFav.length; i++) {
      if (localFav[i].id == id) {
        setIsFav(true);
        return;
      }
    }
  }, [id]);

  const handleAddFavList = () => {
    localStorage.setItem("favList", JSON.stringify([post]));
    setLocalFav([post]);
    setIsFav(true);
  };

  const handleDeleteFavList = () => {
    setIsFav(false);
    let newList = localFav.filter((v) => v.id !== post.id);
    localStorage.setItem("favList", JSON.stringify(newList));
    setLocalFav(newList);
  };

  if (!post) return <div className="PostDetailContainer">....Loading</div>;
  return (
    <div className="detailWrap">
      <h2>
        {isFav ? (
          <span onClick={handleDeleteFavList}>
            <IoMdStar />
          </span>
        ) : (
          <span onClick={handleAddFavList}>
            <IoIosStarOutline />
          </span>
        )}
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
              <ul className="favUl">
                {localFav.length === 0 ? (
                  <li>목록이 없습니다.</li>
                ) : (
                  localFav.map((list) => (
                    <li>
                      {list.id}. {list.title}
                    </li>
                  ))
                )}
              </ul>
              <button onClick={handleAddFavList} disabled={isFav}>
                추가
              </button>
              <button onClick={() => setShowModal(false)}>닫기</button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
