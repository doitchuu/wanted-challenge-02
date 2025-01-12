import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Todo } from "../types/todo";
import TodoList from "../components/todo/List";
import TodoDetail from "../components/todo/Detail";

function TodoListPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ title: "", content: "" });
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.currentTarget;

    if (isEditing) {
      setEditForm((prev) => ({ ...prev, [id]: value }));
      return;
    }

    setForm((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:8080/todos", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok)
          throw new Error("할일 목록을 불러오는 데 실패했어요.");

        const result = await response.json();
        setTodos(result.data);
      } catch (error) {
        console.error(error, "목록을 불러오던 중 에러가 발생했어요.");
      }
    }

    fetchTodos();
  }, [token]);

  useEffect(() => {
    if (!id || !token) {
      setSelectedTodo(null);

      return;
    }

    async function fetchTodoById() {
      try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok)
          throw new Error("할일 상세 정보를 가져오는 데 실패했어요.");

        const result = await response.json();
        setSelectedTodo(result.data);
        setEditForm({ title: result.data.title, content: result.data.content });
        setForm({ title: "", content: "" });
      } catch (error) {
        console.error(error, "상세 정보를 불러오던 중 에러가 발생했어요.");
      }
    }

    fetchTodoById();
  }, [id, token]);

  const handleAddTodo = async () => {
    if (!form.title || !form.content) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("할일을 추가하는 데 실패했어요.");

      const result = await response.json();
      setTodos((prev) => [...prev, result.data]);
      setForm({ title: "", content: "" });
    } catch (error) {
      console.error(error, "할일 추가 중 에러가 발생했어요.");
    }
  };

  const handleUpdateTodo = async () => {
    if (!selectedTodo) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/todos/${selectedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) throw new Error("할일을 수정하는 데 실패했어요.");

      const result = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === selectedTodo.id ? result.data : todo))
      );
      setSelectedTodo(result.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error, "할일을 수정하던 중 에러가 발생했어요.");
    }
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;

    try {
      const response = await fetch(
        `http://localhost:8080/todos/${selectedTodo.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("할일을 삭제하는 데 실패했어요.");

      setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodo.id));
      setSelectedTodo(null);
      navigate("/todo");
    } catch (error) {
      console.error(error, "삭제 중 에러 발생.");
    }
  };

  return (
    <div className="flex gap-6 p-4">
      <TodoList
        todos={todos}
        selectedTodo={selectedTodo}
        form={form}
        navigate={navigate}
        handleChange={handleChange}
        handleAddTodo={handleAddTodo}
      />
      <TodoDetail
        selectedTodo={selectedTodo}
        isEditing={isEditing}
        editForm={editForm}
        handleChange={handleChange}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default TodoListPage;
