import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/vistaSeccion.css"; // Reutilizamos el mismo estilo

function VistaMarcaEnSeccion() {
  const { nombre, nombreMarca } = useParams();
  const [productos, setProductos] = useState([]);
  const [filtroAromas, setFiltroAromas] = useState([]);
  const [aromasDisponibles, setAromasDisponibles] = useState([]);
  const [rangoPrecio, setRangoPrecio] = useState([0, 10000]);

  useEffect(() => {
    axios.get(`http://localhost:3000/productos/seccion/${nombre}/marca/${nombreMarca}`)
      .then(res => {
        setProductos(res.data);
        const aromas = [...new Set(res.data.map(p => p.aroma))];
        setAromasDisponibles(aromas);
      })
      .catch(err => console.error("Error al cargar productos por sección y marca", err));
  }, [nombre, nombreMarca]);

  const toggleAroma = (aroma) => {
    setFiltroAromas(prev =>
      prev.includes(aroma) ? prev.filter(a => a !== aroma) : [...prev, aroma]
    );
  };

  const handlePrecioChange = (e) => {
    const { name, value } = e.target;
    setRangoPrecio(prev =>
      name === "min" ? [Number(value), prev[1]] : [prev[0], Number(value)]
    );
  };

  const productosFiltrados = productos.filter(p => {
    const cumpleAroma = filtroAromas.length === 0 || filtroAromas.includes(p.aroma);
    const cumplePrecio = p.precio >= rangoPrecio[0] && p.precio <= rangoPrecio[1];
    return cumpleAroma && cumplePrecio;
  });

  return (
    <div className="vista-seccion">
      <h2>{nombre} / {decodeURIComponent(nombreMarca).replace(/-/g, " ")}</h2>
      <div className="contenido">
        <aside className="filtros">
          <h3>Filtrar por:</h3>
          <div>
            <h4>Aroma</h4>
            {aromasDisponibles.map(aroma => (
              <label key={aroma}>
                <input
                  type="checkbox"
                  checked={filtroAromas.includes(aroma)}
                  onChange={() => toggleAroma(aroma)}
                />
                {aroma}
              </label>
            ))}
          </div>

          <div>
            <h4>Precio</h4>
            <label>Min: $<input type="number" name="min" value={rangoPrecio[0]} onChange={handlePrecioChange} /></label>
            <label>Max: $<input type="number" name="max" value={rangoPrecio[1]} onChange={handlePrecioChange} /></label>
          </div>
        </aside>

        <section className="productos-container">
          {productosFiltrados.map(p => (
            <div key={p.id_producto} className="producto-card">
              {p.imagen && <img src={p.imagen} alt={p.nombre_producto} />}
              <h3>{p.nombre_producto}</h3>
              <p>${Number(p.precio).toFixed(2)}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default VistaMarcaEnSeccion;
