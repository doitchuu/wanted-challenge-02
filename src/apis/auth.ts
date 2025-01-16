import fetchClient from "../utils/fetchClient";

interface SignInData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function signIn(data: SignInData) {
  const response = await fetchClient("http://localhost:8080/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했어요.");
  }

  return response.json();
}

export async function login(data: LoginData) {
  const response = await fetchClient("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("로그인에 실패했어요.");
  }

  return response.json();
}
