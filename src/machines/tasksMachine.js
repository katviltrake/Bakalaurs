import { createMachine, assign, spawn } from "xstate";
import uuid from "uuid-v4";
import { createTaskMachine } from "./taskMachine";

function createTask(title) {
  return {
    id: uuid(),
    name: title,
    completed: false,
  };
}

export const tasksMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQDkCiA6gCoCCAygNIB0AwgPICyDAkkQNoAMAuoqAA6YAlskGoAdrxAAPRAFYAjAHYqsgByqATIoAsGjQE5tHVdoA0IAJ6I92qofUA2VfNkP5AZlUcNAXx-m0DGxSSlpGFnZuSQFYYVEJJGlEdw5ZKhN9d20HHKzZcysEeV0qRUUNWQ1td0NtHQ0HPwD0TCwQ6gARPAAZPCI8Th5EmLjxSRkEAFoXVVLc-QX5NwUHRQLreQ4VA29dxSdFfVUmkEDW9qoGEgAlCkHooRExxIn5DXk7T0zjd53ZNcsiHkqmUsiMegcsncUP0YN8-lOLVgVAANqgAIYQQRiKBYe7DR7xcbWVJ2eT6BruMpVTxOdYIbTafRUBwpDQcJQpJbuRonMToOCSM7wAmxJ4JUATab09xUlkKbwODSeOqsk7C1EYrE4h5iokvRB1em6NIeXbKjyqdxvdVIqgAJzAmMK-EJz0lyQ4WyO1TcKUUqn0DlSxu0sz9Wic0PKR3cfj8QA */
  id: "tasks",
  preserveActionOrder: true,
  context: {
    tasks: [{ id: 1, name: "Bakalaurs", completed: false }],
  },
  initial: "loading",
  states: {
    loading: {
      entry: assign({
        tasks: (context) => {
          return context.tasks.map((task) => ({
            ...task,
            ref: spawn(createTaskMachine(task)),
          }));
        },
      }),
      always: "ready",
    },
    ready: {},
  },
  on: {
    "NEWTASK.COMMIT": {
      actions: assign({
        tasks: (context, event) => {
          const newtask = createTask(event.value);
          return context.tasks.concat({
            ...newtask,
            ref: spawn(createTaskMachine(newtask)),
          });
        },
      }),
      internal: true,
    },
    "TASK.COMMIT": {
      actions: assign({
        tasks: (context, event) => {
          return context.tasks.map((task) =>
            task.id === event.task.id
              ? {
                  ...task,
                  name: event?.name ? event?.name : task?.name,
                  ref: task.ref,
                }
              : task
          );
        },
      }),
      internal: true,
    },
    "TASK.DELETE": {
      actions: assign({
        tasks: (context, event) => {
          return context.tasks.filter((task) => task.id !== event.id);
        },
      }),
      internal: true,
    },
    "TASK.MARK": {
      actions: assign({
        tasks: (context, event) => {
          return context.tasks.map((task) =>
            task.id === event.task.id
              ? {
                  ...task,
                  completed: !task?.completed,
                  ref: task.ref,
                }
              : task
          );
        },
      }),
      internal: true,
    },
  },
});
