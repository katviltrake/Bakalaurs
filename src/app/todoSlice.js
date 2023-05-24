import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{ id: 1, name: "Bakalaurs", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task
      );
    },
    addTask: (state, action) => {
      state.tasks = [
        ...state.tasks,
        {
          id: state.tasks.length > 0 ? state.tasks.slice(-1)[0].id + 1 : 0,
          name: action.payload,
          completed: false,
        },
      ];
    },
    changeCompleted: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    },
  },
});

export const { deleteTask, editTask, addTask, changeCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
