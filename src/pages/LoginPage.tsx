import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";

const PASSWORD_MIN_LENGTH = 8;

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = ev.currentTarget;
    let isValidValues = false;

    if (id === "email") {
      setEmail(value);
      isValidValues = validateEmail(value) && validatePassword(password);
    } else {
      setPassword(value);
      isValidValues = validateEmail(email) && validatePassword(value);
    }

    setFormValid(isValidValues);
    return;
  }

  function validateEmail(email: string) {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage({
        ...errorMessage,
        email: "이메일을 입력해주세요.",
      });

      return false;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setErrorMessage({
        ...errorMessage,
        email: "잘못된 이메일 형식입니다. 다시 입력해주세요.",
      });

      return false;
    }

    return true;
  }

  function validatePassword(password: string) {
    if (!password) {
      setErrorMessage({
        ...errorMessage,
        password: "비밀번호를 입력해주세요.",
      });

      return false;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setErrorMessage({
        ...errorMessage,
        password: "비밀번호는 8자 이상이어야 합니다.",
      });

      return false;
    }

    return true;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return;
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
        type="e"
        label="이메일 주소"
        value={email}
        onChange={handleChange}
        placeholder="이메일 주소 입력"
        errorMessage={errorMessage.email}
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        value={password}
        onChange={handleChange}
        placeholder="이메일 주소 입력"
        errorMessage={errorMessage.password}
      />
      <button type="submit" disabled={!formValid}>
        로그인
      </button>
    </form>
  );
}

export default LoginPage;
