import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/perfumes.css";

// Imágenes estáticas por nombre de sección
import dama from "../imagenes/dama.png";
import caballero from "../imagenes/caballero.png";
import unisex from "../imagenes/unisex.png";
import ninos from "../imagenes/ninos.png";
import sets from "../imagenes/sets.png";
import defaultImage from "../imagenes/sets.png";

function Perfumes() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const imagenesPorNombre = {
    dama,
    caballero,
    unisex,
    niños: ninos,
    sets,
  };

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await axios.get("http://localhost:3000/secciones");
        const secciones = response.data;

        const mapped = secciones.map((sec) => {
          const nombreLower = sec.nombre_seccion.toLowerCase();
          return {
            name: sec.nombre_seccion,
            image: imagenesPorNombre[nombreLower] || defaultImage,
            path: `/${nombreLower}`
          };
        });

        setCategories(mapped);
      } catch (error) {
        console.error("Error al obtener secciones:", error);
      }
    };

    fetchSecciones();
  }, []);

  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="category-card" 
          style={{ backgroundImage: `url(${category.image})` }} 
          onClick={() => navigate(category.path)}
        >
          <div className="category-label">{category.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Perfumes;
