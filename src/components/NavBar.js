import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 12 }}>
      <div>Todo App</div>

      <nav style={{ display: "flex", gap: 12 }}>
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}
