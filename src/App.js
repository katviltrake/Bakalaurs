import React, { useState, createContext } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useInterpret, useMachine } from "@xstate/react";
import { createTodoMachine } from "./machine";
export const GlobalStateContext = createContext({});

function App(props) {
  const service = useInterpret(createTodoMachine);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Bakalaurs", completed: false },
  ]);
  console.log(tasks);
  const [state, send] = useMachine(createTodoMachine, {
    actions: {
      goToOtherPage: () => {},
    },
  });

  return (
    <GlobalStateContext.Provider value={{ service }}>
      <div className="todoapp stack-large">
        <h1>Uzdevumu grāmata</h1>
        <Form setTasks={setTasks} tasks={tasks} />
        <h2 id="list-heading">
          {tasks.length}{" "}
          {tasks.length === 1 ? "uzdevums atlicis" : "uzdevumi atlikuši"}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {tasks &&
            tasks.map((task) => (
              <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
        </ul>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
