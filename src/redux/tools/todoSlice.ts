import { createSlice } from "@reduxjs/toolkit";

interface createType {
	id: number;
	name: string;
	age: number | string;
	proffesion: string;
	completed: boolean;
}

const initialState: { data: createType[] } = {
	data: [],
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const newData: createType = {
				id: Date.now(),
				name: action.payload.name,
				age: action.payload.age,
				proffesion: action.payload.profession,
				completed: action.payload.completed,
			};
			state.data.push(newData);
		},

		deleteTodo: (state, action) => {
			state.data = state.data.filter(
				(item: createType) => item.id !== action.payload
			);
		},

		deleteAll: (state) => {
			state.data = [];
		},

		editeTodo: (state, action) => {
			state.data = state.data.map((item: createType) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						name: action.payload.name,
						age: action.payload.age,
						profession: action.payload.profession,
						completed: action.payload.completed,
					};
				}
				return item;
			});
		},

		checkBoxTodo: (state, action) => {
			state.data = state.data.map((item: createType) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						completed: !item.completed,
					};
				}
				return item;
			});
		},
	},
});

export const { addTodo, deleteTodo, deleteAll, editeTodo, checkBoxTodo } =
	todoSlice.actions;
export const todoReducer = todoSlice.reducer;
