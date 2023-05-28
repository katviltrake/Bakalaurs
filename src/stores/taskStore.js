import { makeAutoObservable } from "mobx";

const taskStore = () => {
  return makeAutoObservable({
    tasks: [{ id: 1, name: "Bakalaurs", completed: false }],
  });
};

export default taskStore;
