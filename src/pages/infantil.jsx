import React from "react";
import "../styles/infantil.css";
import scalpers from "../imagenes/scalpers.png";
import skidrock from "../imagenes/skidrock.png";
import esenzzia from "../imagenes/esenzzia.png"
import tous from "../imagenes/tous.png"
import ToyStory from "../imagenes/ToyStory.png"
import Cars from "../imagenes/Cars.png"
import Breadcrumbs from "../componentes/Breadcrumb";


const productos = [
    { id: 1, nombre: "Esenzzia", precio: 3200, img: esenzzia },
    { id: 2, nombre: "Scalpers", precio: 4650, img: scalpers },
    { id: 3, nombre: "Toy Story", precio: 3510, img: ToyStory },
    { id: 4, nombre: "Tous", precio: 2600, img: tous },
    { id: 5, nombre: "Skidrock", precio: 5600, img: skidrock },
    { id: 6, nombre: "Cars", precio: 7600, img: Cars }
];
function Infantil() {
    return (
        <div>
            <Breadcrumbs />
            
            <main className="infantil-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
                        <h3>Marca</h3>
                        <ul>
                            {['Skidrock','Cars', 'Esenzzia', 'Scalpers', 'Toy Story','Tous'].map((marca, index) => (
                                <li key={index}>
                                    <input type="checkbox" id={`marca${index + 1}`} />
                                    <label htmlFor={`marca${index + 1}`}>{marca}</label>
                                </li>
                            ))}
                        </ul>
                        <h3>Aroma</h3>
                        <ul>
                            {['Amaderado', 'Aromático', 'Cítrico', 'Dulce'].map((aroma, index) => (
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
        </div>
    );
}

export default Infantil;
