import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";
import Arritmia from "./pages/arritmia/Arritmia";
import Corazon from "./pages/corazon/Corazon";
import Quiz from "./pages/quiz/Quiz";
import Fibrilation from "./pages/fibrilation/Fibrilation";
import SobreNosotros from "./pages/sobre-nosotros/SobreNosotros";
import Inicio from "./pages/inicio/Inicio";
import IniciarSesion from "./pages/iniciar-sesion/IniciarSesion";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/arritmia" element={<Arritmia />} />
        <Route path="/fibrilacion" element={<Fibrilation />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/corazon" element={<Corazon />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
