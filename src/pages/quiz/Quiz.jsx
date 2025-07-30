import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Physics, RigidBody, vec3 } from "@react-three/rapier";
import * as THREE from "three";

// Preguntas
const preguntas = [
  {
    pregunta: "¿Cuál de las siguientes afirmaciones describe mejor la fibrilacion?",
    opciones: ["Latidos desordenados", "Corazón agrandado", "Arteria bloqueada"],
    respuestaCorrecta: "Latidos desordenados",
  },
  {
    pregunta: " ¿Cuál es uno de sus síntomas comunes de la arritmia?",
    opciones: ["Perdida de voz", "Dolor en pies", "Palpitaciones"],
    respuestaCorrecta: "Palpitaciones",
  },
  {
    pregunta: "¿Cuál de los siguientes es un hábito recomendado para cuidar la salud del corazón?",
    opciones: ["Consumir alcohol", "Hacer ejercicio", "Fumar a diario"],
    respuestaCorrecta: "Hacer ejercicio",
  },
];

// Movimiento con teclado
function usePlayerControls() {
  const keys = useRef({});
  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return keys;
}

// Jugador
function Jugador({ bodyRef }) {
  const speed = 0.4;
  const keys = usePlayerControls();

  useFrame(() => {
    if (!bodyRef.current) return;

    const force = { x: 0, y: 0, z: 0 };
    if (keys.current["w"]) force.z -= 1;
    if (keys.current["s"]) force.z += 1;
    if (keys.current["a"]) force.x -= 1;
    if (keys.current["d"]) force.x += 1;

    const direction = new THREE.Vector3(force.x, 0, force.z)
      .normalize()
      .multiplyScalar(speed);

    bodyRef.current.applyImpulse(vec3(direction), true);

    // Reinicio si se cae
    const pos = bodyRef.current.translation();
    if (pos.y < -10) {
      bodyRef.current.setTranslation({ x: 0, y: 1, z: 5 }, true);
      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody ref={bodyRef} name="jugador" colliders="cuboid" position={[0, 1, 10]}>
      <mesh castShadow receiveShadow >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}

// Respuesta
function Respuesta3D({ texto, posicion, onElegida, deshabilitar }) {
  return (
    <RigidBody
      type="fixed"
      sensor
      onIntersectionEnter={({ other }) => {
        if (!deshabilitar && other.rigidBodyObject?.name === "jugador") {
          onElegida(texto);
        }
      }}
    >
      <mesh position={posicion}>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="lightblue" />
        <Text
          position={[0, 1, 0]}
          fontSize={0.4}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {texto}
        </Text>
      </mesh>
    </RigidBody>
  );
}

// Componente principal
export default function Quiz() {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const jugadorRef = useRef();
  const medallero = [
  { nombre: "Ana", puntaje: 3 },
  { nombre: "Luis", puntaje: 2 },
  { nombre: "María", puntaje: 1 },
  ];

  const preguntaActual = preguntas[indice];

  const handleSeleccion = (texto) => {
    if (bloqueado) return;
    setRespuesta(texto);
    setBloqueado(true);

    const esCorrecta = texto === preguntaActual.respuestaCorrecta;
    if (esCorrecta) {
      setPuntaje((prev) => prev + 1);
    }

    setTimeout(() => {
      // Reiniciar posición del jugador
      if (jugadorRef.current) {
        jugadorRef.current.setTranslation({ x: 0, y: 1, z: 10 }, true);
        jugadorRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        jugadorRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }

      if (indice < preguntas.length - 1) {
        setIndice((prev) => prev + 1);
        setRespuesta(null);
        setBloqueado(false);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  return (
    <Canvas shadows style={{ width: "100vw", height: "100vh" }} camera={{ position: [0, 10, 15], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} 
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      />
      <OrbitControls target={[0, 1, 0]} />

      <Physics gravity={[0, -9.8, 0]}>
        {/* Piso */}
        <RigidBody type="fixed">
          <mesh position={[0, -0.5, 0]} receiveShadow>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="#ccc" />
          </mesh>
        </RigidBody>

        {/* Jugador */}
        <Jugador bodyRef={jugadorRef} />

        {/* Respuestas */}
        {!finalizado &&
          preguntaActual.opciones.map((op, index) => (
            <Respuesta3D
              key={op}
              texto={op}
              posicion={[index * 5 - 5, 0.5, 0]}
              onElegida={handleSeleccion}
              deshabilitar={bloqueado}
            />
          ))}
      </Physics>

      {/* Pregunta */}
      {!finalizado ? (
        <Text position={[0, 3, 0]} fontSize={0.5} color="black" anchorX="center">
          {preguntaActual.pregunta}
        </Text>
      ) : (
        <Text position={[0, 3, 0]} fontSize={0.5} color="green" anchorX="center">
          ¡Quiz Finalizado!
        </Text>
      )}

      {/* Resultado */}
      {respuesta && !finalizado && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.4}
          color={respuesta === preguntaActual.respuestaCorrecta ? "green" : "red"}
          anchorX="center"
        >
          {respuesta === preguntaActual.respuestaCorrecta
            ? "¡Correcto!"
            : "Incorrecto"}
        </Text>
      )}

      {/* Puntaje final */}
      {finalizado && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.4}
          color="blue"
          anchorX="center"
        >
          Tu puntaje: {puntaje} de {preguntas.length}
        </Text>
      )}
  {finalizado &&
    medallero
    .sort((a, b) => b.puntaje - a.puntaje)
    .map((usuario, i) => {
      // Colores por posición
      const coloresPodio = ["#FFD700", "#C0C0C0", "#CD7F32"]; // oro, plata, bronce
      const colorBarra = coloresPodio[i] || "#888"; // colores por posición o gris por defecto

      // Color del texto
      const colorTextoNombre = "black";

      return (
        <group key={usuario.nombre} position={[i * 2 - 3, 0, -5]}>
          <mesh position={[0, usuario.puntaje / 2, 0]} castShadow>
            <boxGeometry args={[1, usuario.puntaje, 1]} />
            <meshStandardMaterial color={colorBarra} />
          </mesh>
          <Text
            position={[0, usuario.puntaje + 0.5, 0]}
            fontSize={0.3}
            anchorX="center"
            color={colorTextoNombre}
          >
            {usuario.nombre}
          </Text>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.25}
            anchorX="center"
            color="black"
          >
            {usuario.puntaje}
          </Text>
        </group>
      );
    })}
    </Canvas>
  );
}