import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, deleteTask } from "../app/todoSlice";

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

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} />
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
          onClick={() => dispatch(deleteTask(props.id))}
          type="button"
          className="btn btn__danger"
        >
          Izdzēst <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
