import { useEffect, useMemo, useState } from "react";
import "./TodosPage.css";

export default function TodosPage() {
  const days = useMemo(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);

  const todayLabel = useMemo(() => {
    const d = new Date();
    return days[d.getDay()];
  }, [days]);

  const [newTodoText, setNewTodoText] = useState("");
  const [isPriority, setIsPriority] = useState(false);

  const [selectedDay, setSelectedDay] = useState(() => {
    return localStorage.getItem("eh_selectedDay") || todayLabel;
  });

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("eh_filter") || "all";
  });

  const [todosByDay, setTodosByDay] = useState(() => {
    const saved = localStorage.getItem("eh_todosByDay");
    if (saved) return JSON.parse(saved);

    return {
      Sun: [],
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
    };
  });

  useEffect(() => {
    localStorage.setItem("eh_todosByDay", JSON.stringify(todosByDay));
  }, [todosByDay]);

  useEffect(() => {
    localStorage.setItem("eh_selectedDay", selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem("eh_filter", filter);
  }, [filter]);

  function handleAddTodo() {
    if (!newTodoText.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      priority: isPriority,
    };

    setTodosByDay((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newTodo],
    }));

    setNewTodoText("");
    setIsPriority(false);
  }

  function handleToggleTodo(id) {
    setTodosByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  }

  function handleDeleteTodo(id) {
    setTodosByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((t) => t.id !== id),
    }));
  }

  const visibleTodos = todosByDay[selectedDay].filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <section>
      <h1 className="pageTitle">Todos</h1>

      <div className="pageWrap">
        <div className="weekLayout">
          {/* LEFT PANEL */}
          <div className="todoCard leftPanel">
            <div className="leftTop">
              <div className="listHeader">
                <h2 className="cardTitle">{selectedDay}</h2>
                <span className="pill">{todosByDay[selectedDay].length}</span>
              </div>

              <form
                className="todoForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTodo();
                }}
              >
                <input
                  className="todoInput"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                />

                <button type="submit" className="primaryBtn">
                  Add
                </button>

                <button
                  type="button"
                  className={isPriority ? "prioBtn active" : "prioBtn"}
                  onClick={() => setIsPriority((p) => !p)}
                >
                  Priority
                </button>
              </form>
            </div>

            <ul className="todoList">
              {visibleTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.priority ? "todoRow priority" : "todoRow"}
                >
                  <span
                    onClick={() => handleToggleTodo(todo.id)}
                    className={todo.completed ? "todoText done" : "todoText"}
                  >
                    {todo.completed ? "☑" : "☐"} {todo.text}
                  </span>

                  <button
                    type="button"
                    className="ghostBtn"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}

              {visibleTodos.length === 0 && (
                <li className="emptyState">nothing here yet.</li>
              )}
            </ul>

            <div className="leftBottom">
              <div className="filterRow">
                <button onClick={() => setFilter("all")} className="chipBtn">
                  All
                </button>
                <button onClick={() => setFilter("completed")} className="chipBtn">
                  Completed
                </button>
                <button onClick={() => setFilter("incomplete")} className="chipBtn">
                  Incomplete
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="weekPanel">
            <div className="weekBoard">
              {days.map((day) => (
                <div
                  key={day}
                  className={day === selectedDay ? "dayCol active" : "dayCol"}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="dayHead">
                    <strong>{day}</strong>
                    <span className="pill">{todosByDay[day].length}</span>
                  </div>

                  <ul className="miniList">
                    {todosByDay[day].slice(0, 8).map((t) => (
                      <li
                        key={t.id}
                        className={
                          t.priority
                            ? t.completed
                              ? "miniItem priority done"
                              : "miniItem priority"
                            : t.completed
                            ? "miniItem done"
                            : "miniItem"
                        }
                      >
                        {t.text}
                      </li>
                    ))}

                    {todosByDay[day].length === 0 && (
                      <li className="miniEmpty">empty</li>
                    )}

                    {todosByDay[day].length > 8 && (
                      <li className="miniMore">
                        +{todosByDay[day].length - 8} more
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
