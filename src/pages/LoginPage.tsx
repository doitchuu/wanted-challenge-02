import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";

import { validateField } from "../utils/validation";

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
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했어요.");
      }

      const result = await response.json();

      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (error) {
      console.error(error, "로그인 중 에러가 발생했어요.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인</h1>
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
      <button
        type="submit"
        disabled={!!errorMessage.email || !!errorMessage.password}
      >
        로그인
      </button>
    </form>
  );
}

export default LoginPage;
