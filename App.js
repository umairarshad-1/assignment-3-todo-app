/**
 * ============================================================
 * REACT TODO APP  –  App.js  (Parent Component)
 * Assignment 3 – Part B
 * ============================================================
 *
 * Technical requirements satisfied here:
 *  ✔ useState  – manages the todos array
 *  ✔ useEffect – load from localStorage on mount  (dep: [])
 *  ✔ useEffect – save to localStorage on change   (dep: [todos])
 *  ✔ Callback props passed to children (onAdd, onDelete, onToggle, onEdit)
 * ============================================================
 */

import React, { useState, useEffect } from 'react';

import TodoForm    from './components/TodoForm';
import TodoList    from './components/TodoList';
import TodoCounter from './components/TodoCounter';

import './App.css';

// Key used in localStorage
const STORAGE_KEY = 'react_todo_tasks_v1';

// Helper: generate a simple unique id
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export default function App() {
  // ── State: todos array ──────────────────────────────────────
  // Each todo: { id: string, text: string, completed: boolean }
  const [todos, setTodos] = useState([]);

  // ── useEffect #1 : Load todos from localStorage on mount ────
  // Empty dependency array [] means this runs ONCE after the
  // first render (equivalent to componentDidMount).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setTodos(parsed);
      console.log(`[ReactTodo] Loaded ${parsed.length} task(s) from localStorage.`);
    }
  }, []); // <-- empty array: run only on mount

  // ── useEffect #2 : Save todos to localStorage on every change
  // Runs whenever the todos array changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    console.log(`[ReactTodo] Saved ${todos.length} task(s) to localStorage.`);
  }, [todos]); // <-- [todos]: run whenever todos updates

  // ── Callback: Add a new todo ────────────────────────────────
  // Passed to TodoForm as the onAdd prop
  const handleAdd = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = { id: generateId(), text: trimmed, completed: false };
    setTodos(prev => [...prev, newTodo]);
  };

  // ── Callback: Toggle completed state ────────────────────────
  // Passed down as onToggle prop
  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ── Callback: Delete a todo ──────────────────────────────────
  // Passed down as onDelete prop
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // ── Callback: Edit a todo's text (Bonus) ────────────────────
  // Passed down as onEdit prop
  const handleEdit = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  };

  // ── Callback: Clear all todos ────────────────────────────────
  const handleClearAll = () => {
    if (todos.length === 0) return;
    const confirmed = window.confirm(
      `Delete all ${todos.length} task(s)? This cannot be undone.`
    );
    if (confirmed) {
      setTodos([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="app-wrapper">

      {/* ── Header ── */}
      <header className="app-header">
        <h1 className="app-title">TASKS<span className="dot">.</span></h1>
        <p className="app-subtitle">Stay focused. Ship it.</p>
      </header>

      {/* ── TodoForm: passes onAdd callback ── */}
      <TodoForm onAdd={handleAdd} />

      {/* ── TodoCounter: shows totals ── */}
      <TodoCounter todos={todos} />

      {/* ── TodoList: passes onToggle, onDelete, onEdit callbacks ── */}
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* ── Empty state ── */}
      {todos.length === 0 && (
        <p className="empty-state">No tasks yet — add one above ↑</p>
      )}

      {/* ── Clear all ── */}
      <button
        className="btn btn-clear"
        onClick={handleClearAll}
        aria-label="Clear all tasks"
      >
        Clear All
      </button>

    </div>
  );
}
