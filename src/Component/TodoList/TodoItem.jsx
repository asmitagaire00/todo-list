import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, updatedTodo, deletedTodo }) {
  const { id, text, done } = todo; //destructuring each items.

  const handleCompletedItem = () => {
    updatedTodo({ id, text, done: !done });
  };

  const handleDeletedItem = () => {
    deletedTodo({ id: id, text, done });
  };

  return (
    <div className="todoItem">
      <div className="todoItem__details">
        <p className={done ? 'todoItem__text--done' : 'todoItem__text'}>
          {id}. {text}
        </p>
        <div className="todoItem__buttons">
          <button className="completed__button" onClick={handleCompletedItem}>
            {todo.done ? '✅' : '✔️'}
          </button>
          <button className="deleted__button" onClick={handleDeletedItem}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
