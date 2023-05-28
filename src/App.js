import React from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { taskStore } = useStore();

  return (
    <div className="todoapp stack-large">
      <h1>Uzdevumu grāmata</h1>
      <Form tasks={taskStore.tasks} />
      <h2 id="list-heading">
        {taskStore.tasks.length}{" "}
        {taskStore.tasks.length === 1
          ? "uzdevums atlicis"
          : "uzdevumi atlikuši"}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskStore.tasks &&
          taskStore.tasks.map((task) => (
            <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              tasks={taskStore.tasks}
            />
          ))}
      </ul>
    </div>
  );
}

export default observer(App);
