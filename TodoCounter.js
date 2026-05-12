/**
 * ============================================================
 * TodoCounter.js
 * ============================================================
 * Displays the total number of tasks and how many are completed.
 *
 * Props:
 *   todos {Array} – array of todo objects
 * ============================================================
 */

import React from 'react';

export default function TodoCounter({ todos }) {
  const total     = todos.length;
  const completed = todos.filter(t => t.completed).length;

  return (
    <div className="counter-bar" aria-live="polite">
      <span>{total} {total === 1 ? 'task' : 'tasks'}</span>
      <span className="counter-sep">·</span>
      <span>{completed} completed</span>
    </div>
  );
}
