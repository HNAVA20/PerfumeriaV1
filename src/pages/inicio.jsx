import React, { useState } from 'react';
import '../styles/inicio.css';
import FormContactanos from '../componentes/FormContactanos';
import Footer from '../componentes/footer';
import Banner from '../imagenes/Banner.png';
import Banner2 from '../imagenes/Banner-2.png';

function Inicio() {
  return (
    <div className="Container-Inicio">
      {/* Carrusel de imágenes */}
      <div id="carousel" className="carousel">
        <div className="carousel-item">
          <img src={Banner} alt="Perfume 1" />
        </div>
        <div className="carousel-item">
          <img src={Banner2} alt="Perfume 2" />
        </div>
      </div>

      {/* Información sobre las secciones del municipio */}
      <section className="info-secciones">
        <h2>Conoce nuestras secciones</h2>
        <div className="seccion">
          <h3>Fragancias Exclusivas</h3>
          <p>Descubre nuestra línea exclusiva de perfumes de lujo.</p>
        </div>
        <div className="seccion">
          <h3>Ofertas Especiales</h3>
          <p>Los mejores precios en perfumes seleccionados.</p>
        </div>
        <div className="seccion">
          <h3>Perfumería para Todos</h3>
          <p>Perfumes para todas las ocasiones, desde lo más sofisticado hasta lo más casual.</p>
        </div>
      </section>
      <FormContactanos />
    </div>
  );
}

export default Inicio;
