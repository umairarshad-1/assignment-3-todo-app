/**
 * ============================================================
 * TodoList.js
 * ============================================================
 * Renders the ordered list of TodoItem components.
 *
 * Props:
 *   todos    {Array}    – array of todo objects
 *   onToggle {Function} – callback(id) to toggle completion
 *   onDelete {Function} – callback(id) to delete a task
 *   onEdit   {Function} – callback(id, newText) to edit a task
 * ============================================================
 */

import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <ul className="task-list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}  {/* pass callback as prop */}
          onDelete={onDelete}  {/* pass callback as prop */}
          onEdit={onEdit}      {/* pass callback as prop */}
        />
      ))}
    </ul>
  );
}
