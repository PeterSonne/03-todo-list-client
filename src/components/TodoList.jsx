import React from "react";

class TodoList extends React.Component {
  state = {
    todos: [
      { _id: 1, name: "abc" },
      { _id: 2, name: "cba" }
    ]
  };
  render() {
    return (
      <div className="layout">
        <h1>ToDo List.</h1>
        <div className="list">
          <form>
            <input type="text" placeholder="Add Item..." />
            <button>
              <i className="fas fa-plus"></i>
            </button>
          </form>
          <ul>
            {this.state.todos.map(e => (
              <li key={e._id} className={e.done ? "done" : ""}>
                {e.name} <i className="fas fa-minus-circle" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
