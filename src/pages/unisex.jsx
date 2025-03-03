import React from "react";
import "../styles/unisex.css";
import HumorLibertad from "../imagenes/HUMOR-LIBERTA.png";
import LeauRevee from "../imagenes/LeauRevee.png";
import EauDeToilette from "../imagenes/EauDeToilette.png"
import ItsYouArt from "../imagenes/ItsYouArt.png"
import Isolée from "../imagenes/Isolée.png"
import Rouge from "../imagenes/Rouge.png"


const productos = [
    { id: 1, nombre: "Eau De Toilette", precio: 3200, img: EauDeToilette },
    { id: 2, nombre: "Humor Libertad", precio: 4650, img: HumorLibertad },
    { id: 3, nombre: "Isolée", precio: 3510, img: Isolée },
    { id: 4, nombre: "ItsYouArt", precio: 2600, img: ItsYouArt },
    { id: 5, nombre: "LeauRevee", precio: 5600, img: LeauRevee },
    { id: 6, nombre: "Rouge", precio: 7600, img: Rouge }
];
function unisex() {
    return (
        <div>
            <main className="unisex-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
                        <h3>Marca</h3>
                        <ul>
                            {['Eau De Toillette', 'Humor Liberta', 'Isolée', 'Its You Art', 'Leau Revee', 'Rouge'].map((marca, index) => (
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

export default unisex;
