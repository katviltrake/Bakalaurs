import React, { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";

function App(props) {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Bakalaurs", completed: false },
  ]);

  return (
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
  );
}

export default App;
