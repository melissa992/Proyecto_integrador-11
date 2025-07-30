import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase"; // Ajusta esta ruta según donde tengas el archivo de configuración
import "./Header.css";

const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Opcional: aquí puedes agregar redirección o notificaciones
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header>
      <nav className="nav-container">
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
          Quiz
        </NavLink>
        <NavLink to="sobre-nosotros" end className="navlink">
          Sobre nosotros
        </NavLink>

        <div className="nav-right">
          {user ? (
            <>
              <span className="navlink usuario-nombre">{user.displayName}</span>
              <NavLink onClick={handleLogout} className="navlink">
                Cerrar sesión
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/iniciar-sesion"
              end
              className="navlink iniciar-sesion"
            >
              Iniciar Sesión
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
