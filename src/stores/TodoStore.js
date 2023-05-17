import { makeAutoObservable } from "mobx";

const todoStore = () => {
  return makeAutoObservable({
    tasks: [{ id: 1, name: "Bakalaurs", completed: false }],
  });
};

export default todoStore;
