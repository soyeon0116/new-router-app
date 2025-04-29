import { useEffect, useRef, useState } from "react";
import { delPost, getAllPosts } from "../../apis/post";
import "./index.css";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";

const init = () => {
  return JSON.parse(localStorage.getItem("favList")) || [];
};
export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isFav, setIsFav] = useState(false);
  const [localFav, setLocalFav] = useState(init);

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllPosts();
        setPosts(res);
        setVisiblePosts(res.slice(0, 15));
        setHasMore(res.length > 10);
      } catch (err) {
        console.log("fail ", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const target = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          const nextPosts = posts.slice(
            visiblePosts.length,
            visiblePosts.length + 15
          );
          setVisiblePosts((prev) => [...prev, ...nextPosts]);
          setHasMore(posts.length > visiblePosts.length + 15);
        }
      },
      { threshold: 1 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [visiblePosts, posts, hasMore, isLoading]);

  const handleDel = async () => {
    setIsDeleting(true);
    try {
      await delPost(showModal);
      setPosts((prev) => prev.filter((v) => v.id !== showModal));
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(null);
      setIsDeleting(false);
    }
  };

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
  };

  return (
    <div className="postListWrap" id="postList">
      <h2>PostList</h2>
      <ul>
        {visiblePosts.map((v) => (
          <li className="post" key={v.id}>
            <Link to={`/posts/${v.id}`}>
              {v.id}. {v.title}
            </Link>
            {isFav ? (
              <span onClick={() => handleDeleteFavList(v.id)}>
                <IoMdStar />
              </span>
            ) : (
              <span onClick={() => handleAddFavList(v)}>
                <IoIosStarOutline />
              </span>
            )}
            <button onClick={() => setShowModal(v.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <div
          ref={loaderRef}
          style={{ height: "30px", marginBottom: "10px" }}
        ></div>
      )}
      {showModal &&
        createPortal(
          <div className="modalBack">
            <div className="modalContent modalListDel">
              <h3>{showModal}번 내용을 지우시겠습니까?</h3>
              <div className="btnWrap">
                <button onClick={handleDel} disabled={isDeleting}>
                  YES
                </button>
                <button
                  onClick={() => setShowModal(null)}
                  disabled={isDeleting}
                >
                  NO
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
