import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Todo } from "../types/todo";
import TodoList from "../components/todo/List";
import TodoDetail from "../components/todo/Detail";
import {
  deleteTodo,
  getTodoById,
  getTodos,
  addTodo,
  updateTodo,
} from "../apis/todo";

function TodoListPage() {
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
    async function fetchTodos() {
      try {
        const data = await getTodos();
        if (data) setTodos(data);
      } catch (error) {
        console.error(error, "목록을 불러오던 중 에러가 발생했어요.");
      }
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const data = id ? await getTodoById(id) : null;

        if (data) {
          setSelectedTodo(data);
          setEditForm({ title: data.title, content: data.content });
          setForm({ title: "", content: "" });

          return;
        }
      } catch (error) {
        console.error(error, "상세 정보를 불러오던 중 에러가 발생했어요.");
      }
    }
    fetchTodo();
  }, [id]);

  const handleAddTodo = async () => {
    if (!form.title || !form.content) return;
    try {
      const newTodo = await addTodo(form);
      if (newTodo) {
        setTodos((prev) => [...prev, newTodo]);
        setForm({ title: "", content: "" });
      }
    } catch (error) {
      console.error(error, "할일 추가 중 에러가 발생했어요.");
    }
  };

  const handleUpdateTodo = async () => {
    if (!selectedTodo) return;
    try {
      const updated = await updateTodo(selectedTodo.id, editForm);
      if (updated) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === selectedTodo.id ? updated : todo))
        );
        setSelectedTodo(updated);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error, "할일을 수정하던 중 에러가 발생했어요.");
    }
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;
    try {
      await deleteTodo(selectedTodo.id);
      setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodo.id));
      setSelectedTodo(null);
      navigate("/todo");
    } catch (error) {
      console.error(error, "삭제 중 에러 발생.");
    }
  };

  return (
    <div className="flex flex-row size-full">
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
