import React from "react";
import "./SobreNosotros.css"; // Ajusta la ruta según tu estructura
import logo from "/public/cm.png"; // Ajusta la ruta según tu estructura

const SobreNosotros = () => {
  return (
    <div className="cards-informacion">
      <div className="cards-texto">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos un equipo comprometido con la educación y la innovación en
          salud. Nuestro objetivo es crear experiencias interactivas que
          faciliten la comprensión de enfermedades complejas mediante el uso de
          tecnología 3D y contenido accesible para todos.
        </p>
      </div>
    </div>
  );
};

export default SobreNosotros;
