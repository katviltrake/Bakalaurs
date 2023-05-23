import React, { useState, createContext } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { todosMachine } from "./machines/todosMachine";
import { createActorContext, useMachine } from "@xstate/react";
export const SomeMachineContext = createActorContext(todosMachine);

function App(props) {
  const [state, send] = useMachine(todosMachine);

  return (
    <SomeMachineContext.Provider>
      <div className="todoapp stack-large">
        <h1>Uzdevumu grāmata</h1>
        <Form tasks={state.context.todos} />
        <h2 id="list-heading">
          {state.context.todos.length}{" "}
          {state.context.todos.length === 1
            ? "uzdevums atlicis"
            : "uzdevumi atlikuši"}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {state?.context?.todos &&
            state?.context?.todos.map((task) => (
              <Todo
                key={task.id}
                tasks={state.context.todos}
                todoRef={task.ref}
              />
            ))}
        </ul>
      </div>
    </SomeMachineContext.Provider>
  );
}

export default App;
