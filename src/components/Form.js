import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { action } from "mobx";

function Form() {
  const { todoStore } = useStore();
  const [task, setTask] = useState("");

  const addTask = action(() => {
    let start = Date.now();
    todoStore.tasks.push({
      id: todoStore.tasks.length > 0 ? todoStore.tasks.slice(-1)[0].id + 1 : 0,
      name: task,
      completed: false,
    });
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  });

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

export default observer(Form);
