import { Outlet, Link } from "react-router-dom";

function DefaultLayout() {
  return (
    <div>
      <header>
        <Link to="/">Logo</Link>
        <Link to="/login">Login</Link>
        <Link to="/signin">SignIn</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
