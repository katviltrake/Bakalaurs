import { createMachine, assign, spawn } from "xstate";
import uuid from "uuid-v4";
import { createTodoMachine } from "./todoMachine";

function createTodo(title) {
  return {
    id: uuid(),
    name: title,
    completed: false,
  };
}

export const todosMachine = createMachine({
  id: "todos",
  preserveActionOrder: true,
  context: {
    todos: [
      { id: 1, name: "Bakalaurs", completed: false },
      { id: 2, name: "Bakalaurs", completed: false },
    ],
  },
  initial: "loading",
  states: {
    loading: {
      entry: assign({
        todos: (context) => {
          return context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo)),
          }));
        },
      }),
      always: "ready",
    },
    ready: {},
  },
  on: {
    "NEWTODO.COMMIT": {
      actions: assign({
        todos: (context, event) => {
          return context.todos.concat({
            ...createTodo(event.value.trim()),
            ref: spawn(createTodoMachine(createTodo(event.value.trim()))),
          });
        },
      }),
      internal: true,
    },
    "TODO.COMMIT": {
      actions: [
        (context) => console.log(context.todos, "bef"),
        assign({
          todos: (context, event) => {
            return context.todos.map((todo) =>
              todo.id === event.todo.id
                ? { ...todo, name: event.name, ref: todo.ref }
                : todo
            );
          },
        }),
        (context) => console.log(context.todos, "aft"),
      ],
      internal: true,
    },
    "TODO.DELETE": {
      actions: assign({
        todos: (context, event) =>
          context.todos.filter((todo) => todo.id !== event.id),
      }),
    },
    "MARK.completed": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_COMPLETED"));
      },
    },
    "MARK.active": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_ACTIVE"));
      },
    },
  },
});
