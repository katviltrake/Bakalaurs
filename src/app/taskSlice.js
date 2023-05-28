import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid-v4";

const initialState = {
  tasks: [{ id: 1, name: "Bakalaurs", completed: false }],
};

export const taskSlice = createSlice({
  name: "tasks",
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
          id: uuid(),
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
  taskSlice.actions;

export default taskSlice.reducer;
