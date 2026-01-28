import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="nav">
      <div className="navInner">
        <div className="navBrand">Eh, I’ll Do It</div>

        <nav className="navLinks">
          <NavLink
            to="/todos"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Todos
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Contact
          </NavLink>
        </nav>

        <div /> 
      </div>
    </header>
  );
}
