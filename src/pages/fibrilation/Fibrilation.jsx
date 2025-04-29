import React from "react";
import "./Fibrilation.css";
import "@google/model-viewer";
import Desfibrilador from "../../assets/fibrilation/DESFIBRILADOR.glb"; // Ajusta la ruta según tu estructura
import Dolor from "../../assets/fibrilation/DOLOR.glb"; // Ajusta la ruta según tu estructura
import Electro from "../../assets/fibrilation/ELECTRO.glb"; // Ajusta la ruta según tu estructura
import Food from "../../assets/fibrilation/FOOD.glb"; // Ajusta la ruta según tu estructura

const Fibrilation = () => {
  return (
    <>
      <div className="arritmia-title">
        <h1>
          Enfermedad <br /> Fibrilación Cardíaca
        </h1>
      </div>
      <div className="cards-fibrilation">
        <model-viewer
          className="cards-img"
          src={Dolor}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
        <div className="cards-text">
          <h2>¿Qué es la Fibrilacion?</h2>
          <p>
            La fibrilación es una contracción o temblor incontrolable de fibras
            musculares (fibrillas). Cuando ocurre en las cámaras bajas del
            corazón, se denomina fibrilación ventricular o FV. Durante la FV, la
            sangre no se bombea desde el corazón. Esto puede resultar en muerte
            cardíaca súbita.
          </p>
        </div>
      </div>
      <div className="cards">
        <model-viewer
          className="cards-img"
          src={Electro}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
        <div className="cards-text">
          <h2>Síntomas</h2>
          <p>
            Los síntomas pueden variar según el tipo de arritmia, pero algunos
            de los más frecuentes son: palpitaciones, mareos, fatiga, dolor en
            el pecho, dificultad para respirar y desmayos.
          </p>
        </div>
      </div>

      <div className="cards">
        <model-viewer
          className="cards-img"
          src={Desfibrilador}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
        <div className="cards-text">
          <h2>Tratamiento</h2>
          <p>
            El tratamiento depende del tipo y gravedad de la arritmia:
            medicamentos antiarrítmicos, cardioversión eléctrica, marcapasos,
            desfibrilador implantable (DAI), y ablación por catéter.
          </p>
        </div>
      </div>

      <div className="cards">
        <model-viewer
          className="cards-img"
          src={Food}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
        <div className="cards-text">
          <h2>Prevención y autocuidado</h2>
          <p>
            Alimentación saludable, ejercicio moderado, evitar sustancias
            dañinas, controlar el estrés y dormir bien son claves para prevenir
            las arritmias.
          </p>
        </div>
      </div>
    </>
  );
};

export default Fibrilation;
