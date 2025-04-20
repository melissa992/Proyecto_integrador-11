import { NavLink } from "react-router";
import "./Header.css";
import logo from "/public/cm.png"; // Ajusta la ruta al ícono según tu estructura

const Header = () => {
  return (
    <header>
      <nav>

        <NavLink to="/inicio" end>

        <img src={logo} alt="CM Software" className="logo" />
        <NavLink to="/" end>
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
