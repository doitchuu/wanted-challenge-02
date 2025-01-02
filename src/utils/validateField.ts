const PASSWORD_MIN_LENGTH = 8;

function validateField(
  type: string,
  value: string,
  message: { email: string; password: string }
) {
  const errorMessage = {
    email: message.email,
    password: message.password,
  };

  if (type === "email") {
    if (!value.length) {
      errorMessage.email = "이메일을 입력해주세요.";
    } else if (!value.includes("@") || !value.includes(".")) {
      errorMessage.email = "잘못된 이메일 형식입니다. 다시 입력해주세요.";
    } else {
      errorMessage.email = "";
    }
  }

  if (type === "password") {
    if (!value.length) {
      errorMessage.password = "비밀번호를 입력해주세요.";
    } else if (value.length < PASSWORD_MIN_LENGTH) {
      errorMessage.password = "비밀번호는 8자 이상이어야 합니다.";
    } else {
      errorMessage.password = "";
    }
  }

  return errorMessage;
}

export default validateField;
