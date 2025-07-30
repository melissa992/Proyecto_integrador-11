import React, { useEffect, useRef, useState } from "react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Physics, RigidBody, vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { saveUserProgress, getLeaderboard } from "../services/api";
import "./Quiz.css";

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

    const pos = bodyRef.current.translation();
    if (pos.y < -10) {
      bodyRef.current.setTranslation({ x: 0, y: 1, z: 5 }, true);
      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      name="jugador"
      colliders="cuboid"
      position={[0, 1, 10]}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}

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

export default function Quiz() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const jugadorRef = useRef();
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setIndice(0);
      setRespuesta(null);
      setFinalizado(false);
      setPuntaje(0);
      setBloqueado(false);
      setRanking([]);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinish = async () => {
    const data = {
      userId: user.uid,
      userName: user.displayName,
      score: puntaje,
      answeredQuestions: preguntas.map((p) => p.pregunta),
    };
    try {
      await saveUserProgress(data);
    } catch (error) {
      console.error("Error guardando progreso", error);
    }

    try {
      const leaderboard = await getLeaderboard();
      if (Array.isArray(leaderboard)) {
        setRanking(leaderboard);

        // Imprimir en consola nombre y puntaje
        leaderboard.forEach((entry) => {
          console.log(`Usuario: ${entry.userName}, Puntaje: ${entry.score}`);
        });
      } else {
        setRanking([]);
      }
    } catch (err) {
      console.error("Error obteniendo ranking", err);
      setRanking([]);
    }
  };

  const handleSeleccion = (texto) => {
    if (bloqueado) return;
    setRespuesta(texto);
    setBloqueado(true);

    const esCorrecta = texto === preguntas[indice].respuestaCorrecta;
    if (esCorrecta) setPuntaje((prev) => prev + 1);

    setTimeout(() => {
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
        handleFinish();
      }
    }, 1500);
  };

  const reiniciarQuiz = () => {
    setIndice(0);
    setRespuesta(null);
    setPuntaje(0);
    setBloqueado(false);
    setFinalizado(false);
    setRanking([]);
    if (jugadorRef.current) {
      jugadorRef.current.setTranslation({ x: 0, y: 1, z: 10 }, true);
      jugadorRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      jugadorRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  if (loadingAuth)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>Cargando...</div>
    );

  if (!user)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Por favor inicia sesión para acceder al quiz</h2>
        <button onClick={handleLogin} style={{ padding: 10, fontSize: 16 }}>
          Iniciar sesión con Google
        </button>
      </div>
    );

  const preguntaActual = preguntas[indice];

  return (
    <Canvas
      shadows
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 10, 15], fov: 50 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <OrbitControls target={[0, 1, 0]} />

      <Physics gravity={[0, -9.8, 0]}>
        <RigidBody type="fixed">
          <mesh position={[0, -0.5, 0]} receiveShadow>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="#ccc" />
          </mesh>
        </RigidBody>

        <Jugador bodyRef={jugadorRef} />

        {!finalizado &&
          preguntaActual.opciones.map((op, i) => (
            <Respuesta3D
              key={op}
              texto={op}
              posicion={[i * 5 - 5, 0.5, 0]}
              onElegida={handleSeleccion}
              deshabilitar={bloqueado}
            />
          ))}
      </Physics>

      {/* Pregunta o final */}
      {!finalizado ? (
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="black"
          anchorX="center"
        >
          {preguntaActual.pregunta}
        </Text>
      ) : (
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="green"
          anchorX="center"
        >
          ¡Quiz Finalizado!
        </Text>
      )}

      {/* Mensaje Correcto / Incorrecto */}
      {respuesta && !finalizado && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.4}
          color={
            respuesta === preguntaActual.respuestaCorrecta ? "green" : "red"
          }
          anchorX="center"
        >
          {respuesta === preguntaActual.respuestaCorrecta
            ? "¡Correcto!"
            : "Incorrecto"}
        </Text>
      )}

      {finalizado && (
        <>
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            color="blue"
            anchorX="center"
          >
            Tu puntaje: {puntaje} de {preguntas.length}
          </Text>
          {ranking
            .filter(
              (entry) => typeof entry.score === "number" && !isNaN(entry.score)
            )
            .map((entry, i) => {
              const height = Math.max(entry.score * 5, 0.5); // altura mínima 0.5
              return (
                <group
                  key={`${entry.userName ?? "user"}-${i}`}
                  position={[i * 2 - (ranking.length - 1), 0, 2]} // centramos horizontalmente
                >
                  <mesh position={[0, height / 2, 0]} castShadow>
                    <boxGeometry args={[1, height, 1]} />
                    <meshStandardMaterial color="#FFD700" />
                  </mesh>
                  <Text
                    position={[0, height + 0.5, 0]}
                    fontSize={0.3}
                    anchorX="center"
                    color="black"
                  >
                    {entry.userName}
                  </Text>
                </group>
              );
            })}
          <mesh position={[0, -2, 4]}>
            <Html>
              <button
                onClick={reiniciarQuiz}
                style={{ fontSize: 16, padding: 8, cursor: "pointer" }}
              >
                Reiniciar Quiz
              </button>
            </Html>
          </mesh>
        </>
      )}
    </Canvas>
  );
}
