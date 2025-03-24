import React, { useState, useEffect } from "react";
import "../styles/productosadmin.css"; // Asegúrate de tener el archivo CSS importado

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
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
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProductos(data);
    };

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

      <div className="table-container"> {/* Contenedor con scroll */}
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Aroma</th>
              <th>Cantidad</th>
              <th>Marca</th>
              <th>Sección</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.precio_producto}</td>
                <td>{producto.descripcion_producto}</td>
                <td>{producto.aroma_producto}</td>
                <td>{producto.cantidad_producto}</td>
                <td>{producto.marca_producto}</td>
                <td>{producto.seccion_producto}</td>
                <td>
                  {producto.imagen_producto && (
                    <img src={producto.imagen_producto} alt={producto.nombre_producto} width="50" />
                  )}
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

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Producto" : "Agregar Producto"}</h3>
            <div className="modal-body"> {/* Contenedor con scroll */}
              <input type="text" placeholder="Nombre del producto" value={newProducto.nombre_producto} />
              <input type="text" placeholder="Precio del producto" value={newProducto.precio_producto} />
              <input type="text" placeholder="Descripción del producto" value={newProducto.descripcion_producto} />
              <input type="text" placeholder="Aroma del producto" value={newProducto.aroma_producto} />
              <input type="number" placeholder="Cantidad del producto" value={newProducto.cantidad_producto} />
              <select>
                <option value="">Seleccionar Marca</option>
                <option value="Marca 1">Marca 1</option>
              </select>
              <select>
                <option value="">Seleccionar Sección</option>
                <option value="Sección 1">Sección 1</option>
              </select>
            </div>
            <div className="modal-actions">
              <button>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;