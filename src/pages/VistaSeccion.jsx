import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/vistaSeccion.css";
import Breadcrumbs from "../componentes/Breadcrumb";

function VistaSeccion() {
  const { nombre } = useParams();
  const [productos, setProductos] = useState([]);
  const [filtroAromas, setFiltroAromas] = useState([]);
  const [aromasDisponibles, setAromasDisponibles] = useState([]);
  const [rangoPrecio, setRangoPrecio] = useState([0, 10000]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/productos/seccion/${nombre}`)
      .then(res => {
        setProductos(res.data);
        const aromas = [...new Set(res.data.map(p => p.aroma))];
        setAromasDisponibles(aromas);
      })
      .catch(err => console.error("Error al cargar productos por sección", err));
  }, [nombre]);

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
      <h2>{nombre}</h2>
      <Breadcrumbs />
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
            <div key={p.id_producto} className="producto-card" onClick={() => setProductoSeleccionado(p)}>
              {p.imagen && <img src={p.imagen} alt={p.nombre_producto} />}
              <h3>{p.nombre_producto}</h3>
              <p>${Number(p.precio).toFixed(2)}</p>
            </div>
          ))}
        </section>
      </div>

      {productoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setProductoSeleccionado(null)}>&times;</span>
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre_producto} />
            <h3>{productoSeleccionado.nombre_producto}</h3>
            <p>Precio: ${Number(productoSeleccionado.precio).toFixed(2)}</p>
            <p>{productoSeleccionado.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaSeccion;
