import { NavLink } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/inicio" end>
          Inicio
        </NavLink>
        <NavLink to="corazon" end>
          El corazón
        </NavLink>
        <NavLink to="enfermedades" end>
          Enfermedades
        </NavLink>
        <NavLink to="quiz" end>
          Quiz
        </NavLink>

        <NavLink to="/" end className={"cerrar-sesion-link"}>
          Cerrar Sesión
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
