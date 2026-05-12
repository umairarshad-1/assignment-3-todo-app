# Assignment 3 – Interactive Todo List App

## Folder Structure

```
assignment-3/
├── vanilla-todo/          ← Part A
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── react-todo/            ← Part B
    ├── package.json       ← created by CRA (see setup below)
    └── src/
        ├── index.js
        ├── App.js
        ├── App.css
        └── components/
            ├── TodoForm.js
            ├── TodoList.js
            ├── TodoItem.js
            └── TodoCounter.js
```

---

## Part A – Vanilla JS (run locally)

1. Open `vanilla-todo/index.html` directly in any browser.
   No build step needed.

---

## Part B – React (Create React App)

```bash
# 1. Scaffold a new CRA project
npx create-react-app react-todo
cd react-todo

# 2. Replace src/ with the provided files:
#    src/index.js
#    src/App.js
#    src/App.css
#    src/components/TodoForm.js
#    src/components/TodoList.js
#    src/components/TodoItem.js
#    src/components/TodoCounter.js

# 3. Start the dev server
npm start
```

The app will open at http://localhost:3000

---

## Requirements Checklist

### Part A (7 marks)
| Feature | ✔ |
|---|---|
| Add task (form + input) | ✔ |
| Display tasks dynamically | ✔ |
| Delete task button | ✔ |
| Mark complete (strikethrough) | ✔ |
| Task counter (total & completed) | ✔ |
| localStorage persistence | ✔ |
| Clear All with confirmation | ✔ |
| **BONUS** Double-click to edit | ✔ |

Technical: `getElementById`, `querySelector`, `createElement`, `appendChild`,
`classList.add/remove`, `localStorage` (set/get/remove), `console.log`, `submit` + `click` events, event delegation.

### Part B (8 marks)
| Feature | ✔ |
|---|---|
| `npx create-react-app` setup | ✔ |
| `TodoForm` component | ✔ |
| `TodoList` component | ✔ |
| `TodoItem` component | ✔ |
| `TodoCounter` component | ✔ |
| `useState` for todos in App | ✔ |
| Props + callback functions | ✔ |
| `useEffect` (load, dep `[]`) | ✔ |
| `useEffect` (save, dep `[todos]`) | ✔ |
| External CSS (`App.css`) | ✔ |
"# assignment-3-todo-app" 
