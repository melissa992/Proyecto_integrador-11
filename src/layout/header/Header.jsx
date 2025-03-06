import { NavLink } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="perfil" end>
          Perfil
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
