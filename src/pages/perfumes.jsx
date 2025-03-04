import React from "react";
import { useNavigate } from "react-router-dom"; // Importar para la navegación
import "../styles/perfumes.css";
import dama from "../imagenes/dama.png";
import caballero from "../imagenes/caballero.png";
import unisex from "../imagenes/unisex.png";
import ninos from "../imagenes/ninos.png";
import sets from "../imagenes/sets.png";
import BackToHomeButton from "../componentes/BackToHomeButton";

function Perfumes() {
    const navigate = useNavigate();

    const categories = [
        { name: "Dama", image: dama, path: "/dama" },
        { name: "Caballero", image: caballero, path: "/caballero" },
        { name: "Unisex", image: unisex, path: "/unisex" },
        { name: "Niños", image: ninos, path: "/ninos" },
        { name: "Sets", image: sets, path: "/sets" }
    ];

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
