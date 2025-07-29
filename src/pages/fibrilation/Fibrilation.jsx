// Fibrilation.jsx migrado a React Three Fiber
import React, { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./Fibrilation.css";

import Desfibrilador from "../../assets/fibrilation/Defibillator.glb";
import Dolor from "../../assets/fibrilation/Pain.glb";
import Electro from "../../assets/fibrilation/Ekg.glb";
import Food from "../../assets/fibrilation/FOOD.glb";

const ScrollReveal = ({ children, className }) => {
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      const top = ref.current.getBoundingClientRect().top;
      if (top < triggerBottom) {
        ref.current.classList.add("show-3d");
      } else {
        ref.current.classList.remove("show-3d");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const Model = ({ path }) => {
  const gltf = useGLTF(path);
  return <primitive object={gltf.scene} scale={2.5} />;
};

const CameraController = () => {
  const { camera } = useThree();
  const [orbit, setOrbit] = useState({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 25,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setOrbit((prev) => {
        const step = 0.2;
        switch (e.key) {
          case "ArrowLeft":
            return { ...prev, theta: prev.theta - step };
          case "ArrowRight":
            return { ...prev, theta: prev.theta + step };
          case "ArrowUp":
            return { ...prev, phi: Math.max(0.1, prev.phi - step) };
          case "ArrowDown":
            return { ...prev, phi: Math.min(Math.PI - 0.1, prev.phi + step) };
          default:
            return prev;
        }
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame(() => {
    const { theta, phi, radius } = orbit;
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const ModelCard = ({ title, text, model }) => (
  <div className="cards">
    <ScrollReveal className="canvas-wrapper scroll-3d">
      <Canvas shadows style={{ width: "100%", height: "300px" }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <Model path={model} />
          <CameraController />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
      <div className="scroll-text-3d">
        navegación por teclado ↑ ← ↓ →
      </div>
    </ScrollReveal>
    <div className="cards-text scroll-3d">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  </div>
);

const Fibrilation = () => {
  return (
    <>
      <ScrollReveal className="arritmia-title scroll-3d">
        <h1 className="scroll-3d arritmia-header-float">
          Enfermedad <br /> Fibrilación Cardíaca
        </h1>
      </ScrollReveal>

      <ModelCard
        title="¿Qué es la Fibrilacion?"
        text="La fibrilación es una contracción o temblor incontrolable de fibras musculares (fibrillas). Cuando ocurre en las cámaras bajas del corazón, se denomina fibrilación ventricular o FV. Durante la FV, la sangre no se bombea desde el corazón. Esto puede resultar en muerte cardíaca súbita."
        model={Dolor}
      />

      <ModelCard
        title="Síntomas"
        text="Los síntomas pueden variar según el tipo de arritmia, pero algunos de los más frecuentes son: palpitaciones, mareos, fatiga, dolor en el pecho, dificultad para respirar y desmayos."
        model={Desfibrilador}
      />

      <ModelCard
        title="Tratamiento"
        text="El tratamiento depende del tipo y gravedad de la arritmia: medicamentos antiarrítmicos, cardioversión eléctrica, marcapasos, desfibrilador implantable (DAI), y ablación por catéter."
        model={Electro}
      />

      <ModelCard
        title="Prevención y autocuidado"
        text="Alimentación saludable, ejercicio moderado, evitar sustancias dañinas, controlar el estrés y dormir bien son claves para prevenir las arritmias."
        model={Food}
      />
    </>
  );
};

export default Fibrilation;
