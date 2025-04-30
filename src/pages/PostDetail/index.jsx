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
  const [showModal, setShowModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [localFav, setLocalFav] = useState(init);
  const [addBtn, setAddBtn] = useState(false);

  useEffect(() => {
    if (addBtn) setShowModal(true);
    else setShowModal(false);
    getPostById(id).then((res) => setPost(res));
    for (let i = 0; i < localFav.length; i++) {
      if (localFav[i].id == id) {
        setIsFav(true);
        return;
      }
    }
  }, [id, localFav]);

  const handleDeleteFavList = (targetId) => {
    setIsFav(false);
    let newList = localFav.filter((v) => v.id !== targetId);
    localStorage.setItem("favList", JSON.stringify(newList));
    setLocalFav(newList);
  };

  const handleAddFavList = (data) => {
    localStorage.setItem("favList", JSON.stringify([...localFav, data]));
    setLocalFav([...localFav, data]);
    setIsFav(true);
    event.target.tagName === "BUTTON" ? setAddBtn(true) : setAddBtn(false);
  };

  if (!post) return <div className="PostDetailContainer">....Loading</div>;
  return (
    <div className="detailWrap">
      <h2>
        {isFav ? (
          <span onClick={() => handleDeleteFavList(post.id)}>
            <IoMdStar />
          </span>
        ) : (
          <span onClick={() => handleAddFavList(post)}>
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
                    <Link to={`/posts/${list.id}`}>
                      <li key={list.id}>
                        {list.id}. {list.title}
                      </li>
                    </Link>
                  ))
                )}
              </ul>
              <button onClick={() => handleAddFavList(post)} disabled={isFav}>
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
