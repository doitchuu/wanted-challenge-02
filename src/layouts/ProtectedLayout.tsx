import { useContext, useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedLayout() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요해요. 로그인 후에 이용해주세요 🥲");
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <header>
        <Link to="/">Logo</Link>
        <Link to="/todo">Todo</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
