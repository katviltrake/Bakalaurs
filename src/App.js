import React from "react";
import Form from "./components/Form";
import Task from "./components/Task";
import { tasksMachine } from "./machines/tasksMachine";
import { useInterpret, useActor } from "@xstate/react";

function App() {
  const service = useInterpret(tasksMachine);
  const [state] = useActor(service);

  return (
    <div className="todoapp stack-large">
      <h1>Uzdevumu grāmata</h1>
      <Form service={service} />
      <h2 id="list-heading">
        {state.context.tasks.length}{" "}
        {state.context.tasks.length === 1
          ? "uzdevums atlicis"
          : "uzdevumi atlikuši"}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {state?.context?.tasks &&
          state?.context?.tasks.map((task) => (
            <Task
              key={task.id}
              tasks={state.context.tasks}
              task={task}
              taskRef={task.ref}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
