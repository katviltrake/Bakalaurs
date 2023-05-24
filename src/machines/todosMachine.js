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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQDkCiA6gCoDyAIiQHQDCJAsnQJJEDaADALqKgAOmAlsn6oAdtxAAPRAEYAzNMoAWAJwAmaQA5pAVjmKAbMsUAaEAE9Estm0qaA7CrtHFs7fp0BfD6bQZspChp6JlZOcT5YQWExJEkZFVttFVllOyc2aUVVDVMLBFU2RVtVFWUNfVVlbTs2NK8fdEwsAKoyPAAZPCI8di5YiKjRcSkEHVVKDQNZFOV9O3dK7VyZNg1KNgrS+UU7DW1ZDXqQXyaWyjoAQQAlAGle8IEhIdiRnTXZ91lVVW1y7VU7EtzDJVEcTrBKAAbVAAQwg-BEUCw936j2iw0QBW0lGU0jU+lkaRKB30OWBCEUCQJbAK0jsVmkBP0Xm8IBE6Dg4nBD0iTxioBGAFppMsENM7JR9Lo2ClagdFLVmazwVDYfDETzBvy4hS7KKsti5DSafIDvJQcrGhCAE5gOF5Xho54CyzWHGTWSfWoaWZsIF5SlrT4A0muOyVDSyFkeIA */
  id: "todos",
  preserveActionOrder: true,
  context: {
    todos: [{ id: 1, name: "Bakalaurs", completed: false }],
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
          const newTodo = createTodo(event.value);
          return context.todos.concat({
            ...newTodo,
            ref: spawn(createTodoMachine(newTodo)),
          });
        },
      }),
      internal: true,
    },
    "TODO.COMMIT": {
      actions: assign({
        todos: (context, event) => {
          return context.todos.map((todo) =>
            todo.id === event.todo.id
              ? {
                  ...todo,
                  name: event?.name ? event?.name : todo?.name,
                  ref: todo.ref,
                }
              : todo
          );
        },
      }),
      internal: true,
    },
    "TODO.DELETE": {
      actions: assign({
        todos: (context, event) => {
          return context.todos.filter((todo) => todo.id !== event.id);
        },
      }),
      internal: true,
    },
    "TODO.MARK": {
      actions: assign({
        todos: (context, event) => {
          return context.todos.map((todo) =>
            todo.id === event.todo.id
              ? {
                  ...todo,
                  completed: !todo?.completed,
                  ref: todo.ref,
                }
              : todo
          );
        },
      }),
      internal: true,
    },
  },
});
