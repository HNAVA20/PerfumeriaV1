import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../imagenes/imagenesblog/perfumefloral.png";
import img2 from "../imagenes/imagenesblog/perfumes2025.png";
import img3 from "../imagenes/imagenesblog/perfumevainilla.png";
import "../styles/blog.css";

function Perfumes() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([
        { name: "Dulzura y sofisticación", image: img3, path: "/dulzura" },
        { name: "Nuevos Propósitos Olfativos 2025", image: img2, path: "/propositos2025" },
        { name: "Florales: El aroma de la naturaleza", image: img1, path: "/florales" }
    ]);

    return (
        <div className="container">
            <h1 className="title">Explora Nuestro Blog</h1>
            <div className="articles-grid">
                {categories.map((category, index) => (
                    <div key={index} className="article" onClick={() => navigate(category.path)}>
                        <img src={category.image} alt={category.name} className="article-image" />
                        <h2 className="article-title">{category.name}</h2>
                        <a href={category.path} className="read-more">Leer más</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Perfumes;
