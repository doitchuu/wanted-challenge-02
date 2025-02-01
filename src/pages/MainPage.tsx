import { Link } from "react-router-dom";
import Button from "../shared/Button";
import clsx from "clsx";

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-700">To do List</h1>
      <p className="mb-2 text-md text-slate-700">
        할 일을 등록하고, 관리해보세요.
      </p>
      <Button
        type="button"
        className={clsx("flex items-center justify-center w-80")}
      >
        <Link to="/todo">시작하기</Link>
      </Button>
    </div>
  );
}

export default MainPage;
