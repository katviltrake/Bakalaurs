import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, deleteTask, changeCompleted } from "../app/taskSlice";

export default function Todo(props) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);

  const edit = () => {
    setEditing(false);
    if (props.name !== name) {
      dispatch(editTask({ id: props.id, name: name }));
    }
  };

  const toggle = () => {
    dispatch(changeCompleted({ id: props.id }));
  };

  const deleting = () => {
    dispatch(deleteTask(props.id));
  };
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => toggle()}
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
          <button onClick={() => edit()} type="button" className="btn">
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
          onClick={() => deleting()}
          type="button"
          className="btn btn__danger"
        >
          Izdzēst <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
