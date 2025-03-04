import React from "react";
import "../styles/dama.css";
import Coco from "../imagenes/imagenesMujer/Coco.png";
import flower from "../imagenes/imagenesMujer/flower.png";
import Chance from "../imagenes/imagenesMujer/Chance.png"
import Jadore from "../imagenes/imagenesMujer/Jadore.png"
import Jacobs from "../imagenes/imagenesMujer/Jacobs.png"
import Scandal from "../imagenes/imagenesMujer/Scandal.png"
import Breadcrumbs from "../componentes/Breadcrumb";

const productos = [
    { id: 1, nombre: "Chance", precio: 3200, img: Chance },
    { id: 2, nombre: "Coco", precio: 4650, img: Coco },
    { id: 3, nombre: "Jacobs", precio: 3510, img: Jacobs },
    { id: 4, nombre: "Jadore", precio: 2600, img: Jadore },
    { id: 5, nombre: "Flower", precio: 5600, img: flower },
    { id: 6, nombre: "Scandal", precio: 7600, img: Scandal }
];
function Dama() {
    return (
        <div>
            <Breadcrumbs />
            <main className="dama-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
                        <h3>Marca</h3>
                        <ul>
                            {['Scandal','Coco','Chanel', 'Dior', 'Scandal', 'Marc Jacobs'].map((marca, index) => (
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

export default Dama;
