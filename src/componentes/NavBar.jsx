import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import logo from '../imagenes/logo192.png';
import '../componentes/NavBar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  return (
    <nav>
      <div classNaime="menu-container">
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>

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
              <li><Link to="/dama">Dama</Link></li>
              <li><Link to="/caballero">Caballero</Link></li>
              <li><Link to="/unisex">Unisex</Link></li>
              <li><Link to="/ninos">Niños</Link></li>
              <li><Link to="/sets">Sets</Link></li>
            </ul>
          </li>

          <li><Link to="/novedades">Novedades</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;