import { Todo } from "../../types/todo";
import TodoForm from "./Form";

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  form: { title: string; content: string };
  navigate: (path: string) => void;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
}

function TodoList({
  todos,
  selectedTodo,
  form,
  navigate,
  handleChange,
  handleAddTodo,
}: TodoListProps) {
  return (
    <div className="flex-1 w-1/2 h-screen bg-slate-100 p-4 rounded-lg">
      <h1 className="text-xl font-bold mb-4">Todo 목록</h1>
      <ul className="mb-4">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            onClick={() => navigate(`/todo/${todo.id}`)}
            className={`cursor-pointer py-2 px-3 rounded-md hover:bg-slate-200 ${
              selectedTodo?.id === todo.id ? "bg-slate-300" : ""
            }`}
          >
            {todo.title}
          </li>
        ))}
      </ul>
      <TodoForm
        form={form}
        handleChange={handleChange}
        handleUpdateTodo={handleAddTodo}
      />
    </div>
  );
}

export default TodoList;
