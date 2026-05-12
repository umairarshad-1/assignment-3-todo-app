/**
 * ============================================================
 * TodoItem.js
 * ============================================================
 * Renders a single todo row:
 *   – task text (click to toggle complete, double-click to edit)
 *   – delete button
 *
 * Props:
 *   todo     {Object}   – { id, text, completed }
 *   onToggle {Function} – callback(id)
 *   onDelete {Function} – callback(id)
 *   onEdit   {Function} – callback(id, newText)
 * ============================================================
 */

import React, { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // Local state: controls whether we are in "edit mode"
  const [isEditing, setIsEditing]   = useState(false);
  const [editValue, setEditValue]   = useState(todo.text);

  /** Save the edited text and exit edit mode */
  const commitEdit = () => {
    onEdit(todo.id, editValue);   // fire parent callback ← child→parent
    setIsEditing(false);
  };

  /** Cancel edit: restore original text */
  const cancelEdit = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  { e.preventDefault(); commitEdit(); }
    if (e.key === 'Escape') { cancelEdit(); }
  };

  return (
    <li className={`task-item${todo.completed ? ' completed' : ''}`}>

      {isEditing ? (
        /* ── EDIT MODE ── */
        <>
          <input
            type="text"
            className="task-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={120}
          />
          <button className="btn-save" onClick={commitEdit}>Save</button>
        </>
      ) : (
        /* ── DISPLAY MODE ── */
        <span
          className="task-text"
          onClick={() => onToggle(todo.id)}          /* click → toggle */
          onDoubleClick={() => setIsEditing(true)}   /* double-click → edit */
          title="Click to toggle · Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {/* Delete button – calls onDelete callback (child→parent) */}
      <button
        className="btn btn-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ✕
      </button>

    </li>
  );
}
