import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../shared/Input";
import { login } from "../apis/auth";

import { validateField } from "../utils/validation";
import Button from "../shared/Button";

function LoginPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "이메일을 입력해주세요.",
    password: "비밀번호를 입력해주세요",
  });

  const navigate = useNavigate();

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = ev.currentTarget;

    setForm({ ...form, [id]: value });
    setErrorMessage(validateField(id, value, errorMessage));

    return;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      const result = await login(form);

      if (!result) {
        throw new Error("로그인 실패");
      }

      navigate("/todo");
    } catch (error) {
      console.error(error, "로그인 중 에러가 발생했어요.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="mt-4 text-2xl font-bold">로그인</h1>
      <p className="mt-2 mb-8 text-sm text-slate-600">
        Todolist 서비스 사용을 위해 로그인 해주세요.
      </p>
      <Input
        id="email"
        type="text"
        label="이메일 주소"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일 주소 입력"
        errorMessage={errorMessage.email}
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호 입력"
        errorMessage={errorMessage.password}
      />
      <Button
        type="submit"
        disabled={!!errorMessage.email || !!errorMessage.password}
        className="w-full"
      >
        로그인
      </Button>
    </form>
  );
}

export default LoginPage;
