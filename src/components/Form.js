import React, { useState } from "react";
import uuid from "uuid-v4";

function Form(props) {
  const [task, setTask] = useState("");

  const addTask = () => {
    let start = Date.now();
    props.setTasks([
      ...props.tasks,
      {
        id: uuid(),
        name: task,
        completed: false,
      },
    ]);
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
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
