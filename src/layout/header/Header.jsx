import { NavLink } from "react-router";
import "./Header.css";
import logo from "/public/cm.png"; // Ajusta la ruta al ícono según tu estructura

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="CM Software" className="logo" />
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="perfil" end>
          Perfil
        </NavLink>
        <NavLink to="/" end>
          Quiz
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
