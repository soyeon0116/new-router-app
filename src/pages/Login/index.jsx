import "./index.css";
export default function Login({ setShowModal, onLogIn }) {
  const submitFn = (e) => {
    e.preventDefault();
    let formData = new FormData(logIn);
    let obj = {};
    for (let [key, value] of formData) {
      obj[key] = value;
    }
    onLogIn(obj);
  };
  return (
    <div className="modalBack">
      <form className="loginModal" id="logIn" onSubmit={submitFn}>
        <h2>로그인</h2>
        <input name="ID" type="text" placeholder="ID" />
        <input name="PW" type="password" placeholder="PW" />
        <div className="btnWrap">
          <button type="submit">로그인</button>
          <button onClick={() => setShowModal(false)}>취소</button>
        </div>
      </form>
    </div>
  );
}
