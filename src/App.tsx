import { ToastContainer } from "react-toastify";
import { UserList } from "./features/users/components";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="text-center max-w-[800px] mx-auto p-5">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Управление пользователями</h1>
      </header>
      <main>
        <UserList />
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
