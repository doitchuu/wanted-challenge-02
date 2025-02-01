import Button from "../../shared/Button";
import { Todo } from "../../types/todo";
import TodoForm from "./Form";

interface TodoDetailProps {
  selectedTodo: Todo | null;
  editForm: { title: string; content: string };
  isEditing: boolean;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateTodo: () => void;
  handleDeleteTodo: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoDetail({
  selectedTodo,
  editForm,
  isEditing,
  handleChange,
  handleUpdateTodo,
  handleDeleteTodo,
  setIsEditing,
}: TodoDetailProps) {
  if (!selectedTodo) {
    return (
      <div className="flex-1 flex items-center justify-center w-1/2 h-screen bg-white p-4 rounded-lg shadow">
        <p className="text-slate-700 font-base">할 일을 선택하세요.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-1/2 h-screen bg-white p-4 rounded-lg shadow">
      <div className="p-4 bg-slate-200 rounded-lg">
        <h3 className="text-lg font-bold">{selectedTodo.title}</h3>
        <p className="text-slate-700">{selectedTodo.content}</p>
        <p className="text-sm text-slate-500 mt-2">
          생성일: {new Date(selectedTodo.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-slate-500">
          수정일: {new Date(selectedTodo.updatedAt).toLocaleString()}
        </p>
      </div>
      {isEditing ? (
        <TodoForm
          form={editForm}
          isSecondaryButton={true}
          secondaryButtonName="취소"
          handleChange={handleChange}
          handleUpdateTodo={handleUpdateTodo}
          handleButtonClick={() => setIsEditing(false)}
        />
      ) : (
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-white border border-blue-500 !text-blue-600 w-full"
          >
            수정
          </Button>
          <Button
            type="button"
            onClick={handleDeleteTodo}
            className="bg-red-500 w-full text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
export default TodoDetail;
