/**
 * ============================================================
 * VANILLA JS TODO LIST MANAGER
 * Assignment 3 – Part A
 * ============================================================
 *
 * Technical requirements used:
 *  ✔ document.getElementById()  & querySelector()
 *  ✔ createElement()  & appendChild()
 *  ✔ classList.add()  & classList.remove()
 *  ✔ localStorage.setItem(), getItem(), removeItem()
 *  ✔ console.log() for debugging
 *  ✔ Event listeners: submit (form) + click (event delegation)
 *  ✔ BONUS: double-click to edit task text
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// 1. ELEMENT REFERENCES
//    Using both getElementById() and querySelector() as required
// ─────────────────────────────────────────────────────────────
const todoForm      = document.getElementById('todo-form');       // getElementById
const taskInput     = document.getElementById('task-input');      // getElementById
const taskList      = document.getElementById('task-list');        // getElementById
const totalCount    = document.getElementById('total-count');     // getElementById
const completedCount= document.getElementById('completed-count'); // getElementById
const clearAllBtn   = document.getElementById('clear-all-btn');   // getElementById
const emptyState    = document.querySelector('#empty-state');     // querySelector

// ─────────────────────────────────────────────────────────────
// 2. STATE
//    In-memory array is always kept in sync with localStorage
// ─────────────────────────────────────────────────────────────
const STORAGE_KEY = 'todo_tasks_v1';

/**
 * Load tasks from localStorage.
 * Returns an array of task objects: { id, text, completed }
 */
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY); // localStorage.getItem()
  const tasks = raw ? JSON.parse(raw) : [];
  console.log(`[TodoApp] Loaded ${tasks.length} task(s) from localStorage.`); // console.log ✔
  return tasks;
}

/** Save the tasks array to localStorage */
function saveToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); // localStorage.setItem()
}

/** Remove ALL tasks from localStorage */
function clearStorage() {
  localStorage.removeItem(STORAGE_KEY); // localStorage.removeItem()
}

// Initialise state
let tasks = loadFromStorage();

// ─────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────

/** Generate a simple unique id */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Update the counter bar with current task counts */
function updateCounter() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  totalCount.textContent     = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  completedCount.textContent = `${completed} completed`;
}

/** Show or hide the empty-state message */
function toggleEmptyState() {
  if (tasks.length === 0) {
    emptyState.classList.add('visible');      // classList.add()
  } else {
    emptyState.classList.remove('visible');   // classList.remove()
  }
}

/** Persist + refresh UI */
function syncState() {
  saveToStorage(tasks);
  updateCounter();
  toggleEmptyState();
}

// ─────────────────────────────────────────────────────────────
// 4. RENDER A SINGLE TASK ITEM
//    Using createElement() and appendChild() as required
// ─────────────────────────────────────────────────────────────
/**
 * Builds and returns an <li> element for a task.
 * @param {{ id: string, text: string, completed: boolean }} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
  // ── <li class="task-item [completed]"> ──────────────────
  const li = document.createElement('li');       // createElement()
  li.classList.add('task-item');
  li.dataset.id = task.id;
  if (task.completed) li.classList.add('completed');  // classList.add()

  // ── Task text <span> ─────────────────────────────────────
  const textSpan = document.createElement('span');   // createElement()
  textSpan.classList.add('task-text');
  textSpan.textContent = task.text;
  textSpan.title = 'Click to toggle · Double-click to edit';

  // ── Delete button <button> ───────────────────────────────
  const deleteBtn = document.createElement('button'); // createElement()
  deleteBtn.classList.add('btn', 'btn-delete');
  deleteBtn.textContent = '✕';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.dataset.action = 'delete'; // used by event delegation

  // ── Assemble: li ← textSpan, deleteBtn ──────────────────
  li.appendChild(textSpan);   // appendChild()
  li.appendChild(deleteBtn);  // appendChild()

  return li;
}

/** Render all tasks from the tasks array into the <ul> */
function renderTasks() {
  // Clear existing list items
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);  // appendChild()
  });

  syncState();
}

// ─────────────────────────────────────────────────────────────
// 5. TASK OPERATIONS
// ─────────────────────────────────────────────────────────────

/** Add a new task */
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTask = {
    id:        generateId(),
    text:      trimmed,
    completed: false,
  };

  tasks.push(newTask);
  console.log('[TodoApp] Task added:', newTask); // debugging console.log ✔
  renderTasks();
}

/** Toggle the completed state of a task by id */
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  console.log(`[TodoApp] Toggled task ${id}`);
  renderTasks();
}

/** Delete a task by id */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  console.log(`[TodoApp] Deleted task ${id}`);
  renderTasks();
}

/** Clear all tasks (called after user confirmation) */
function clearAll() {
  tasks = [];
  clearStorage(); // localStorage.removeItem()
  renderTasks();
  console.log('[TodoApp] All tasks cleared.');
}

// ─────────────────────────────────────────────────────────────
// 6. BONUS: INLINE EDITING (double-click on task text)
// ─────────────────────────────────────────────────────────────
/**
 * Replaces a task's <span> with an <input> for inline editing.
 * A "Save" button is also appended; pressing Enter also saves.
 * @param {HTMLLIElement} li – the parent list item
 * @param {string} id        – task id
 */
function startEditing(li, id) {
  const textSpan = li.querySelector('.task-text');
  const task     = tasks.find(t => t.id === id);
  if (!task) return;

  // Hide the span
  textSpan.style.display = 'none';

  // Create inline <input>
  const input = document.createElement('input');   // createElement()
  input.type = 'text';
  input.value = task.text;
  input.classList.add('task-edit-input');
  input.maxLength = 120;

  // Create "Save" button
  const saveBtn = document.createElement('button'); // createElement()
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('btn-save');
  saveBtn.setAttribute('aria-label', 'Save edit');

  li.insertBefore(input, textSpan.nextSibling);  // insert after hidden span
  li.insertBefore(saveBtn, li.querySelector('.btn-delete')); // before delete btn

  input.focus();
  input.select();

  /** Commit the edited text */
  function commitEdit() {
    const newText = input.value.trim();
    if (newText) {
      tasks = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
      console.log(`[TodoApp] Edited task ${id}:`, newText);
    }
    renderTasks(); // re-render restores the span automatically
  }

  // Save on button click
  saveBtn.addEventListener('click', commitEdit);

  // Save on Enter key; Escape cancels
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); commitEdit(); }
    if (e.key === 'Escape') { renderTasks(); } // cancel – re-render original
  });
}

// ─────────────────────────────────────────────────────────────
// 7. EVENT LISTENERS
// ─────────────────────────────────────────────────────────────

/**
 * 7a. FORM SUBMIT – adds a new task.
 *     Fulfills the "submit" event listener requirement.
 */
todoForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent page reload
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

/**
 * 7b. TASK LIST – event delegation for click + dblclick.
 *     One listener handles ALL task interactions via event delegation,
 *     checking e.target to decide what happened.
 */
taskList.addEventListener('click', function (e) {
  const li = e.target.closest('.task-item');
  if (!li) return;
  const id = li.dataset.id;

  // Delete button clicked
  if (e.target.closest('.btn-delete')) {
    deleteTask(id);
    return;
  }

  // Task text clicked → toggle complete
  if (e.target.classList.contains('task-text')) {
    toggleTask(id);
  }
});

/**
 * 7c. DOUBLE-CLICK on task text → start inline edit (Bonus)
 */
taskList.addEventListener('dblclick', function (e) {
  if (!e.target.classList.contains('task-text')) return;
  const li = e.target.closest('.task-item');
  if (!li) return;
  startEditing(li, li.dataset.id);
});

/**
 * 7d. CLEAR ALL button – asks for confirmation first.
 */
clearAllBtn.addEventListener('click', function () {
  if (tasks.length === 0) return; // nothing to clear
  const confirmed = window.confirm(
    `Are you sure you want to delete all ${tasks.length} task(s)? This cannot be undone.`
  );
  if (confirmed) clearAll();
});

// ─────────────────────────────────────────────────────────────
// 8. INITIAL RENDER
// ─────────────────────────────────────────────────────────────
renderTasks(); // paint tasks loaded from localStorage on page load
