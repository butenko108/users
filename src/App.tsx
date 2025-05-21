import { ToastContainer } from "react-toastify";
import { UserList } from "./features/users/components";

import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Управление пользователями</h1>
			</header>
			<main>
				<UserList />
			</main>
			<ToastContainer position="bottom-right" />
		</div>
	);
}

export default App;
