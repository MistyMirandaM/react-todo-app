import { useState } from "react";

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
    return true; // "all"
});

  return (
    <section>
      <h1>Todos</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, border: "1px solid #ccc", padding: "12px" }}>
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

        <div style={{ flex: 1, border: "1px solid #ccc", padding: "12px" }}>
          <h2>Todo List</h2>

          <ul>
            {visibleTodos.map((todo) => (
              <li key={todo.id}>
                <span
                onClick={() => handleToggleTodo(todo.id)}
                style={{
                    cursor: "pointer",
                    textDecoration: todo.completed ? "line-through" : "none",
                }}
                >
                {todo.completed ? "☑" : "☐"} {todo.text}
                </span>

                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Filter:</p>
       <button onClick={() => setFilter("all")}>All</button>
       <button onClick={() => setFilter("completed")}>Completed</button>
       <button onClick={() => setFilter("incomplete")}>Incomplete</button>

      </div>
    </section>
  );
}
