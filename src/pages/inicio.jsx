import React, { useState, useEffect } from 'react';
import '../styles/inicio.css';
import FormContactanos from '../componentes/FormContactanos';
import Banner from '../imagenes/Banner.png';
import Banner2 from '../imagenes/Banner-2.png';
import img from '../imagenes/img.png';
import img2 from '../imagenes/img-2.png';
import img3 from '../imagenes/img-3.png';

function Inicio() {
  const images = [Banner, Banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="Container-Inicio">
      {/* Carrusel de imágenes */}
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Perfume ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Información sobre las secciones del municipio */}
      <section className="info-secciones">
        <div className="seccion">
          <h1>Fragancias Exclusivas</h1>
          <h3>Descubre nuestra línea exclusiva de perfumes de lujo.</h3>
        </div>
        <img src={img} alt='Productos exclusivos' className='img-inicio'/>
        <div className="seccion">
          <h1>Ofertas Especiales</h1>
          <h3>Los mejores precios en perfumes seleccionados.</h3>
        </div>
        <img src={img2} alt='Productos exclusivos' className='img-inicio'/>
        <div className="seccion">
          <h1>Perfumería para Todos</h1>
          <h3>Perfumes para todas las ocasiones, desde lo más sofisticado hasta lo más casual.</h3>
        </div>
        <img src={img3} alt='Productos exclusivos' className='img-inicio'/>
      </section>
      <FormContactanos />
    </div>
  );
}

export default Inicio;
