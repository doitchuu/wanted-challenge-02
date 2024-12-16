import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage"


function App(){
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/todo" element={<TodoListPage />}/>
      <Route path="/todo/:id" element={<TodoDetailPage />}/>
    </Routes>
  );
};

export default App;
