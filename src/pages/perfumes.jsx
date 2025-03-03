import React from "react";
import "../styles/perfumes.css";

function Perfumes() {
    const categories = ["Dama", "Caballero", "Unisex", "Niños", "Sets"];

    return (
        <div className="category-container">
            {categories.map((category, index) => (
                <div key={index} className="category-card">
                    <h2>{category}</h2>
                </div>
            ))}
        </div>
    );
}

export default Perfumes;
