import React from "react";
import "../styles/caballero.css";
import aqua from "../imagenes/imagenesHombre/Aqua.png";
import Dolce from "../imagenes/imagenesHombre/Dolce-Gabana.png";
import Jean from "../imagenes/imagenesHombre/Jean-Paul-Gaultier.png"
import Onemillion from "../imagenes/imagenesHombre/onemillion.png"
import Versace from "../imagenes/imagenesHombre/Versace.png"
import Prada from "../imagenes/imagenesHombre/Prada.png"
import Breadcrumbs from "../componentes/Breadcrumb";


const productos = [
    { id: 1, nombre: "Jean Paul Gaultier", precio: 3200, img: Jean },
    { id: 2, nombre: "Giorgio Armani", precio: 4650, img: aqua },
    { id: 3, nombre: "Versace", precio: 3510, img: Versace },
    { id: 4, nombre: "Paco Rabanne", precio: 2600, img: Onemillion },
    { id: 5, nombre: "Dolce & Gabbana", precio: 5600, img: Dolce },
    { id: 6, nombre: "Prada", precio: 7600, img: Prada }
];
function caballero() {
    return (
        <div>
            <Breadcrumbs />
            <main className="caballero-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
                        <h3>Marca</h3>
                        <ul>
                            {['Versace','Giorgio Armani','Azzaro', 'Bvlgari', 'Burberry', 'Coach'].map((marca, index) => (
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

export default caballero;
