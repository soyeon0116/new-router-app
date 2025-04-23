import { useEffect, useRef, useState } from "react";
import { delPost, getAllPosts } from "../../apis/post";
import "./index.css";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const postsPerPage = 15;
  const loaderRef = useRef();

  useEffect(() => {
    const start = (curPage - 1) * postsPerPage;
    const end = curPage * postsPerPage;

    getAllPosts().then((res) => setPosts(res.slice(start, end)));
    setCurPage(curPage + 1);
    // setObserver();
    // getAllPosts().then((res) => setPosts(res));
  }, []);

  useEffect(() => {
    const target = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(entry.target);
          if (curPage <= Math.ceil(posts.lenght / postsPerPage)) {
            setPosts();
          }
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
  }, [posts, curPage]);
  // const setObserver = () => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };

  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         observer.unobserve(entry.target);
  //         if (curPage <= Math.ceil(posts.lenght / postsPerPage)) {
  //           setPosts();
  //         }
  //       }
  //     });
  //   }, options);

  //   const lastPost = document.querySelector(".post:last-child");
  //   if (lastPost) {
  //     observer.observe(lastPost);
  //   }
  // };

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

  return (
    <div className="postListWrap" id="postList">
      <h2>PostList</h2>
      <ul>
        {posts.map((v) => (
          <li className="post">
            <Link to={`/posts/${v.id}`}>
              {v.id}. {v.title}
            </Link>
            <button onClick={() => setShowModal(v.id)}>Delete</button>
          </li>
        ))}
      </ul>
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
