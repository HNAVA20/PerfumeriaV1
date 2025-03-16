import React from "react";
import "../styles/chanel.css";
import Breadcrumbs from "../componentes/Breadcrumb.jsx";
import BackToHomeButton from "../componentes/BackToHomeButton";
import Chance from "../imagenes/Chance.png";
import Coco from "../imagenes/Coco.png";
import Jacobs from "../imagenes/Jacobs.png";
import Jadore from "../imagenes/Jadore.png";
import Scandal from "../imagenes/Scandal.png";

const productos = [
    { id: 1, nombre: "Chance Chanel", precio: 3500, img: Chance },
    { id: 2, nombre: "Coco Chanel", precio: 4800, img: Coco },
    { id: 3, nombre: "Jacobs", precio: 3510, img: Jacobs },
    { id: 4, nombre: "Jadore", precio: 2600, img: Jadore },
    { id: 5, nombre: "Scandal", precio: 7600, img: Scandal }
];

function Chanel() {
    return (
        <div>
            <Breadcrumbs />
            <main className="chanel-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
                        <h3>Aroma</h3>
                        <ul>
                            {["Amaderado", "Aromático", "Cítrico", "Dulce"].map((aroma, index) => (
                                <li key={index}>
                                    <input type="checkbox" id={`aroma${index + 1}`} />
                                    <label htmlFor={`aroma${index + 1}`}>{aroma}</label>
                                </li>
                            ))}
                        </ul>
                        <h3>Precio</h3>
                        <div className="price-filter">
                            <label htmlFor="min-price">Min.</label>
                            <input type="number" id="min-price" />
                            <label htmlFor="max-price">Max.</label>
                            <input type="number" id="max-price" />
                            <button>Actualizar</button>
                        </div>
                    </div>
                </aside>

                <section className="products">
                    <h2>Productos</h2>
                    <div className="product-list">
                        {productos.map(producto => (
                            <div className="product-item" key={producto.id}>
                                <img src={producto.img} alt={producto.nombre} className="img" />
                                <p>{producto.nombre}</p>
                                <p>${producto.precio.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <BackToHomeButton />
        </div>
    );
}

export default Chanel;