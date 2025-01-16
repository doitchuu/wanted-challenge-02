import { Form } from "../types/form";
import fetchClient from "../utils/fetchClient";

async function getTodos() {
  try {
    const response = await fetchClient("http://localhost:8080/todos");

    if (!response.ok) {
      throw new Error("할일 목록을 불러오는 데 실패했어요.");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error, "목록을 불러오던 중 에러가 발생했어요.");
  }
}

async function getTodoById(id: string) {
  try {
    const response = await fetchClient(`http://localhost:8080/todos/${id}`);

    if (!response.ok) {
      throw new Error("할일 상세 정보를 가져오는 데 실패했어요.");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error, "상세 정보를 불러오던 중 에러가 발생했어요.");
  }
}

async function addTodo(form: Form) {
  try {
    const response = await fetchClient("http://localhost:8080/todos", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("할일을 추가하는 데 실패했어요.");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error, "할일 추가 중 에러가 발생했어요.");
  }
}

async function updateTodo(id: string, form: Form) {
  try {
    const response = await fetchClient(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("할일을 수정하는 데 실패했어요.");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error, "할일을 수정하던 중 에러가 발생했어요.");
  }
}

async function deleteTodo(id: string) {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("할일을 삭제하는 데 실패했어요.");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error, "삭제 중 에러 발생.");
  }
}

export { getTodos, getTodoById, addTodo, updateTodo, deleteTodo };
