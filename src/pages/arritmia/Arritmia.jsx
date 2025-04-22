import React from "react";
import "./Arritmia.css";
import Exercise from "../../assets/arritmia/Exercise.glb"; // Ajusta la ruta según tu estructura
import "@google/model-viewer";
import Food from "../../assets/arritmia/HealthyFood.glb"; // Ajusta la ruta según tu estructura
import Pain from "../../assets/arritmia/Pain.glb"; // Ajusta la ruta según tu estructura
import Pacemaker from "../../assets/arritmia/Pacemaker.glb"; // Ajusta la ruta según tu estructura

const Arritmia = () => {
  return (
    <>
      <div className="arritmia-title">
        <h1>
          Enfermedad <br /> Arritmia Cardíaca
        </h1>
        <model-viewer
          className="model-viewer"
          src={Exercise}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
      <div className="arritmia-details">
        <h2>Que es?</h2>
        <p>
          Una arritmia cardíaca es un latido irregular del corazón. Esto ocurre
          cuando no funcionan adecuadamente los impulsos eléctricos que le
          ordenan al corazón latir. Puede que el corazón lata demasiado rápido o
          demasiado lento. También puede ocurrir que el patrón del ritmo
          cardíaco sea irregular.
        </p>
      </div>
      <div className="arritmia-type">
        <p>
          <h2>Tipos de arritmias</h2>
          Las principales causas incluyen estrés, enfermedades subyacentes y
          desequilibrios en los electrolitos del cuerpo, como el potasio y el
          calcio.
        </p>
        <model-viewer
          className="model-viewer"
          src={Exercise}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>

      <div className="arritmia-causes">
        <p>
          <h2>Causas</h2>
          Las principales causas incluyen estrés, enfermedades subyacentes y
          desequilibrios en los electrolitos del cuerpo, como el potasio y el
          calcio.
        </p>
        <model-viewer
          className="model-viewer"
          src={Pain}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
      <div className="arritmia-sintomas">
        <p>
          <h2>Sintomas</h2>
          Las principales causas incluyen estrés, enfermedades subyacentes y
          desequilibrios en los electrolitos del cuerpo, como el potasio y el
          calcio.
        </p>
        <model-viewer
          className="model-viewer"
          src={Pacemaker}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
      <div className="arritmia-tratamientos">
        <p>
          <h2>Tratamientos</h2>
          Las principales causas incluyen estrés, enfermedades subyacentes y
          desequilibrios en los electrolitos del cuerpo, como el potasio y el
          calcio.
        </p>
        <model-viewer
          className="model-viewer"
          src={Food}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
    </>
  );
};

export default Arritmia;
