import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePasswordConfirm, validateField } from "../utils/validation";

import Input from "../components/Input";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "이메일을 입력해주세요.",
    password: "비밀번호를 입력해주세요",
  });
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<string>("비밀번호가 일치하지 않아요.");

  const navigate = useNavigate();

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = ev.currentTarget;

    setForm({ ...form, [id]: value });

    if (id === "passwordConfirm") {
      const errorMessage = validatePasswordConfirm(form.password, value);

      setPasswordConfirmError(errorMessage);
      return;
    }

    setErrorMessage(validateField(id, value, errorMessage));
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("회원가입에 실패했어요.");
      }

      navigate("/");
    } catch (error) {
      console.error(error, "회원가입 중 에러가 발생했어요.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
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
        placeholder="비밀번호 입력(최소 8자리)"
        errorMessage={errorMessage.password}
      />
      <Input
        id="passwordConfirm"
        type="password"
        label="비밀번호 확인"
        value={form.passwordConfirm}
        onChange={handleChange}
        placeholder="비밀번호 재입력"
        errorMessage={passwordConfirmError}
      />
      <button
        type="submit"
        disabled={
          !!errorMessage.email ||
          !!errorMessage.password ||
          !!passwordConfirmError
        }
      >
        회원가입
      </button>
    </form>
  );
};

export default SignInPage;
