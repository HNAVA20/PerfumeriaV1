import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/productosadmin.css";

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProducto, setNewProducto] = useState({
    nombre_producto: "",
    precio_producto: "",
    descripcion_producto: "",
    aroma_producto: "",
    cantidad_producto: "",
    marca_producto: "",
    seccion_producto: "",
    imagen_producto: "",
  });
  const [imagenPreview, setImagenPreview] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="crud-container">
      <h2>CRUD de Productos</h2>
      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Producto
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      {/* Contenedor con Scroll */}
      <div className="productos-table-container"> 
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Aroma</th>
              <th>Cantidad</th><th>Marca</th><th>Sección</th><th>Imagen</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.aroma}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.marca}</td>
                <td>{producto.seccion}</td>
                <td>
                  {producto.imagen && <img src={producto.imagen} alt={producto.nombre_producto} width="50" />}
                </td>
                <td>
                  <button className="btn-edit">Editar</button>
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal con Scroll */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Producto</h3>
            <div className="modal-body">
              <input type="text" placeholder="Nombre" value={newProducto.nombre_producto} onChange={e => setNewProducto({...newProducto, nombre_producto: e.target.value})}/>
              <input type="number" placeholder="Precio" value={newProducto.precio_producto} onChange={e => setNewProducto({...newProducto, precio_producto: e.target.value})}/>
              <input type="text" placeholder="Descripción" value={newProducto.descripcion_producto} onChange={e => setNewProducto({...newProducto, descripcion_producto: e.target.value})}/>
              <input type="text" placeholder="Aroma" value={newProducto.aroma_producto} onChange={e => setNewProducto({...newProducto, aroma_producto: e.target.value})}/>
              <input type="number" placeholder="Cantidad" value={newProducto.cantidad_producto} onChange={e => setNewProducto({...newProducto, cantidad_producto: e.target.value})}/>
              <select onChange={e => setNewProducto({...newProducto, marca_producto: e.target.value})}>
                <option value="">Marca</option>{marcas.map(m => <option key={m.id_marca} value={m.id_marca}>{m.nombre_marca}</option>)}
              </select>
              <select onChange={e => setNewProducto({...newProducto, seccion_producto: e.target.value})}>
                <option value="">Sección</option>{secciones.map(s => <option key={s.id_seccion} value={s.id_seccion}>{s.nombre_seccion}</option>)}
              </select>
              <input type="file" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagenPreview(reader.result);
                    setNewProducto({ ...newProducto, imagen_producto: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}/>
              {imagenPreview && <img src={imagenPreview} alt="Preview" width="100"/>}
            </div>
            <div className="modal-footer">
              <button onClick={() => { /* Aquí podrías guardar el producto */ }}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;
