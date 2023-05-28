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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCGsDWsDEA5AogOoAqAggMoDSAdAMIDyAsowJLEDaADALqKgAOAe1gBLZCMEA7PiAAeiACwKATNU4B2ABwBmZcoCMBzgE4ArMtMAaEAE9Ey9duoLjFgGxnTC7boUBfP2s0TBwyKjomVg4eGSFRcSkZeQRDanVvY05tTgV9QwtOTWs7BAcnF3dPb18AoPQsbDCaABF8ABl8YnwuXiQQOLEJaT7k701qTXV1ZU0st3SdIttEY3VqfVyPHP1NTWNvf0CQYIam6kZSACVKHtjhQcSR+1VTV-1OV5NTN21Z5WKVmsNvotrldvttG5asd6rBqAAbQSoCAiSRQbC3PoDBLDUDJCzGCY-bRKBTqTgGTQKAGlVZpMxVMluPJQ6GSQQQOAyE7wLH3HFJRD6KbOSHKebqQw5Uz6KzLBDGcarfTaYxivbKEn6aE8hFIlFou7xIaC0oWUVucVTKUKGVyko7NzOUwfNxKN26GaHOohagAJzAyJKAn5JqepVt62+2neplcbnBNLF1F0r3UDN+C1ZASAA */
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
