import React from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useSelector } from "react-redux";

function App(props) {
  const tasks = useSelector((state) => state.todo.tasks || []);

  return (
    <div className="todoapp stack-large">
      <h1>Uzdevumu grāmata</h1>
      <Form tasks={tasks} />
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
              tasks={tasks}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
