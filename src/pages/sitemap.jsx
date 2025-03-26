import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/sitemap.css";
import BackToHomeButton from "../componentes/BackToHomeButton";
import { Link } from "react-router-dom";

const Sitemap = () => {
  const [secciones, setSecciones] = useState([]);
  const [marcasPorSeccion, setMarcasPorSeccion] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/secciones")
      .then(res => {
        setSecciones(res.data);
        res.data.forEach(sec => {
          axios.get(`http://localhost:3000/marcas/seccion/${sec.nombre_seccion}`)
            .then(resp => {
              setMarcasPorSeccion(prev => ({
                ...prev,
                [sec.nombre_seccion]: resp.data
              }));
            })
            .catch(err => console.error("Error cargando marcas por sección:", err));
        });
      })
      .catch(err => console.error("Error cargando secciones:", err));
  }, []);

  return (
    <div className="sitemap-container">
      <h1>Mapa del Sitio</h1>
      <div className="sitemap-list">
        {secciones.map((sec, index) => (
          <div key={index} className="sitemap-section">
            <h2 className="category">
              <Link to={`/seccion/${sec.nombre_seccion.toLowerCase()}`} className="section-link">
                {sec.nombre_seccion}
              </Link>
            </h2>
            <ul className="subcategory">
              {(marcasPorSeccion[sec.nombre_seccion] || []).map((marca) => (
                <li key={marca.id_marca} className="brand-item">
                  <Link
                    to={`/seccion/${sec.nombre_seccion.toLowerCase()}/marca/${encodeURIComponent(marca.nombre_marca.toLowerCase())}`}
                    className="brand-link"
                  >
                    {marca.nombre_marca}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default Sitemap;
