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
      <div className="arritmia-details">
        <h2>Que es?</h2>
        <p>
          La fibrilación es una contracción o temblor incontrolable de fibras
          musculares (fibrillas). Cuando ocurre en las cámaras bajas del
          corazón, se denomina fibrilación ventricular o FV. Durante la FV, la
          sangre no se bombea desde el corazón. Esto puede resultar en muerte
          cardíaca súbita.
        </p>
      </div>
      <div className="arritmia-type">
        <p>
          <h2>Tipos de fibrilación</h2>
          La aparición de la Fibrilación Auricular puede asociarse a:
          Predisposición genética Hipertensión arterial Haber sufrido un Infarto
          de Miocardio Haberse sometido a una cirugía cardíaca Diabetes
        </p>
        <model-viewer
          className="model-viewer"
          src={Dolor}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>

      <div className="arritmia-causes">
        <p>
          <h2>Causas</h2>
          La aparición de la Fibrilación Auricular puede asociarse a:
          Predisposición genética Hipertensión arterial Haber sufrido unInfarto
          de Miocardio Haberse sometido a una cirugía cardíaca Diabetes.
        </p>
        <model-viewer
          className="model-viewer"
          src={Desfibrilador}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
      <div className="arritmia-sintomas">
        <p>
          <h2>Sintomas</h2>
          Aunque no siempre provoca síntomas, los más comunes son: Aceleración
          del ritmo cardíaco y palpitaciones (latido rápido e irregular del
          corazón) Dolor y presión en el pecho Cansancio extremo Mareos o
          vértigo que pueden llegar al desmayo Empeoramiento de otras
          enfermedades a las que se asocia:Insuficiencia Cardíaca,
          hipertensión,enfermedades de las válvulas cardíacas
        </p>
        <model-viewer
          className="model-viewer"
          src={Electro}
          alt="Representación 3D de arritmia"
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
      <div className="arritmia-tratamientos">
        <p>
          <h2>Tratamientos</h2>
          El tratamiento depende de la gravedad y de la frecuencia de los
          síntomas y de la existencia o no de enfermedad cardiovascular
          asociada. Su objetivo es intentar restaurar el ritmo normal del
          corazón (ritmo sinusal): Cardioversión:Procedimiento para corregir la
          arritmia y recuperar el ritmo normal del corazón. Puede realizarse a
          través de medicamentos antiarrítmicos (cardioversión farmacológica) o,
          en caso esta arritmia (hipertensión,Insuficiencia Cardíaca…) y
          controlar los factores de riesgo.
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

export default Fibrilation;
