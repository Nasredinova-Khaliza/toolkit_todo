import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, deleteAll } from "../redux/tools/todoSlice";
import TodoRender from "./TodoRender";
import styles from "./TodoList.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [profession, setProfession] = useState("");
	const dispatch = useDispatch();

	const handleAddTodo = () => {
		if (name === "" || age === 0 || profession === "") {
			toast.error("Please fill in all fields");
		} else {
			dispatch(
				addTodo({
					name,
					age,
					profession,
					completed: false,
				})
			);
			toast.success("Todo added successfully");
		}

		setName("");
		setAge(0);
		setProfession("");
	};

	const deleteAllTodo = () => {
		dispatch(deleteAll());
	};

	return (
		<div className={styles.todoList}>
			<h1>Todo List</h1>
			<input
				type="text"
				placeholder="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="number"
				placeholder="age"
				value={age}
				onChange={(e) => setAge(+e.target.value)}
			/>
			<input
				type="text"
				placeholder="profession"
				value={profession}
				onChange={(e) => setProfession(e.target.value)}
			/>
			<div className={styles.buttons}>
				<button className={styles.addButton} onClick={handleAddTodo}>
					Add
				</button>
				<button className={styles.deleteButton} onClick={deleteAllTodo}>
					Delete All
				</button>
				<ToastContainer />
			</div>
			<TodoRender />
		</div>
	);
};

export default TodoList;
