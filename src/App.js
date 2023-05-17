import React from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App(props) {
  const { todoStore } = useStore();

  return (
    <div className="todoapp stack-large">
      <h1>Uzdevumu grāmata</h1>
      <Form tasks={todoStore.tasks} />
      <h2 id="list-heading">
        {todoStore.tasks.length}{" "}
        {todoStore.tasks.length === 1
          ? "uzdevums atlicis"
          : "uzdevumi atlikuši"}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todoStore.tasks &&
          todoStore.tasks.map((task) => (
            <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              tasks={todoStore.tasks}
            />
          ))}
      </ul>
    </div>
  );
}

export default observer(App);
