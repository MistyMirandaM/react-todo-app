import { useState } from "react";
import "./TodosPage.css";

export default function TodosPage() {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddTodo() {
    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  }

  function handleDeleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function handleToggleTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; // all
  });

  return (
    <section>
      <h1>Todos</h1>

      <div className="todoLayout">
        {/* LEFT SIDE */}
        <div className="todoBox">
          <h2>New Todo Form</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTodo();
            }}
          >
            <input
              type="text"
              placeholder="Enter a new todo..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="todoBox">
          <h2>Todo List</h2>

          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {visibleTodos.map((todo) => (
              <li key={todo.id} className="todoRow">
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  className={todo.completed ? "todoText done" : "todoText"}
                >
                  {todo.completed ? "☑" : "☐"} {todo.text}
                </span>

                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </li>
            ))}

            {visibleTodos.length === 0 && (
              <li style={{ padding: "8px 0", opacity: 0.7 }}>
                No todos to show.
              </li>
            )}
          </ul>

          <div className="filterRow">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("incomplete")}>Incomplete</button>
          </div>
        </div>
      </div>
    </section>
  );
}
