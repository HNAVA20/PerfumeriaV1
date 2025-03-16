import React from "react";
import '../styles/sitemap.css';
import BackToHomeButton from "../componentes/BackToHomeButton";

const sitemapData = [
    { category: "Dama", brands: ["Chanel", "Dior", "Lancome", "Carolina Herrera"] },
    { category: "Caballero", brands: ["Hugo Boss", "Paco Rabanne", "Armani", "YSL"] },
    { category: "Unisex", brands: ["Tom Ford", "Jo Malone", "Byredo", "Le Labo"] },
    { category: "Niños", brands: ["Disney", "Mustela", "Baby Tous"] },
    { category: "Sets", brands: ["Set 1", "Set 2", "Set 3"] },
];

const Sitemap = () => {
    return (
        <div className="sitemap-container">
            <h1>Mapa del Sitio</h1>
            <div className="sitemap-list">
                {sitemapData.map((section, index) => (
                    <div key={index} className="sitemap-section">
                        <h2 className="category">{section.category}</h2>
                        <ul className="subcategory">
                            {section.brands.map((brand, i) => (
                                <li key={i} className="brand-item">
                                    {brand === "Chanel" ? (
                                        <a href={`/Dama/chanel`} className="brand-link">
                                            {brand}
                                        </a>
                                    ) : (
                                        <a href={`/perfumes/${brand.toLowerCase().replace(/\s+/g, '-')}`} className="brand-link">
                                            {brand}
                                        </a>
                                    )}
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
