import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요해요. 로그인 후에 이용해주세요 🥲");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white border-b-1 border-slate-200 text-slate-800 font-medium text-sm">
        <Link to="/">TodoList</Link>
        <div className="flex space-x-4">
          <Link to="/todo">목록</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
