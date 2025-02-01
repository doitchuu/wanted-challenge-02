import { Outlet, Link } from "react-router-dom";

function DefaultLayout() {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white border-b-1 border-slate-200 text-slate-800 font-medium text-sm">
        <Link to="/">TodoList</Link>
        <div className="flex space-x-4">
          <Link to="/login">로그인</Link>
          <Link to="/signin">회원가입</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
