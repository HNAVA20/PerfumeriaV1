import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../imagenes/LogoPerfumeria.png";
import "./stylecom/NavBar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [secciones, setSecciones] = useState([]);
  const [hoveredSeccion, setHoveredSeccion] = useState(null);
  const [marcasPorSeccion, setMarcasPorSeccion] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/secciones")
      .then(res => setSecciones(res.data))
      .catch(err => console.error("Error al obtener secciones:", err));
  }, []);

  const fetchMarcasDeSeccion = (nombre) => {
    if (marcasPorSeccion[nombre]) return;

    axios.get(`http://localhost:3000/marcas/seccion/${nombre}`)
      .then(res => {
        setMarcasPorSeccion(prev => ({
          ...prev,
          [nombre]: res.data
        }));
      })
      .catch(err => console.error("Error al obtener marcas por sección:", err));
  };

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", searchTerm);
  };

  return (
    <nav>
      <div className="menu-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="menu-busqueda-container">
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

          <button 
            className={`menu-toggle ${menuOpen ? "open" : ""}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
          </button>

          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li><Link to="/">Inicio</Link></li>

            <li className={`submenu ${submenuOpen === 1 ? "open" : ""}`}>
              <Link to="/perfumes" onClick={() => toggleSubmenu(1)} className="submenu-link">
                Perfumes
              </Link>
              <ul>
                {secciones.map((sec) => (
                  <li
                    key={sec.id_seccion}
                    className="submenu"
                    onMouseEnter={() => {
                      setHoveredSeccion(sec.nombre_seccion);
                      fetchMarcasDeSeccion(sec.nombre_seccion);
                    }}
                    onMouseLeave={() => setHoveredSeccion(null)}
                  >
                    <Link to={`/perfumes/${sec.nombre_seccion.toLowerCase()}`}>
                      {sec.nombre_seccion}
                    </Link>

                    {/* Submenú de marcas relacionadas */}
                    {hoveredSeccion === sec.nombre_seccion && marcasPorSeccion[sec.nombre_seccion] && (
                      <ul className="submenu-tercer-nivel">
                        {marcasPorSeccion[sec.nombre_seccion].map((mar) => (
                          <li key={mar.id_marca}>
                            <Link to={`/perfumes/${encodeURIComponent(sec.nombre_seccion.toLowerCase())}/marca/${encodeURIComponent(mar.nombre_marca.toLowerCase())}`}>
                              {mar.nombre_marca}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
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
