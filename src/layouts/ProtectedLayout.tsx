import { Outlet, Link } from "react-router-dom";

function ProtectedLayout() {
  return (
    <div>
      <header>
        <Link to="/">Logo</Link>
        <Link to="/auth">Login / SignIn</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
