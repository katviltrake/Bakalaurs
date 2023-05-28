import { createMachine, sendParent } from "xstate";

export const createTaskMachine = ({ id, name, completed }) =>
  createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCGsDWBiAogEQEkAVAbQAYBdRUABwHtYBLZRugO2pAA9EAmADn4A6MgE4AzAEYALAHZR0svzkA2aQBoQAT0SSJQ8QICsk3uPlHRR-rwC+tzWkxY8OADI4iOclSQh6TCzsnDwI5tJCKvxqRiqS8oLi0iqaOgh64gYC0hImsmTSvLKy9o7oGEKMEAA2YFhEAPIA4k0eAPoAwg0AsgAKHl4+nAHMrBx+ofJC0tJGsrxyBbJGOUapuopCRry8ktHKkiqi-KUgThWQo2xQWF3d3cRDfiNB46ChpryR4tZmhzKWDTaPiyYSzFQqXhRfiiUxGH72BwgNh0CBwTjnYYMUbBCaIAC00mEZn4khMAgkZEk4nE6wQ8JE0nEVP2x0URWkp3OlRqYCxgTGIUQZDpCzIXPKQkuLGu-Jxb24wrp4WmMN+ZDishUWolmCEaNqyEgcteQoQ+LIQhJZNMMOZ1IEdKZmX4Rm2RjE8yOC0RtiAA */
    id: "task",
    initial: "idle",
    context: {
      id,
      name,
      completed: completed,
    },
    on: {
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
