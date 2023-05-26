import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { action } from "mobx";

function Todo(props) {
  const { todoStore } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);

  const deleteTask = action(() => {
    let start = Date.now();
    todoStore.tasks = todoStore.tasks.filter((task) => task.id !== props.id);
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  });

  const editTask = action(() => {
    setEditing(false);
    if (props.name !== name) {
      let start = Date.now();
      const newTasks = todoStore.tasks.map((task) =>
        task.id === props.id ? { ...task, name: name } : task
      );
      todoStore.tasks = newTasks;
      let timeTaken = Date.now() - start;
      console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
    }
  });

  const changeCompleted = action(() => {
    let start = Date.now();
    const newTask = todoStore.tasks.map((task) =>
      task.id === props.id ? { ...task, completed: !task.completed } : task
    );
    todoStore.tasks = newTask;
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  });

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => changeCompleted()}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      {editing && (
        <input
          type="text"
          id={props.id}
          className="input input__md"
          name="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <div className="btn-group">
        {editing ? (
          <button onClick={() => editTask()} type="button" className="btn">
            Pabeigt rediģēšanu{" "}
            <span className="visually-hidden">{props.name}</span>
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            type="button"
            className="btn"
          >
            Rediģēt <span className="visually-hidden">{props.name}</span>
          </button>
        )}
        <button
          onClick={() => deleteTask(props.id)}
          type="button"
          className="btn btn__danger"
        >
          Izdzēst <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
export default observer(Todo);
