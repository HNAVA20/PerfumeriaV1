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
    cantidad_producto: "",  // Campo cantidad
    marca_producto: "",     // Campo marca
    seccion_producto: "",   // Campo sección
    imagen_producto: "",    // URL de la imagen
  });
  const [editId, setEditId] = useState(null);

  // Simula la carga de productos desde la base de datos
  useEffect(() => {
    // Aquí puedes hacer una solicitud fetch/axios a tu API para cargar los productos
    const fetchProductos = async () => {
      // Esto es solo un ejemplo de cómo podrías obtener los productos, incluyendo las URLs de las imágenes.
      const response = await fetch('/api/productos'); // Ajusta esta URL según tu API
      const data = await response.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const handleAddProducto = async () => {
    if (
      newProducto.nombre_producto.trim() &&
      newProducto.precio_producto.trim() &&
      newProducto.descripcion_producto.trim() &&
      newProducto.aroma_producto.trim() &&
      newProducto.cantidad_producto.trim() && // Validación de cantidad
      newProducto.marca_producto.trim() &&    // Validación de marca
      newProducto.seccion_producto.trim()     // Validación de sección
    ) {
      if (editId !== null) {
        // Editar producto existente
        const updatedProduct = { ...newProducto };
        const response = await fetch(`/api/productos/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
        const data = await response.json();
        setProductos(productos.map((producto) =>
          producto.id_producto === editId ? data : producto
        ));
      } else {
        // Agregar nuevo producto
        const response = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProducto),
        });
        const data = await response.json();
        setProductos([...productos, data]);
      }

      setNewProducto({
        nombre_producto: "",
        precio_producto: "",
        descripcion_producto: "",
        aroma_producto: "",
        cantidad_producto: "",  // Limpiar cantidad
        marca_producto: "",     // Limpiar marca
        seccion_producto: "",   // Limpiar sección
        imagen_producto: "",    // Limpiar imagen
      });
      setEditId(null);
      setModalOpen(false);
    }
  };

  const handleEditProducto = (producto) => {
    setNewProducto({
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio_producto,
      descripcion_producto: producto.descripcion_producto,
      aroma_producto: producto.aroma_producto,
      cantidad_producto: producto.cantidad_producto,  // Cargar cantidad
      marca_producto: producto.marca_producto,        // Cargar marca
      seccion_producto: producto.seccion_producto,   // Cargar sección
      imagen_producto: producto.imagen_producto,     // Cargar imagen
    });
    setEditId(producto.id_producto);
    setModalOpen(true);
  };

  const handleDeleteProducto = async (id) => {
    const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setProductos(productos.filter((producto) => producto.id_producto !== id));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch('/api/upload', { // Asegúrate de que esta URL esté configurada en tu backend
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setNewProducto({ ...newProducto, imagen_producto: data.url }); // Aquí guardamos la URL de la imagen
    }
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
            <th>Descripción</th>
            <th>Aroma</th>
            <th>Cantidad</th>
            <th>Marca</th>
            <th>Sección</th>
            <th>Imagen</th> {/* Columna de imagen */}
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
              </td> {/* Muestra la imagen en la tabla */}
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
            <input
              type="text"
              placeholder="Descripción del producto"
              value={newProducto.descripcion_producto}
              onChange={(e) => setNewProducto({ ...newProducto, descripcion_producto: e.target.value })}
            />
            <input
              type="text"
              placeholder="Aroma del producto"
              value={newProducto.aroma_producto}
              onChange={(e) => setNewProducto({ ...newProducto, aroma_producto: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cantidad del producto"
              value={newProducto.cantidad_producto}
              onChange={(e) => setNewProducto({ ...newProducto, cantidad_producto: e.target.value })}
            />
            <select
              id="marcas"
              value={newProducto.marca_producto}
              onChange={(e) => setNewProducto({ ...newProducto, marca_producto: e.target.value })}
            >
              <option value="">Seleccionar Marca</option>
              <option value="Marca 1">Marca 1</option>
              <option value="Marca 2">Marca 2</option>
              <option value="Marca 3">Marca 3</option>
            </select>
            <select
              id="secciones"
              value={newProducto.seccion_producto}
              onChange={(e) => setNewProducto({ ...newProducto, seccion_producto: e.target.value })}
            >
              <option value="">Seleccionar Sección</option>
              <option value="Sección 1">Sección 1</option>
              <option value="Sección 2">Sección 2</option>
              <option value="Sección 3">Sección 3</option>
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {newProducto.imagen_producto && (
              <div className="image-preview">
                <img src={newProducto.imagen_producto} alt="Vista previa" width="100" />
              </div>
            )}
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
