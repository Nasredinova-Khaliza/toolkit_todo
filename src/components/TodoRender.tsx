// TodoRender.tsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBoxTodo, deleteTodo, editeTodo } from "../redux/tools/todoSlice";
import { useAppSelector } from "../redux/store";
import styles from "./TodoRender.module.scss";

const TodoRender = () => {
	const todos = useAppSelector((state) => state.todoReducer.data);
	const dispatch = useDispatch();
	const [editId, setEditId] = useState<number | null>(null);
	const [editName, setEditName] = useState<string>("");
	const [editAge, setEditAge] = useState<number | string>(0);
	const [editProfession, setEditProfession] = useState<string>("");

	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo(id));
	};

	const handleEditTodo = () => {
		if (editId !== null) {
			dispatch(
				editeTodo({
					id: editId,
					name: editName,
					age: editAge,
					profession: editProfession,
					completed: false,
				})
			);
			setEditId(null);
		}
	};

	const handleToggleEdit = (
		id: number,
		name: string,
		age: number,
		profession: string
	) => {
		setEditId(id);
		setEditName(name);
		setEditAge(age);
		setEditProfession(profession);
	};

	const handleToggleCheck = (id: number) => {
		dispatch(checkBoxTodo({ id }));
	};

	return (
		<div className={styles.todoCards}>
			{todos.map((item) => (
				<div key={item.id} className={styles.todoCard}>
					{editId === item.id ? (
						<div className={styles.inputsEdite}>
							<input
								type="text"
								placeholder="name"
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
							/>
							<input
								type="number"
								placeholder="age"
								value={editAge}
								onChange={(e) => setEditAge(+e.target.value)}
							/>
							<input
								type="text"
								placeholder="profession"
								value={editProfession}
								onChange={(e) => setEditProfession(e.target.value)}
							/>
							<button onClick={handleEditTodo}>Save</button>
							<button onClick={() => setEditId(null)}>Cancel</button>
						</div>
					) : (
						<div>
							<h1
								style={
									item.completed
										? { textDecoration: "line-through", color: "red" }
										: {}
								}>
								name: {item.name}
							</h1>
							<p> age:{item.age}</p>
							<p>proffesion:{item.proffesion}</p>
							<div className={styles.buttons}>
								<button
									onClick={() =>
										handleToggleEdit(
											item.id,
											item.name,
											+item.age,
											item.proffesion
										)
									}
									className={styles.editButton}>
									Edit
								</button>
								<button
									onClick={() => handleDeleteTodo(item.id)}
									className={styles.deleteButton}>
									Delete
								</button>
								<input
									type="checkBox"
									checked={item.completed}
									onChange={() => handleToggleCheck(item.id)}
								/>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoRender;
