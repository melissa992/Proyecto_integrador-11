import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import googleLogo from "../../assets/google-logo.png";
import "./IniciarSesion.css"; // Importa el CSS normal

const IniciarSesion = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {!user ? (
        <>
          <a onClick={handleLogin} className="google-link">
            <img
              src={googleLogo}
              alt="Iniciar sesión con Google"
              className="google-icon"
            />
          </a>
        </>
      ) : (
        <>
          <h2 className="title">Bienvenido, {user.displayName}</h2>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
};

export default IniciarSesion;
