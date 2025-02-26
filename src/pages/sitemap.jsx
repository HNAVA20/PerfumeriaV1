import React from "react";
import '../styles/sitemap.css';

const sitemapData = [
    { category: "Dama", brands: ["Chanel", "Dior", "Lancome", "Carolina Herrera"] },
    { category: "Caballero", brands: ["Hugo Boss", "Paco Rabanne", "Armani", "YSL"] },
    { category: "Unisex", brands: ["Tom Ford", "Jo Malone", "Byredo", "Le Labo"] },
    { category: "Niños", brands: ["Disney", "Mustela", "Baby Tous"] },
    { category: "Sets", brands: ["Estuches para ella", "Estuches para él", "Ediciones Especiales"] },
];

const Sitemap = () => {
    return (
        <div className="sitemap-container">
            <h1>Mapa del Sitio</h1>
            <div className="sitemap-grid">
                {sitemapData.map((section, index) => (
                    <div key={index} className="sitemap-section">
                        <div className="category">{section.category}</div>
                        <ul className="subcategory">
                            {section.brands.map((brand, i) => (
                                <li key={i} className="brand-item">{brand}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sitemap;