import React, { useState } from 'react';
import './App.css';
import TodoList from '../TodoList/TodoList';

function App() {
  const [todoText, setTodoText] = useState(''); //todoText:value from the input element i.e one todo item, setTodoText: changed state of todoText i.e everytime user add new todo and/or change input value.
  const [todos, setTodos] = useState([]); //todos:todoText(todo items) list , setTodos: once the list is changed we update the list through setTodos
  const [id, setId] = useState(1); // each todoText ids
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); //index state for todo, complete and all buttons.

  //todoText from input element
  const handleTodoText = (event) => {
    setTodoText(event.target.value);
  };

  //to add all todo in todos list.
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoText !== '' || event.keyCode === 13) {
      setId(id + 1);
      setTodos([...todos, { id, text: todoText, done: false }]); //set todos with new todos.
      setFilteredTodos([...todos, { id, text: todoText, done: false }]); //set todos with new todos.
      setTodoText(''); //set the input value to empty after todo are added.
    }
  };

  //get changed todo(todo.done state changed) from child and update in parent todos.
  const updatedTodoFromChild = (updateTodo) => {
    // console.log('todos', todos);
    const filterDefaultTodos = todos.filter((todo) => !todo.done);
    const newTodos = filterDefaultTodos.map((todo) => {
      if (todo.id === updateTodo.id) {
        todo.done = updateTodo.done;
      }
      return todo;
    });
    // setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  // deleted todo from child and updated in parents todos.
  const deletedTodoFromChild = (deleteTodo) => {
    const undeletedTodos = todos.filter((todo) => todo.id !== deleteTodo.id);
    setTodos(undeletedTodos);
    setFilteredTodos(undeletedTodos);
  };

  //handle todo, complete and all buttons on click by changing state.
  const handleOnClick = (index) => {
    setActiveIndex(index);
    // filtered all new added and incomplete todo;
    if (index === 0) {
      const incompleteTodos = todos.filter((todo) => todo.done === false);
      const changeIncompleteTodos = incompleteTodos.map(
        (todo, index) => (todo.id = index + 1)
      );
      // console.log('changeIncompleteTodos', changeIncompleteTodos);
      setFilteredTodos(incompleteTodos);
    }
    //filtered all completed todo.
    else if (index === 1) {
      const completedTodos = todos.filter((todo) => todo.done === true);
      const changeCompletedTodos = completedTodos.map(
        (todo, index) => (todo.id = index + 1)
      );
      // console.log('changeCompletedTodos', changeCompletedTodos);
      setFilteredTodos(completedTodos);
    }
    //filtered all todos.
    else if (index === 2) {
      const changeTodos = todos.map((todo, index) => (todo.id = index + 1));
      console.log(changeTodos);
      setFilteredTodos(todos);
    }
  };

  // buttons initializaion and mapping to add css style.
  const buttons = ['Todo', 'Complete', 'All'];
  const button = buttons.map((element, index) => {
    return (
      <button
        key={index}
        onClick={() => handleOnClick(index)}
        className={activeIndex === index ? 'active' : 'inactive'}
      >
        {element}
      </button>
    );
  });

  return (
    <div className="app">
      <div className="main">
        <h1>Todo List</h1>
        <form className="input__container" onSubmit={handleAddTodo}>
          <input
            className="todoText__input"
            onChange={handleTodoText}
            placeholder="Enter your todo"
            value={todoText}
          />
          <button className="add__button" type="submit">
            Add
          </button>
        </form>
        {/* todo, complete and all buttons container. todo is set as default  */}
        <div className="buttons__container">{button}</div>
        <TodoList
          todos={filteredTodos}
          updatedTodo={updatedTodoFromChild}
          deletedTodo={deletedTodoFromChild}
        />
      </div>
    </div>
  );
}

export default App;
