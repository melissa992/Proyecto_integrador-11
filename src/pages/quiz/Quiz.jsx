import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

// Escucha teclas presionadas
const useKeyboardControls = () => {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
};

// Cubo controlable
function PlayerCube() {
  const ref = useRef();
  const keys = useKeyboardControls();

  useFrame(() => {
    const body = ref.current;
    if (!body) return;

    const impulse = { x: 0, y: 0, z: 0 };
    const force = 0.5;

    if (keys.current["w"]) impulse.z -= force;
    if (keys.current["s"]) impulse.z += force;
    if (keys.current["a"]) impulse.x -= force;
    if (keys.current["d"]) impulse.x += force;

    if (impulse.x !== 0 || impulse.z !== 0) {
      body.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody ref={ref} colliders="cuboid" restitution={0.5} name="jugador">
      <mesh castShadow position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}

// Zona de colisión
function TriggerZone({ onEnter }) {
  const handleCollisionEnter = (event) => {
    const other = event.other;
    if (other.rigidBodyObject?.name === "jugador") {
      console.log("Colisión con:", other.rigidBodyObject.name);
      onEnter?.();
    }
  };

  return (
    <RigidBody
      type="fixed"
      sensor
      name="zona-pregunta-1"
      onCollisionEnter={handleCollisionEnter}
    >
      <mesh position={[0, 0.5, -3]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="skyblue" transparent opacity={0.3} />
      </mesh>
    </RigidBody>
  );
}

export default function Quiz() {
  const [quizTriggered, setQuizTriggered] = useState(false);

  const handleEnter = () => {
    if (!quizTriggered) {
      alert("🧠 Pregunta del Quiz:\n¿Cuál es la función del nodo SA en el corazón?");
      setQuizTriggered(true);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <OrbitControls />

        <Physics gravity={[0, -9.81, 0]}>
          {/* Piso */}
          <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -0.5, 0]}>
              <boxGeometry args={[20, 1, 20]} />
              <meshStandardMaterial color="gray" />
            </mesh>
            <CuboidCollider args={[10, 0.5, 10]} />
          </RigidBody>

          {/* Jugador */}
          <PlayerCube />

          {/* Zona del quiz */}
          <TriggerZone onEnter={handleEnter} />
        </Physics>
      </Canvas>
    </div>
  );
}
