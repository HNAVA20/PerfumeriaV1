import React from "react";
import "../styles/sets.css";
import EstucheSycomore from "../imagenes/imagenesSets/Estuche Sycomore.jpg";
import Lattafa from "../imagenes/imagenesSets/Lattafa-Asad.png";
import Blacksuede from "../imagenes/imagenesSets/Black Suede.jpg";
import ParisHilton from "../imagenes/imagenesSets/ParisHilton.png";
import HugoBoss from "../imagenes/imagenesSets/Hugo Boss Set.jpg";
import Guess from "../imagenes/imagenesSets/Guess.jpg";
import Breadcrumbs from "../componentes/Breadcrumb";
import BackToHomeButton from "../componentes/BackToHomeButton";


const productos = [
    { id: 1, nombre: "Black Suede + Desodorante + Crema para afeitar", precio: 3200, img: Blacksuede },
    { id: 2, nombre: "Estuche Sycomore + Crema humectante + Locion para el cuerpo", precio: 4650, img: EstucheSycomore },
    { id: 3, nombre: "Hugo Boss + Crema humectante + Desodorante", precio: 3510, img: HugoBoss },
    { id: 4, nombre: "Paris Hilton + Crema para manos + Locion", precio: 2600, img: ParisHilton },
    { id: 5, nombre: "Lattafa + Desodorante + Locion", precio: 5600, img: Lattafa },
    { id: 6, nombre: "Guess + Locion + Crema para manos", precio: 7600, img: Guess } 
];

function caballero() {
    return (
        <div>
            <main className="caballero-container">
                <aside className="filter-container">
                    <h2>Filtrar por:</h2>
                    <div className="filter">
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
            <BackToHomeButton />
        </div>
    );
}

export default caballero;
