import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import logo from '../imagenes/LogoPerfumeria.png';
import '../componentes/NavBar.css';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscando: ", searchTerm);  // Aquí puedes hacer que el formulario redirija o filtre resultados.
  };

  return (
    <nav>
      <div className="menu-container">
        {/* Logo */}
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        <div className="menu-busqueda-container">
          
          {/* Barra de búsqueda */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </form>
          </div>


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
              <Link to="/perfumes" onClick={() => toggleSubmenu(1)}>Perfumes</Link>
              <ul>
                <li className={`submenu ${submenuOpen === 2 ? "open" : ""}`}>
                  <Link to="/dama" onClick={() => toggleSubmenu(2)}>Dama</Link>
                  <ul>
                    <li><Link to="/dama/chanel">Chanel</Link></li>
                    <li><Link to="/dama/dior">Dior</Link></li>
                    <li><Link to="/dama/lancome">Lancôme</Link></li>
                    <li><Link to="/dama/armani">Armani</Link></li>
                  </ul>
                </li>
                <li className={`submenu ${submenuOpen === 3 ? "open" : ""}`}>
                  <Link to="/caballero" onClick={() => toggleSubmenu(3)}>Caballero</Link>
                  <ul>
                    <li><Link to="/caballero/hugo-boss">Hugo Boss</Link></li>
                    <li><Link to="/caballero/dolce-gabbana">Dolce & Gabbana</Link></li>
                    <li><Link to="/caballero/yves-saint-laurent">Yves Saint Laurent</Link></li>
                    <li><Link to="/caballero/paco-rabanne">Paco Rabanne</Link></li>
                  </ul>
                </li>
                <li><Link to="/unisex">Unisex</Link></li>
                <li><Link to="/ninos">Niños</Link></li>
                <li><Link to="/sets">Sets</Link></li>
              </ul>
            </li>

            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
