import { createMachine, assign, sendParent } from "xstate";

export const createTodoMachine = ({ id, name, completed }) =>
  createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUGIAqB5A4vgDICiA+gMK4CyACqdiQNoAMAuoqAA6qwCWyPqgB2nEAA9EAFikB2AHSyATADYArAGYAHCyUsAjFoCcUgDQgAntKNL5KlkY1S1y4-qMqAvp-NoMmABESBmZ2MR5+QRExSQR9AzstWTUWFRUlDRUZD3MrBC19eRSWEqks9S1jb190LBIAgElsVg4kEAiBIVE22PjClSSUtIysqRzLRH0NWxLZpUM02X0vHxA-VHkAJzAAQwg+YSgcAmJyKjoQlvDeTuiexBdcxCUxuwMxlSWp2S0NDWq1rUtrt9odMPUmlc2h0ot1QLElMl5BpZGMjGolGo1DIlBknghVFpFCwNPEjCxklIplIAetgXsDkcgpcwtCbrCYs8kSi0RisTi8RMEJkpHY1Ol9EsTPpvisahh5JBOmDztRIazuOyupyCdzUUZ0ZjsVJcRp8ZLbMlZg5xUslCZaUClYIVTQ1c19K1NZFtfcEFkFCT9BlSWkjFpnOb0fI5OpxS97PMtN5VsJ0HAxOtrj67vDEEZ8QBaOWAhXbBmHbO3OESSYJAZW4Yij74lGBinJQm4jwox0K52Mqscv1SSryVIvcMubEvMxCi0x2TqTI6GUaNRGPsbCBgAA2YGQkCHvrz+SS8i0G-XdpJaX05uUi7jygtVPXKc8QA */
    id: "todo",
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
          sendParent((context) => ({ type: "TODO.COMMIT", todo: context })),
        ],
      },
      DELETE: "deleted",
      EDIT: "editing",
    },
    states: {
      idle: {
        on: {
          TOGGLE_COMPLETE: {
            target: "idle",
            actions: sendParent((context) => ({
              type: "TODO.MARK",
              todo: context,
            })),
          },
          EDIT: {
            target: "editing",
          },
          DELETE: {
            target: "deleted",
          },
        },
      },
      editing: {
        on: {
          COMMIT: [
            {
              target: "idle",
              actions: sendParent((context, event) => ({
                type: "TODO.COMMIT",
                todo: context,
                name: event.value,
              })),
            },
          ],
        },
      },
      deleted: {
        onEntry: sendParent((context) => ({
          type: "TODO.DELETE",
          id: context.id,
        })),
      },
    },
  });
