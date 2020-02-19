import React from "react";
// import BasicReactComponent from "./components/BasicReactComponent";
import TodoList from "./components/TodoList.jsx";
import "./styles/style.css";

class App extends React.Component {
  render() {
    return (
      <>
        <TodoList></TodoList>
        <img
          src="https://portal.tortugacoders.com/media/katas/03/todo-02.png"
          className="overlayImg"
          width="644"
          alt="sth"
        />
      </>
    );
  }
}

export default App;
