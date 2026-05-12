/**
 * ============================================================
 * TodoForm.js
 * ============================================================
 * Renders the input field + "Add" button.
 * Handles its own local input state; calls onAdd(text) to
 * send the value up to the parent (App).
 *
 * Props:
 *   onAdd  {Function}  – callback invoked with the new task text
 * ============================================================
 */

import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  // Local state: controlled input
  const [inputValue, setInputValue] = useState('');

  /** Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();             // prevent page reload
    onAdd(inputValue);              // fire parent callback ← child→parent communication
    setInputValue('');              // clear the field
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className="task-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        maxLength={120}
        autoComplete="off"
        aria-label="New task input"
      />
      <button
        type="submit"
        className="btn btn-add"
        aria-label="Add task"
      >
        +
      </button>
    </form>
  );
}
