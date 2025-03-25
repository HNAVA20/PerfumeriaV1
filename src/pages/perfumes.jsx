import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/perfumes.css";

// Importar imágenes
import dama from "../imagenes/dama.png";
import caballero from "../imagenes/caballero.png";
import unisex from "../imagenes/unisex.png";
import ninos from "../imagenes/ninos.png";
import sets from "../imagenes/sets.png";
import defaultImage from "../imagenes/sets.png"; // Imagen por defecto

function Perfumes() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([
        { name: "Dama", image: dama, path: "/dama" },
        { name: "Caballero", image: caballero, path: "/caballero" },
        { name: "Unisex", image: unisex, path: "/unisex" },
        { name: "Niños", image: ninos, path: "/ninos" },
        { name: "Sets", image: sets, path: "/sets" }
    ]);

    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await axios.get("http://localhost:3000/secciones");
                const nuevasSecciones = response.data.map(seccion => ({
                    name: seccion.nombre_seccion,
                    image: defaultImage, // Se usa una imagen por defecto para nuevas secciones
                    path: `/${seccion.nombre_seccion.toLowerCase()}`
                }));

                setCategories(prevCategories => {
                    // Evita duplicados comparando los nombres
                    const allCategories = [...prevCategories, ...nuevasSecciones];
                    return allCategories.filter((item, index, self) =>
                        index === self.findIndex(t => t.name === item.name)
                    );
                });
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
