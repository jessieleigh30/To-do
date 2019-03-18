import React, { Component } from 'react';
import TodoList from './components/TodoList';
import { Container } from 'semantic-ui-react';
import TodoForm from './components/TodoForm';
import axios from "axios";

class App extends Component {
  state = { todos: [],};

  componentDidMount() {
    // TODO make a call to our rails server to get Items
    axios.get("/api/items")
      .then( res => {
        this.setState({ todos: res.data })
      })
      .catch( err => {
        console.log(err);
      })
  }

  addItem = (name) => {
    //TODO make api call to rails server
    // TODO update state with new todo
   
   axios.post("api/items", { name })
    .then( res => {
      const { todos } = this.state;
      this.setState({ todos: [...todos, res.data],})
    })
  }

  updateItem = (id) => {
    axios.put(`/api/items/${id}`)
      .then( res => {
        const todos = this.state.todos.map( t => {
        if (t.id === id)
          return res.data;
        return t;
      });
      this.setState({ todos, });
    })
  }

  deleteItem = (id) => {
    axios.delete(`/api/items/${id}`)
      .then( res => {
        const { todos, } = this.state;
        this.setState({ todos: todos.filter(t => t.id !== id), })
      })
  }

  render() {
    return (
      <Container>
        <h1>Todo List</h1>
        <TodoForm addItem={this.addItem}/>
        <br/>
        <br/>
        <TodoList 
        todos={this.state.todos} 
        updateItem={this.updateItem}
        deleteItem={this.deleteItem}
        />
      </Container>
    );
  }
}

export default App;
