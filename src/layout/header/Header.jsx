import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";


const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <header>
      <nav>
        <img src="/cm.png" alt="CM Software" className="logo" />
        <NavLink to="/inicio" end className="navlink">
          Inicio
        </NavLink>
        <div className="dropdown">
          <span>Enfermedades</span>
          <div className="dropdown-content">
            <NavLink to="arritmia" end className="navlink">
              Arritmia
            </NavLink>
            <NavLink to="fibrilacion" end className="navlink">
              Fibrilación
            </NavLink>
          </div>
        </div>
        <NavLink to="quiz" end className="navlink">
          Quiz Interactivo
        </NavLink>
        <NavLink to="sobre-nosotros" end className="navlink">
          Sobre nosotros
        </NavLink>
        <NavLink
          to="/iniciar-sesion"
          end
          className="navlink iniciar-sesion"
          onClick={handleLogin}
        >
          Iniciar Sesión / Registrarse
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
