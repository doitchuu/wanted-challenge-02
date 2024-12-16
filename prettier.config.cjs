module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  printWidth: 80, // 한 줄의 최대 길이
  tabWidth: 2, // 탭 너비
  useTabs: false, // 탭 대신 스페이스 사용
  semi: true, // 세미콜론 사용
  singleQuote: false, // 작은 따옴표 사용
  trailingComma: 'es6', // 후행 쉼표 사용 방식
  bracketSpacing: true, // 객체 리터럴에서 괄호 사이의 공백
  jsxBracketSameLine: false, // JSX에서 마지막 `>`를 다음 줄로 내릴지 여부
  arrowParens: 'always', // 화살표 함수에서 매개변수에 괄호를 항상 사용할지 여부
};
