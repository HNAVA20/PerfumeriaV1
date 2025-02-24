import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import logo from "./imagenes/Logo.png";
import "./componentes/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  return (
    <nav>
      <div className="menu-container">
        <Link to="/"><img src={logo} alt="Logo " className="logo" /></Link>

        {/* Botón de hamburguesa */}
        <button 
          className={`menu-toggle ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
        </button>

        {/* Menú con clases dinámicas */}
        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">Inicio</Link></li>

          <li className={`submenu ${submenuOpen === 1 ? "open" : ""}`}>
            <a href="#" onClick={() => toggleSubmenu(1)}>Perfumes</a>
            <ul>
              <li><Link to="/acceso-plataforma">Dama</Link></li>
              <li><Link to="/pre-registro">Caballero</Link></li>
              <li><Link to="/convocatoria">Unisex</Link></li>
              <li><Link to="/recorrido">Niños</Link></li>
              <li><Link to="/recorrido">Sets</Link></li>
            </ul>
          </li>

          <li><Link to="/carreras">Novedades</Link></li>
          <li><Link to="/vinculacion">Blog</Link></li>
          <li><Link to="/psicologia">Aromas</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;