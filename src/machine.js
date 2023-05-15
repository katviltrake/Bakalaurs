//  initial: [{ id: 1, name: "Bakalaurs", completed: false }],
import { createMachine, assign, sendParent } from "xstate";

export const createTodoMachine = ({ id, title, completed }) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUGIAqB5A4vgDICiA+gMK4CyACqdiQNoAMAuoqAA6qwCWyPqgB2nEAA9EAJgBsAdgB0ADhYAWeXM1yAnHNmqANCACeiOTJYKZU1doCM23UqlSArEoC+Ho2gyYAIiQMzOxiPPyCImKSCNZGpghKdgquLGksdq4yqgDM5s5ePuioCgBOYACGEHzCUJgAyiTYlDT0TST+rBxIIOECQqI9MapKSinaeTlO2koymfGIrg5WMqt2LHI5bnqqhSC+JeVVNXV4hKQtdMFdYbz9UUOIqnJjFhOuHx-aqq5SCwhTVQrVY5HJ2JRgiZyPYHMqVaq1BpNMgAQQo2AAkgA1ELdbh3SKDUAxVIyFJSHKqKRqUYWUb-WTaYEyD4yUFJVww4pw46IjoY7A3Hp9QnRRBbIGqFjWKnU2zZJT-UFMmUTcGrFls6HefbcyD9REUAASKIAcvhcbcIgMxYlLFT1c8sno5n8TOKtgpbI4XI53EtzFyMAp9YJDTRqAKhfjrQ9idIwQpHI5nDk5iwsor3QhcmSlHJbFJRt9XCNtUVg6GTpgqNRI4K7HjegSbY8EBTksmZhT05mGSwpAobMmi2o7DogyUq4iAEJEACqACVo83Y0SJAnO8nU72ZFmEq5KQo7MO3NoXKpVHZJyHqmG6hQzRQgiuRa34+3E12d+s+9m2ckeSFlI2ipKClJeDqwjoHAYgHFa9zrjEdiGNmAC0ZLpFh2EDteOqwkcCJQAhoptr8ySjFIOhyBm6hTNo-zZCqqzuM4SSgXYeEVlOd4nCR74brEboJLkQIFj6aQUgWUq7Ph3IQGAAA2YDIJA-FxoJAbHlkbhsqWUjjvuiB2Nkx4alKsy5HYlJSJBHhAA */
      id: "todo",
      initial: "reading",
      context: {
        id,
        title,
        prevTitle: title,
        completed,
      },
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            assign({ completed: true }),
            sendParent((context) => ({ type: "TODO.COMMIT", todo: context })),
          ],
        },
        DELETE: "deleted",
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
              actions: [assign({ completed: true }), "commit"],
            },
            TOGGLE_COMPLETE: {
              actions: [
                assign({ completed: (context) => !context.completed }),
                "commit",
              ],
            },
            SET_ACTIVE: {
              actions: [assign({ completed: false }), "commit"],
            },
            EDIT: {
              target: "editing",
              actions: "focusInput",
            },
          },
        },
        editing: {
          entry: assign({ prevTitle: (context) => context.title }),
          on: {
            CHANGE: {
              actions: assign({
                title: (_, event) => event.value,
              }),
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context) => ({
                  type: "TODO.COMMIT",
                  todo: context,
                })),
                cond: (context) => context.title.trim().length > 0,
              },
              { target: "deleted" },
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
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: "TODO.COMMIT",
          todo: context,
        })),
        focusInput: () => {},
      },
    }
  );
