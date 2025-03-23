import React, { useState } from "react";
import "../styles/productosadmin.css";

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProducto, setNewProducto] = useState({ nombre_producto: "", precio_producto: "" });
  const [editId, setEditId] = useState(null);

  const handleAddProducto = () => {
    if (newProducto.nombre_producto.trim() && newProducto.precio_producto.trim()) {
      if (editId !== null) {
        // Editar producto existente
        setProductos(
          productos.map((producto) =>
            producto.id_producto === editId
              ? { ...producto, ...newProducto }
              : producto
          )
        );
      } else {
        // Agregar nuevo producto
        const newId = productos.length > 0 ? productos[productos.length - 1].id_producto + 1 : 1;
        setProductos([...productos, { id_producto: newId, ...newProducto }]);
      }

      setNewProducto({ nombre_producto: "", precio_producto: "" });
      setEditId(null);
      setModalOpen(false);
    }
  };

  const handleEditProducto = (producto) => {
    setNewProducto({ nombre_producto: producto.nombre_producto, precio_producto: producto.precio_producto });
    setEditId(producto.id_producto);
    setModalOpen(true);
  };

  const handleDeleteProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id_producto !== id));
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Productos</h2>

      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Producto
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.precio_producto}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditProducto(producto)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteProducto(producto.id_producto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Producto" : "Agregar Producto"}</h3>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={newProducto.nombre_producto}
              onChange={(e) => setNewProducto({ ...newProducto, nombre_producto: e.target.value })}
            />
            <input
              type="text"
              placeholder="Precio del producto"
              value={newProducto.precio_producto}
              onChange={(e) => setNewProducto({ ...newProducto, precio_producto: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleAddProducto}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;