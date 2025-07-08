import React, { useEffect } from "react";
import "./Arritmia.css";
import "@google/model-viewer";
import Exercise from "../../assets/arritmia/Exercise.glb"; // Ajusta la ruta según tu estructura
import Food from "../../assets/arritmia/HealthyFood.glb"; // Ajusta la ruta según tu estructura
import Pain from "../../assets/arritmia/Pain.glb"; // Ajusta la ruta según tu estructura
import Pacemaker from "../../assets/arritmia/Pacemaker.glb"; // Ajusta la ruta según tu estructura

const Arritmia = () => {
  // Manejar foco y hover
  useEffect(() => {
    const models = document.querySelectorAll("model-viewer");

    models.forEach((model) => {
      const handleMouseEnter = () => {
        model.classList.add("active-model");
      };

      const handleMouseLeave = () => {
        model.classList.remove("active-model");
      };

      model.addEventListener("mouseenter", handleMouseEnter);
      model.addEventListener("mouseleave", handleMouseLeave);
      model.addEventListener("focus", handleMouseEnter);
      model.addEventListener("blur", handleMouseLeave);
    });

    return () => {
      models.forEach((model) => {
        model.removeEventListener("mouseenter", handleMouseEnter);
        model.removeEventListener("mouseleave", handleMouseLeave);
        model.removeEventListener("focus", handleMouseEnter);
        model.removeEventListener("blur", handleMouseLeave);
      });
    };
  }, []);

  // Manejar teclas
  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeModel = document.querySelector("model-viewer.active-model");
      if (!activeModel) return;

      const orbit = activeModel.getCameraOrbit();
      const theta = parseFloat(orbit.theta);
      const phi = parseFloat(orbit.phi);
      const radius = parseFloat(orbit.radius);

      switch (event.key) {
        case "ArrowLeft":
          activeModel.cameraOrbit = `${theta - 0.2}rad ${phi}rad ${radius}m`;
          break;
        case "ArrowRight":
          activeModel.cameraOrbit = `${theta + 0.2}rad ${phi}rad ${radius}m`;
          break;
        case "ArrowUp":
          activeModel.cameraOrbit = `${theta}rad ${phi - 0.2}rad ${radius}m`;
          break;
        case "ArrowDown":
          activeModel.cameraOrbit = `${theta}rad ${phi + 0.2}rad ${radius}m`;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="arritmia-title">
        <h1>
          Enfermedad <br /> Arritmia Cardíaca
        </h1>
      </div>

      <div className="cards">
        <model-viewer
          className="model-viewer"
          src={Exercise}
          alt="Ejercicio 3D"
          auto-rotate
          camera-controls
          camera-orbit="30deg 85deg 25m" // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
          // environment-image="/hospital_room_1k.hdr"
          skybox-image="/pine_picnic_1k.hdr"
          style={{ width: "100%", height: "300px" }}
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
        ></model-viewer>
        <div className="cards-text">
          <h2>¿Qué es la Arritmia?</h2>
          <p>
            Una arritmia cardíaca es un latido irregular del corazón. Esto
            ocurre cuando no funcionan adecuadamente los impulsos eléctricos que
            le ordenan al corazón latir. Puede que el corazón lata demasiado
            rápido o demasiado lento. También puede ocurrir que el patrón del
            ritmo cardíaco sea irregular.
          </p>
        </div>
      </div>

      <div className="cards">
        <model-viewer
          className="model-viewer"
          src={Pain}
          alt="Dolor arritmia"
          auto-rotate
          camera-controls
          camera-orbit="30deg 85deg 25m" // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
          // environment-image="/hospital_room_1k.hdr"
          skybox-image="/pine_picnic_1k.hdr"
          style={{ width: "100%", height: "300px" }}
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
          className="cards-img"
          src={Pacemaker}
          alt="Marcapasos 3D"
          auto-rotate
          camera-controls
          camera-orbit="30deg 85deg 25m" // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
          // environment-image="/hospital_room_1k.hdr"
          skybox-image="/pine_picnic_1k.hdr"
          style={{ width: "100%", height: "300px" }}
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
          alt="Comida 3D"
          auto-rotate
          camera-controls
          camera-orbit="30deg 75deg 25m" // ← aquí controlas ángulo y distancia
          camera-target="0m 0m 0m"
          exposure="1.2"
          shadow-intensity="1"
          shadow-softness="0.9"
          // environment-image="/hospital_room_1k.hdr"
          skybox-image="/pine_picnic_1k.hdr"
          style={{ width: "100%", height: "300px" }}
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

export default Arritmia;
