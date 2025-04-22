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
        <NavLink to="corazon" end>
          El corazón
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
          Quiz
        </NavLink>
        {isAuthenticated ? (
          <NavLink
            to="/cerrar-sesion"
            end
            className="cerrar-sesion"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </NavLink>
        ) : (
          <NavLink
            to="/iniciar-sesion"
            end
            className="iniciar-sesion"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
