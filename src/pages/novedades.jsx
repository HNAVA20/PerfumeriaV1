import React from "react";
import '../styles/novedades.css';
import NavBar from '../componentes/NavBar';

const Novedades = () => {
  const perfumes = [
    {
      nombre: 'Phantom Elixir',
      marca: 'Paco Rabanne',
      descripcion: 'Redefine la masculinidad futurista con una combinación de lavanda, vainilla y madera de oud, con notas de geranio y especias.',
    },
    {
      nombre: 'Angels\' Share Paradis',
      marca: 'By Kilian',
      descripcion: 'Una versión renovada de la fragancia icónica, combinando coñac con notas de pera, frutas cítricas, vainilla, canela y ámbar.',
    },
    {
      nombre: 'Acqua di Giò Elixir',
      marca: 'Giorgio Armani',
      descripcion: 'Fusiona notas marinas con especias cálidas como cardamomo y pimienta rosa, con un fondo de incienso y maderas ambarinas.',
    },
    {
      nombre: 'For Her Intense',
      marca: 'Narciso Rodriguez',
      descripcion: 'Lleva la sensualidad a nuevas alturas con almizcle, flores blancas como jazmín y nardo, y un fondo de notas amaderadas y ámbar oscuro.',
    },
    {
      nombre: 'La Belle Flower Edition',
      marca: 'Jean Paul Gaultier',
      descripcion: 'Un tributo a las flores con notas de peonía, flor de azahar y pera, mezcladas con vainilla y almizcles suaves.',
    },
  ];

  return (
    <>
      <section className="Novedades">
        <h2 className="title">Novedades de Perfumes</h2>
        {perfumes.map((perfume, index) => (
          <article className="perfume" key={index}>
            <h3 className="perfumeTitle">{perfume.nombre}</h3>
            <p><strong>Marca:</strong> {perfume.marca}</p>
            <p><strong>Descripción:</strong> {perfume.descripcion}</p>
          </article>
        ))}
      </section>
    </>
  );
};

export default Novedades;
