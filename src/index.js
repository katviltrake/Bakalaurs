import React, { createContext } from "react";
import { TodoStore } from "./stores/TodoStore";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const StoreContext = createContext < TodoList > {};
export const StoreProvider = StoreContext.Provider;

const todoList = new TodoStore([
  "Should Starting Writing in React",
  "Should Learn MobX",
  "Should Watch Once Piece :)",
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider value={todoList}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

export const useStore = () => useContext(StoreContext);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
