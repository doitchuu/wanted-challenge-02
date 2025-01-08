import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";

interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

function TodoListPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.currentTarget;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (!token) return;

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
        setForm({ title: result.data.title, content: result.data.content });
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

      if (!response.ok) {
        throw new Error("할일을 추가하는 데 실패했어요.");
      }

      const result = await response.json();
      setTodos((prev) => [...prev, result.data]);
      setForm({ title: "", content: "" });
    } catch (error) {
      console.error(error, "할일 추가 중 에러가 발생했어요.");
    }
  };

  const handleUpdateTodo = async () => {
    if (!selectedTodo) return;

    try {
      const response = await fetch(
        `http://localhost:8080/todos/${selectedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("할일을 수정하는 데 실패했어요.");
      }

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
      {/* Todo List */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg">
        <h1 className="text-xl font-bold mb-4">Todo 목록</h1>
        <ul className="mb-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => navigate(`/todo/${todo.id}`)}
              className={`cursor-pointer py-2 px-3 rounded-md hover:bg-gray-200 ${
                selectedTodo?.id === todo.id ? "bg-gray-300" : ""
              }`}
            >
              {todo.title}
            </li>
          ))}
        </ul>
        <Input
          id="title"
          type="text"
          label="타이틀"
          value={form.title}
          onChange={handleChange}
          placeholder="할 일 제목"
        />
        <Input
          id="content"
          type="text"
          label="내용"
          value={form.content}
          onChange={handleChange}
          placeholder="상세 내용"
        />
        <button
          onClick={handleAddTodo}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          + 할 일 추가
        </button>
      </div>

      {/* Todo Details */}
      <div className="flex-2 bg-white p-4 rounded-lg shadow">
        {selectedTodo ? (
          <div>
            <h3 className="text-lg font-bold">{selectedTodo.title}</h3>
            <p className="text-gray-700">{selectedTodo.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              생성일: {new Date(selectedTodo.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              수정일: {new Date(selectedTodo.updatedAt).toLocaleString()}
            </p>
            {isEditing ? (
              <div className="mt-4">
                <Input
                  id="title"
                  type="text"
                  label="타이틀"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="할 일 제목"
                />
                <Input
                  id="content"
                  type="text"
                  label="내용"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="상세 내용"
                />
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleUpdateTodo}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={handleDeleteTodo}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-700">할 일을 선택하세요.</p>
        )}
      </div>
    </div>
  );
}

export default TodoListPage;
