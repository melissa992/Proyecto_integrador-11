import { NavLink } from "react-router";
import { useState } from "react"; // Importa useState para manejar el estado
import "./Header.css";
import logo from "/public/cm.png"; // Ajusta la ruta según tu estructura

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

  const handleLogout = () => {
    setIsAuthenticated(false); // Cambia el estado a no autenticado
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Cambia el estado a autenticado
  };

  return (
    <header>
      <nav>
        <img src={logo} alt="CM Software" className="logo" />
        <NavLink to="/inicio" end>
          Inicio
        </NavLink>
        <div className="dropdown">
          <span>Enfermedades</span>
          <div className="dropdown-content">
            <NavLink to="arritmia" end>
              Arritmia
            </NavLink>
            <NavLink to="fibrilacion" end>
              Fibrilación
            </NavLink>
          </div>
        </div>
        <NavLink to="quiz" end>
          Quiz Interactivo
        </NavLink>
        <NavLink to="sobre-nosotros" end>
          Sobre nosotros{" "}
        </NavLink>
        <NavLink
          to="/iniciar-sesion"
          end
          className="iniciar-sesion"
          onClick={handleLogin}
        >
          Iniciar Sesión / Registrarse
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
