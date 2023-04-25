import React, { useState } from "react";

function Form(props) {
  const [task, setTask] = useState("");

  const addTask = () => {
    props.setTasks([
      ...props.tasks,
      {
        id: props.tasks.length > 0 ? props.tasks.slice(-1)[0].id + 1 : 0,
        name: task,
        completed: false,
      },
    ]);
  };

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
      <button className="btn btn__primary btn__lg" onClick={(e) => addTask(e)}>
        Pievienot
      </button>
    </div>
  );
}

export default Form;
