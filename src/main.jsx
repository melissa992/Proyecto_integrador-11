import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";
import Arritmia from "./pages/arritmia/Arritmia";
import Corazon from "./pages/corazon/Corazon";
import Quiz from "./pages/quiz/Quiz";
import CerrarSesion from "./pages/cerrar-sesion/CerrarSesion";
import Fibrilation from "./pages/fibrilation/Fibrilation";
import SobreNosotros from "./pages/sobre-nosotros/SobreNosotros";
import Inicio from "./pages/inicio/Inicio";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/arritmia" element={<Arritmia />} />
        <Route path="/fibrilacion" element={<Fibrilation />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/corazon" element={<Corazon />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/cerrar-sesion" element={<CerrarSesion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
