import React, { useState } from "react";

export default function Todo(props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);

  const deleteTask = () => {
    props.setTasks(props.tasks.filter((task) => task.id !== props.id));
  };

  const editTask = () => {
    setEditing(false);
    if (props.name !== name) {
      const newTask = props.tasks.map((task) =>
        task.id === props.id ? { ...task, name: name } : task
      );
      props.setTasks(newTask);
    }
  };
  const changeCompleted = () => {
    const newTask = props.tasks.map((task) =>
      task.id === props.id ? { ...task, completed: !task.completed } : task
    );
    props.setTasks(newTask);
  };

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
