import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, updatedTodo, deletedTodo }) {
  return (
    <div className="todoList">
      {/* render each todo  */}
      {todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={index}
            updatedTodo={updatedTodo}
            deletedTodo={deletedTodo}
          />
        );
      })}
    </div>
  );
}

export default TodoList;
