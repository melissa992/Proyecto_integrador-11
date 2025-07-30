// Arritmia.jsx (versión ajustada)
import React, { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useAnimations, KeyboardControls, useKeyboardControls, Text } from "@react-three/drei";
import { useSpring, a } from '@react-spring/three'; // animación
import { Text3D } from "@react-three/drei";
import robotoFont from "../../assets/fonts/Roboto_Italic.json";
import * as THREE from "three";
import "./Arritmia.css";

import Exercise from "../../assets/arritmia/Exercise.glb";
import Food from "../../assets/arritmia/HealthyFood.glb";
import Pain from "../../assets/arritmia/Pain.glb";
import Pacemaker from "../../assets/arritmia/Pacemaker.glb";

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

const Model = ({ path, animate = false, label = "Modelo 3D" }) => {
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
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
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
    <a.group
      ref={group}
      scale={scale}
      position={[0, -1, 0]}
      onClick={handleClick}
    >
      <primitive object={scene} />

      {/* Texto 3D */}
        <Text3D
          font={robotoFont}
          size={0.13}                // Un poco más pequeño
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={4}
          position={[-0.7, 0.6, -0.2]}    // Ligeramente al frente
        >
          {label}
          <meshStandardMaterial color="white"  metalness={1} roughness={1}/>
        </Text3D>

        {/* Texto plano sobrepuesto, siempre legible */}
        <Text
          fontSize={0.12}
          color="white"
          outlineColor="black"
          outlineWidth={0.02}
          anchorX="center"
          anchorY="top"
          position={[0, -0.1, 0.4]} // ligeramente al frente
        >
          Mover modelo con W A S D
        </Text>
    </a.group>
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
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.3} />
            </mesh>
            <Suspense fallback={null}>
              <Environment preset="park" background />
              <Model path={model} label="Click para detener"/>
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
      </ScrollReveal>
    </div>

    <ScrollReveal className="cards-text cards-right scroll-3d">
      <h2>{title}</h2>
      <p>{text}</p>
    </ScrollReveal>
  </div>
);

const Arritmia = () => {
  return (
    <>
      <ScrollReveal className="arritmia-title scroll-3d">
        <h1 className="arritmia-header-float">
          Enfermedad <br /> Arritmia Cardíaca
        </h1>
      </ScrollReveal>

      <ModelCard
        title="¿Qué es la Arritmia?"
        text="Una arritmia cardíaca es un latido irregular del corazón. Esto ocurre cuando no funcionan adecuadamente los impulsos eléctricos que le ordenan al corazón latir. Puede que el corazón lata demasiado rápido o demasiado lento. También puede ocurrir que el patrón del ritmo cardíaco sea irregular."
        model={Exercise}
      />

      <ModelCard
        title="Síntomas"
        text="Los síntomas pueden variar según el tipo de arritmia, pero algunos de los más frecuentes son: palpitaciones, mareos, fatiga, dolor en el pecho, dificultad para respirar y desmayos."
        model={Pain}
      />

      <ModelCard
        title="Tratamiento"
        text="El tratamiento depende del tipo y gravedad de la arritmia: medicamentos antiarrítmicos, cardioversión eléctrica, marcapasos, desfibrilador implantable (DAI), y ablación por catéter."
        model={Pacemaker}
      />

      <ModelCard
        title="Prevención y autocuidado"
        text="Alimentación saludable, ejercicio moderado, evitar sustancias dañinas, controlar el estrés y dormir bien son claves para prevenir las arritmias."
        model={Food}
      />
    </>
  );
};

export default Arritmia;
