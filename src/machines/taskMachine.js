import { createMachine, assign, sendParent } from "xstate";

export const createTaskMachine = ({ id, name, completed }) =>
  createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUGIAqB5A4vgDICiA+gMK4CyACqdiQNoAMAuoqAA6qwCWyPqgB2nEAA9EAFikB2AHSyATADYArAGYAHCyUsAjFoCcUgDQgAntKNL5KlkY1S1y4-qMqAvp-NoMmEgARAElsVg4kEB5+QRExSQR7BX0lfRYWFSVZLTV9KQ1zKwQnRXzZexzZbLUjWW9fdCxAkgZmdjFogSFRSITXeRZcjJYc3K0tJULEEtkynXS9dxVy+pA-VHk+CAAbMBwCYnIqOlbwjt4uuN7EPRV5PLUJibkWWRYCyxutfXlHJSUjOkdEopN9Vut5JAusIoJhjtRQmdIp1Yj1QAkNDZfvplrINPoNMstMsPkVbG41HoTCotNpHFpvD4QMJ0HAxOtzjFuvFEABaUFTBC8rRSeSPcoaJSYlQ0uRScGNTY7MCcy5oiSIFiC1RaRRqdLpIxqZYpEwKjCQiDQqCq1E8hCg3UZEFGSpqKQgsyfBD6ZTyOTqQk6fQEmrmjYQMC7ZCQW3c64IcYKHKOFwpd4y-SC322ANqFypZRSUOMzxAA */
    id: "task",
    initial: "idle",
    context: {
      id,
      name,
      completed: completed,
    },
    on: {
      TOGGLE_COMPLETE: {
        actions: [
          assign({ completed: true }),
          sendParent((context) => ({ type: "TASK.COMMIT", task: context })),
        ],
      },
      EDIT: "editing",
      DELETE: "deleted",
    },
    states: {
      idle: {
        on: {
          TOGGLE_COMPLETE: {
            target: "idle",
            actions: sendParent((context) => ({
              type: "TASK.MARK",
              task: context,
            })),
          },
        },
      },
      editing: {
        on: {
          COMMIT: [
            {
              target: "idle",
              actions: sendParent((context, event) => ({
                type: "TASK.COMMIT",
                task: context,
                name: event.value,
              })),
            },
          ],
        },
      },
      deleted: {
        onEntry: sendParent((context) => ({
          type: "TASK.DELETE",
          id: context.id,
        })),
      },
    },
  });
