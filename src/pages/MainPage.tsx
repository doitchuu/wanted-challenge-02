import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <h1>To do List</h1>
      <p>할 일을 등록하고, 관리해보세요.</p>
      <button>
        <Link to="/login">시작하기</Link>
      </button>
    </div>
  );
}

export default MainPage;
