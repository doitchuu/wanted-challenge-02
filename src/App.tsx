import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/todo" element={<TodoListPage />} />
        <Route path="/todo/:id" element={<TodoDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
