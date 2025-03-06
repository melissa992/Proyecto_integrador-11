import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
