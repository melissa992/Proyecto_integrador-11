import React from "react";
import "./SobreNosotros.css"; // Ajusta la ruta según tu estructura


const SobreNosotros = () => {
  return (
    <div className="cards-informacion">
      <div className="cards-texto">
        <h2 className="sobre-header-float">Sobre Nosotros</h2>
        <img src="/cm.png" alt="Logo" style={{maxWidth: '180px', margin: '0 auto 1.5rem auto', display: 'block'}} />
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
