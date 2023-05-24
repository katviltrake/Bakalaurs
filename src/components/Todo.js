import React, { useState } from "react";
import { useActor } from "@xstate/react";

export default function Todo(props) {
  const [state, send] = useActor(props.todoRef);
  const [name, setName] = useState(props.todo.name);
  const deleteTask = () => {
    send("DELETE");
  };
  const editTask = () => {
    send({ type: "COMMIT", value: name });
  };

  return (
    <>
      {state?.context && (
        <li className="todo stack-small">
          <div className="c-cb">
            <input
              id={props.todo.id}
              type="checkbox"
              checked={props.todo.completed}
              onChange={(e) => send("TOGGLE_COMPLETE")}
            />
            <label className="todo-label" htmlFor={props.todo.id}>
              {props.todo.name}
            </label>
          </div>
          {state?.value === "editing" && (
            <input
              type="text"
              id={props.todo.id}
              className="input input__md"
              name="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <div className="btn-group">
            {state?.value === "editing" ? (
              <button onClick={() => editTask()} type="button" className="btn">
                Pabeigt rediģēšanu{" "}
                <span className="visually-hidden">{props.todo.name}</span>
              </button>
            ) : (
              <button
                onClick={() => send("EDIT")}
                type="button"
                className="btn"
              >
                Rediģēt{" "}
                <span className="visually-hidden">{props.todo.name}</span>
              </button>
            )}
            <button
              onClick={() => deleteTask()}
              type="button"
              className="btn btn__danger"
            >
              Izdzēst <span className="visually-hidden">{props.todo.name}</span>
            </button>
          </div>
        </li>
      )}
    </>
  );
}
