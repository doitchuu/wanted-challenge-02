import Input from "../../shared/Input";

interface FormProps {
  form: { title: string; content: string };
  isSecondaryButton?: boolean;
  secondaryButtonName?: string;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateTodo: () => void;
  handleButtonClick?: () => void;
}

function TodoForm({
  form,
  isSecondaryButton,
  secondaryButtonName,
  handleChange,
  handleUpdateTodo,
  handleButtonClick,
}: FormProps) {
  return (
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
        {isSecondaryButton && (
          <button
            onClick={handleButtonClick}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            {secondaryButtonName}
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoForm;
