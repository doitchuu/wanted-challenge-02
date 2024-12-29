import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import AuthPage from "./pages/AuthPage";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route path="/todo" element={<ProtectedLayout />}>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/:id" element={<TodoDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
