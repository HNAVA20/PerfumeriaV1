import React from "react";
import '../styles/caballero.css';

function Caballero() {
    return (
        <div className="container">
            <aside className="filters">
                <h2>FILTRAR POR:</h2>
                <section>
                    <h3>MARCA</h3>
                    <ul>
                        <li><input type="checkbox" id="aurora" /><label htmlFor="aurora">Aurora</label></li>
                        <li><input type="checkbox" id="sauritana" /><label htmlFor="sauritana">Sauritana</label></li>
                        <li><input type="checkbox" id="bachemy" /><label htmlFor="bachemy">Bachemy</label></li>
                        <li><input type="checkbox" id="cauda" /><label htmlFor="cauda">Cauda</label></li>
                        <li><input type="checkbox" id="pierceuvelda" /><label htmlFor="pierceuvelda">Pierceuvelda</label></li>
                    </ul>
                </section>
                <section>
                    <h3>AROMA</h3>
                    <ul>
                        <li><input type="checkbox" id="america" /><label htmlFor="america">América</label></li>
                        <li><input type="checkbox" id="paranaticos" /><label htmlFor="paranaticos">Paranáticos</label></li>
                        <li><input type="checkbox" id="corona" /><label htmlFor="corona">Corona</label></li>
                        <li><input type="checkbox" id="dulce" /><label htmlFor="dulce">Dulce</label></li>
                        <li><input type="checkbox" id="picard" /><label htmlFor="picard">Picard</label></li>
                        <li><input type="checkbox" id="peruano" /><label htmlFor="peruano">Peruano</label></li>
                    </ul>
                </section>
                <section>
                    <h3>PRECIO</h3>
                    <div className="price-range">
                        <input type="number" id="minPrice" placeholder="MIN." />
                        <input type="number" id="maxPrice" placeholder="MAX." />
                    </div>
                </section>
                <button className="update-button">ACTUALIZAR</button>
            </aside>
            <main className="products">
                <h2>VER COMO</h2>
                <div className="product">
                    <h3>JEAN PAUL GAULTIER</h3>
                    <p>Les de parfum Aquas 0 G de Profonde</p>
                    <p>200 ml Nombre</p>
                    <p className="price">53,200.00</p>
                </div>
                <div className="product">
                    <h3>GIORGIO ARMANI</h3>
                    <p>Les de parfum Aquas 0 G de Profonde</p>
                    <p>200 ml Nombre</p>
                    <p className="price">91,650.00</p>
                </div>
                <div className="product">
                    <h3>VERSACE</h3>
                    <p>Les de parfum Aquas 0 G de Profonde</p>
                    <p>200 ml Nombre</p>
                    <p className="price">-</p>
                </div>
                <div className="product">
                    <h3>PACO RABANNE</h3>
                    <p>Les de parfum Aquas 0 G de Profonde</p>
                    <p>200 ml Nombre</p>
                    <p className="price">-</p>
                </div>
            </main>
        </div>
    );
}

export default Caballero;