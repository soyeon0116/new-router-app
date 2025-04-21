import { createPortal } from "react-dom";
import Login from "../Login";
import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
const TEMP = {
  ID: "admin",
  PW: "admin",
};
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const navicate = useNavigate();

  const handleLogIn = (obj) => {
    if (TEMP["ID"] === obj["ID"] && TEMP["PW"] === obj["PW"]) {
      setShowModal(false);
      navicate("/posts");
    } else {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="homeWrap">
      <h1>Welcome!</h1>
      <button onClick={() => setShowModal(true)}>로그인</button>
      {showModal &&
        createPortal(
          <Login setShowModal={setShowModal} onLogIn={handleLogIn} />,
          document.body
        )}
    </div>
  );
}
