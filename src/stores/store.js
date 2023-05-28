import { createContext, useContext } from "react";
import taskStore from "./taskStore";

const store = {
  taskStore: taskStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export default store;
