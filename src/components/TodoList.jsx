import React from "react";
import axios from "axios";

class TodoList extends React.Component {
  state = {
    todos: []
  };
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API + "/items")
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => console.log(err));
  }
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
