// Fibrilation.jsx migrado a React Three Fiber
import React, { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useAnimations, KeyboardControls, useKeyboardControls } from "@react-three/drei";
import { useSpring, a } from '@react-spring/three'; // animación
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

const Model = ({ path, animate = false }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, group);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [, getKeys] = useKeyboardControls();
  const [clicked, setClicked] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Animación con react-spring (rebote de escala)
  const { scale } = useSpring({
    scale: clicked ? scaleFactor * 1.1 : scaleFactor,
    config: { tension: 300, friction: 10 },
    onRest: () => {
      if (clicked) setClicked(false);
    }
  });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 3;
    const factor = targetSize / maxDimension;
    setScaleFactor(factor);
  }, [scene]);

  useEffect(() => {
    if (animate && actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions, animate]);

  useFrame(() => {
    const keys = getKeys();
    if (!animate && group.current) {
      if (!rotationPaused) {
        group.current.rotation.y += 0.005;
      } else {
        const moveSpeed = 0.05;
        if (keys.forward) group.current.position.z -= moveSpeed;
        if (keys.backward) group.current.position.z += moveSpeed;
        if (keys.left) group.current.position.x -= moveSpeed;
        if (keys.right) group.current.position.x += moveSpeed;
        if (keys.up) group.current.position.y += moveSpeed;
        if (keys.down) group.current.position.y -= moveSpeed;
      }
    }
  });

  const handleClick = () => {
    setRotationPaused((prev) => !prev);
    setClicked(true);
  };

  return (
    <a.primitive
      ref={group}
      object={scene}
      scale={scale}
      position={[0, -1, 0]}
      onClick={handleClick}
    />
  );
};

const ModelCard = ({ title, text, model }) => (
  <div className="cards">
    <div className="cards-left">
      <ScrollReveal className="canvas-wrapper scroll-3d">
        <KeyboardControls
          map={[
            { name: "left", keys: ["ArrowLeft", "a"] },
            { name: "right", keys: ["ArrowRight", "d"] },
            { name: "up", keys: ["ArrowUp", "w"] },
            { name: "down", keys: ["ArrowDown", "s"] },
            { name: "pause", keys: [" "] },
          ]}
        >
          <Canvas
            shadows
            style={{ width: "100%", height: "300px" }}
            camera={{ position: [0, 2, 5], fov: 50 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight
              castShadow
              position={[5, 10, 5]}
              intensity={1.2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Suspense fallback={null}>
              <Environment preset="sunset" background />
              <Model path={model} />
              <OrbitControls
                target={[0, 0, 0]}
                enablePan={false}
                enableZoom={true}
                maxPolarAngle={Math.PI / 1.8} // limita hasta dónde puede mirar arriba
                minPolarAngle={0.2}           // limita hasta dónde puede mirar abajo
              />
            </Suspense>
          </Canvas>
        </KeyboardControls>
        <div className="scroll-text-3d">Navegación: W A S D / ↑ ↓ ← → / Espacio (pausar)</div>
      </ScrollReveal>
    </div>

    <ScrollReveal className="cards-text cards-right scroll-3d">
      <h2>{title}</h2>
      <p>{text}</p>
    </ScrollReveal>
  </div>
);

const Fibrilation = () => {
  return (
    <>
      <ScrollReveal className="arritmia-title scroll-3d">
        <h1 className="arritmia-header-float">
          Enfermedad <br /> Fibrilación Cardíaca
        </h1>
      </ScrollReveal>

      <ModelCard
        title="¿Qué es la Fibrilación?"
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