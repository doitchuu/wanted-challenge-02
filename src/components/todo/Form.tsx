import Input from "../../shared/Input";
import Button from "../../shared/Button";
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
        <Button type="button" onClick={handleUpdateTodo} className="w-full">
          저장
        </Button>
        {isSecondaryButton && (
          <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-slate-400 py-2 px-4 w-full text-white hover:bg-slate-500"
          >
            {secondaryButtonName}
          </Button>
        )}
      </div>
    </div>
  );
}

export default TodoForm;
