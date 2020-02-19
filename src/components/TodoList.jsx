import React from "react";
import axios from "axios";

class TodoList extends React.Component {
  state = {
    todos: [],
    addInput: "",
    loading: true
  };
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API + "/items")
      .then(res => {
        setTimeout(() => {
          this.setState({
            todos: res.data,
            loading: false
          });
        }, 1200);
      })
      .catch(err => console.log(err));
  }
  inputChange = e => {
    this.setState({
      addInput: e.target.value
    });
  };
  addItem = e => {
    e.preventDefault();
    // do nothing if string is empty
    if (!this.state.addInput) {
      return false;
    } else {
      this.setState({ loading: true });
    }
    setTimeout(() => {
      // create Item in DB via API
      axios
        .post(process.env.REACT_APP_API + "/items", {
          name: this.state.addInput
        })
        .then(res => {
          // check if response is okay
          if (res.status !== 200 || !res.data._id) {
            console.log(`New Item could not be create!`);
            return false;
          }
          let todos = this.state.todos;
          todos.unshift(res.data);
          this.setState({ todos: todos, addInput: "", loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }, 1200);
  };
  changeItem = id => {
    // get Item out of Array
    let item = this.state.todos.find(e => e._id === id);
    // invert done state
    item.done = !item.done;
    // patch in DB via API
    axios
      .patch(`${process.env.REACT_APP_API}/items/${id}`, item)
      .then(res => {
        // check if response is okay
        if (
          res.status !== 200 ||
          res.data._id !== id ||
          res.data.done !== item.done
        ) {
          console.log(
            `Ups - something didn't work changing ${id}. Maybe there is public holidays in MongoLand?`
          );
          return false;
        }
        //update only the right item:
        let todos = this.state.todos.map(e => {
          if (e._id === res.data._id) {
            e = res.data;
          }
          return e;
        });
        this.setState({ todos });
        // check if state really was updated
        if (item.done !== this.state.todos.find(e => e._id === id).done) {
          console.log(`Error toggling status of ${id}`);
        }
      })
      .catch(err => console.log(err));
  };
  deleteItem = (e, id) => {
    e.stopPropagation();
    axios
      .delete(`${process.env.REACT_APP_API}/items/${id}`)
      .then(res => {
        // check if response is okay
        if (res.status !== 200 || res.data._id !== id) {
          console.log(
            `There was an Error trying to delete ${id}. Please contact your administrator and ask him`
          );
          return false;
        }
        // remove Item from todo-List in state
        let todos = this.state.todos.filter(e => e._id !== id);
        this.setState({ todos });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="layout">
        <h1>ToDo List.</h1>
        <div className="list">
          <form onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Add Item..."
              value={this.state.addInput}
              onChange={this.inputChange}
            />
            <button>
              <i className="fas fa-plus"></i>
            </button>
          </form>
          <div
            className="loader"
            style={{ display: this.state.loading ? "block" : "none" }}
          ></div>
          <ul>
            {this.state.todos.map(e => (
              <li
                key={e._id}
                className={e.done ? "done" : ""}
                onClick={event => this.changeItem(e._id)}
              >
                {e.name}{" "}
                <i
                  className="fas fa-minus-circle"
                  onClick={event => this.deleteItem(event, e._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
