import React, { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

// Hook para scroll animado
const useScroll3DAnimation = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-3d");
    const handleScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add("show-3d");
        } else {
          el.classList.remove("show-3d");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
};

const ModelViewer = ({ src }) => (
  <div className="hero-model scroll-3d">
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model path={src} />
      </Suspense>
      <OrbitControls autoRotate enableZoom enablePan />
    </Canvas>
  </div>
);

const Inicio = () => {
  const navigate = useNavigate();
  useScroll3DAnimation();

  return (
    <div>
      {/* Imagen principal */}
    <section className="hero-section scroll-3d">
      {/* IZQUIERDA: Texto */}
      <div className="hero-text scroll-3d">
        <h1 className="header-float">
          <strong>Corazón</strong>
        </h1>
      </div>
      {/* DERECHA: Modelo */}
      <div className="hero-model scroll-3d">
        <ModelViewer src="/models-3d/heart.glb" />
      </div>
    </section>

      <section className="inicio-header scroll-3d">
        <h1 className="scroll-3d header-float">
          Bienvenidos a la pagina web 3d de Proyecto Integrador 1 sobre el
          Corazón y sus diferentes enfermedades
        </h1>
        <h2 className="scroll-3d header-float">Equipo de Trabajo</h2>
        <ul className="equipo-lista scroll-3d">
          <li>Juan Camilo Lopez Quintana</li>
          <li>Angie Melissa Ocoro Hurtado</li>
        </ul>
        <p className="scroll-3d">
          Somos el equipo de desarrollo CM y los invitamos a explorar el
          fascinante mundo del corazón humano, aprende sobre su funcionamiento y
          pon a prueba tus conocimientos con nuestro quiz interactivo.
        </p>
      </section>

      <section className="about-card scroll-3d">
        <div className="about-text scroll-3d">
          <h1 className="scroll-3d">
            <strong> El Corazón</strong>
          </h1>
        </div>
        <p className="scroll-3d">
          El corazón es un órgano muscular del tamaño de un puño, situado en el
          centro del pecho, ligeramente hacia la izquierda. Su función principal
          es bombear sangre a través del cuerpo para llevar oxígeno y nutrientes
          a las células y retirar los productos de desecho. Está dividido en
          cuatro cavidades: dos aurículas <strong>(superior)</strong> y dos
          ventrículos
        </p>
      </section>

      <div className="sidebar-info scroll-3d">
        <p className="sidebar-text">
          <strong>
            A continuación, exploraremos algunas de las enfermedades más comunes
            que afectan al corazón
          </strong>
          , como la <strong>arritmia</strong> y la <strong>fibrilación</strong>.
        </p>
        <div className="arrow-bounce">⬇️</div>
      </div>

      <div className="heart-card-container scroll-3d">
        <div className="heart-card scroll-3d">
          <h2 className="scroll-3d fibrilacion-text">Arritmia</h2>
          <ModelViewer src="/models-3d/Pacemaker.glb" />
          <button
            className="quiz-btn scroll-3d"
            onClick={() => navigate("/arritmia")}
          >
            Mas sobre la Arritmia
          </button>
        </div>
        <div className="heart-card scroll-3d">
          <h2 className="scroll-3d fibrilacion-text">Fibrilación</h2>
          <ModelViewer src="/models-3d/Ekg.glb" />
          <button
            className="quiz-btn scroll-3d"
            onClick={() => navigate("/fibrilacion")}
          >
            Mas sobre la Fibrilación
          </button>
        </div>
      </div>

      <section className="experience scroll-3d">
        <h2 className="scroll-3d">Vive una experiencia 3D del Corazón</h2>
        <video
          className="scroll-3d"
          src="/videos/corazon.mp4"
          autoPlay
          muted
          loop
          playsInline
          width="700"
          height="300"
          poster="/images/heart-poster.jpg"
        >
          Tu navegador no soporta el video.
        </video>
      </section>

      <footer className="quiz-card scroll-3d">
        <p className="scroll-3d">
          🎉 ¡Acepta el desafio! Es hora de un quiz. Prepárate para una
          competencia llena de preguntas y diversión.
        </p>
        <button
          className="quiz-btn scroll-3d"
          onClick={() => navigate("/quiz")}
        >
          <strong>Iniciar el Quiz</strong>
        </button>
      </footer>
    </div>
  );
};

export default Inicio;
