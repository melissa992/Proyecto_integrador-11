import React from "react";
import "./Fibrilation.css";
import "@google/model-viewer";
import Desfibrilador from "../../assets/fibrilation/Defibillator.glb"; // Ajusta la ruta según tu estructura
import Dolor from "../../assets/fibrilation/Pain.glb"; // Ajusta la ruta según tu estructura
import Electro from "../../assets/fibrilation/Ekg.glb"; // Ajusta la ruta según tu estructura
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
          alt="Dolor fibrilacion"
          auto-rotate
          camera-controls
          camera-orbit="45deg 70deg 25m"   // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
         // environment-image="/hospital_room_1k.hdr"
          skybox-image="/hospital_room_1k.hdr"
          style={{ width: '100%', height: '300px' }}
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
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
          className="model-viewer"
          src={Desfibrilador}
          alt="Desfribliador 3D"
          auto-rotate
          camera-controls
          camera-orbit="45deg 70deg 25m"   // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
         // environment-image="/hospital_room_1k.hdr"
          skybox-image="/hospital_room_1k.hdr"
          style={{ width: '100%', height: '300px' }}
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
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
          className="model-viewer"
          src={Electro}
          alt="Representación 3D electrocardiograma"
          auto-rotate
          camera-controls
          camera-orbit="45deg 90deg 25m"   // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
         // environment-image="/hospital_room_1k.hdr"
          skybox-image="/hospital_room_1k.hdr"
          style={{ width: '100%', height: '300px' }}
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
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
          alt="Comida saludable"
          auto-rotate
          camera-controls
          camera-orbit="45deg 70deg 25m"   // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
         // environment-image="/hospital_room_1k.hdr"
          skybox-image="/hospital_room_1k.hdr"
          style={{ width: '100%', height: '300px' }}
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
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
