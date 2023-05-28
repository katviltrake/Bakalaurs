import React, { useState } from "react";
import { useActor } from "@xstate/react";

export default function Task(props) {
  const [state, send] = useActor(props.taskRef);
  const [name, setName] = useState(props.task.name);
  const deleteTask = () => {
    let start = Date.now();
    send("DELETE");
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  };
  const editTask = () => {
    let start = Date.now();
    send({ type: "COMMIT", value: name });
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  };

  const toggle = () => {
    let start = Date.now();
    send("TOGGLE_COMPLETE");
    let timeTaken = Date.now() - start;
    console.log("Patērētais laiks funkcijai: " + timeTaken + " milisekundes");
  };
  return (
    <>
      {state?.context && (
        <li className="task stack-small">
          <div className="c-cb">
            <input
              id={props.task.id}
              type="checkbox"
              checked={props.task.completed}
              onChange={() => toggle()}
            />
            <label className="task-label" htmlFor={props.task.id}>
              {props.task.name}
            </label>
          </div>
          {state?.value === "editing" && (
            <input
              type="text"
              id={props.task.id}
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
                <span className="visually-hidden">{props.task.name}</span>
              </button>
            ) : (
              <button
                onClick={() => send("EDIT")}
                type="button"
                className="btn"
              >
                Rediģēt{" "}
                <span className="visually-hidden">{props.task.name}</span>
              </button>
            )}
            <button
              onClick={() => deleteTask()}
              type="button"
              className="btn btn__danger"
            >
              Izdzēst <span className="visually-hidden">{props.task.name}</span>
            </button>
          </div>
        </li>
      )}
    </>
  );
}
