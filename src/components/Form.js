import React, { useState } from "react";
import { useActor } from "@xstate/react";

function Form(props) {
  const [state, send] = useActor(props.service);
  const [task, setTask] = useState("");

  const addTask = (e) => {
    setTask(e.target.value);
  };

  const adding = () => {
    let start = Date.now();
    send({ type: "NEWTASK.COMMIT", value: task });
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
        onChange={(e) => addTask(e)}
      />
      <button className="btn btn__primary btn__lg" onClick={() => adding()}>
        Pievienot
      </button>
    </div>
  );
}

export default Form;
