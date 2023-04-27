import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../app/todoSlice";

function Form(props) {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  return (
    <div className="form">
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Kas darāms?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="btn btn__primary btn__lg"
        onClick={() => dispatch(addTask(task))}
      >
        Pievienot
      </button>
    </div>
  );
}

export default Form;
