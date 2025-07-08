import React from "react";
import "./Inicio.css"; // Usa CSS externo para estilos.
import "@google/model-viewer";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Imagen principal */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            {" "}
            <strong>Corazón</strong>
          </h1>
        </div>
        <model-viewer
          src="/models-3d/heart.glb"
          alt="Corazón 3D"
          auto-rotate
          camera-controls
          className="hero-model"
        ></model-viewer>
      </section>

      {/* El Corazon*/}
      <section className="about-card">
        <div className="about-text">
          <h1>
            <strong> El Corazón</strong>
          </h1>
        </div>
        <p>
          El corazón es un órgano muscular del tamaño de un puño, situado en el
          centro del pecho, ligeramente hacia la izquierda. Su función principal
          es bombear sangre a través del cuerpo para llevar oxígeno y nutrientes
          a las células y retirar los productos de desecho. Está dividido en
          cuatro cavidades: dos aurículas <strong>(superior)</strong> y dos
          ventrículos
          <strong> (inferior) </strong>. El corazón está compuesto por tres
          capas de tejido y cuenta con válvulas que regulan el flujo sanguíneo.
        </p>
      </section>

      {/* Experiencia 3D */}
      <section className="experience">
        <h2>Vive una experiencia 3D del Corazón</h2>
        <video
          src="/videos/corazon.mp4"
          autoPlay
          muted
          loop
          playsInline
          width="700"
          height="300"
          poster="/images/heart-poster.jpg"
        >
          Tu navegador no soporta el video.
        </video>
      </section>
      <footer className="quiz-card">
        <p>
          🎉 ¡Acepta el desafio! Es hora de un quiz. Prepárate para una
          competencia llena de preguntas y diversión.
        </p>
        <button className="quiz-btn" onClick={() => navigate("/quiz")}>
          <strong>Iniciar el Quiz</strong>
        </button>
      </footer>
    </div>
  );
};

export default Inicio;
