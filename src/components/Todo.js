import React, { useState, useRef } from "react";
import { useActor } from "@xstate/react";

export default function Todo(props) {
  const [state, send] = useActor(props.todoRef);
  const { id, title, completed } = state.context;
  const [name, setName] = useState(props.name);
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
              id={state.context.id}
              type="checkbox"
              defaultChecked={state.context.completed}
            />
            <label className="todo-label" htmlFor={state.context.id}>
              {state.context.name}
            </label>
          </div>
          {state?.value === "editing" && (
            <input
              type="text"
              id={state.context.id}
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
                <span className="visually-hidden">{state.context.name}</span>
              </button>
            ) : (
              <button
                onClick={() => send("EDIT")}
                type="button"
                className="btn"
              >
                Rediģēt{" "}
                <span className="visually-hidden">{state.context.name}</span>
              </button>
            )}
            <button
              onClick={() => deleteTask()}
              type="button"
              className="btn btn__danger"
            >
              Izdzēst{" "}
              <span className="visually-hidden">{state.context.name}</span>
            </button>
          </div>
        </li>
      )}
    </>
  );
}
