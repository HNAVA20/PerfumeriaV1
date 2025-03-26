import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/productosadmin.css";

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
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

  useEffect(() => {
    fetchProductos();
    fetchMarcas();
    fetchSecciones();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/marcas");
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener marcas:", error);
    }
  };

  const fetchSecciones = async () => {
    try {
      const response = await axios.get("http://localhost:3000/secciones");
      setSecciones(response.data);
    } catch (error) {
      console.error("Error al obtener secciones:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSaveProducto = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre_producto", newProducto.nombre_producto);
      formData.append("precio_producto", newProducto.precio_producto);
      formData.append("descripcion_producto", newProducto.descripcion_producto);
      formData.append("aroma_producto", newProducto.aroma_producto);
      formData.append("cantidad_producto", newProducto.cantidad_producto);
      formData.append("id_mar", newProducto.marca_producto);
      formData.append("id_seccion", newProducto.seccion_producto);
      if (newProducto.imagen_producto) {
        formData.append("imagen_producto", newProducto.imagen_producto);
      }

      let response;
      if (editId) {
        response = await axios.put(
          `http://localhost:3000/productos/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post("http://localhost:3000/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchProductos();
        setModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const resetForm = () => {
    setNewProducto({
      nombre_producto: "",
      precio_producto: "",
      descripcion_producto: "",
      aroma_producto: "",
      cantidad_producto: "",
      marca_producto: "",
      seccion_producto: "",
      imagen_producto: "",
    });
    setImagenPreview(null);
    setEditId(null);
  };

  const handleEdit = (producto) => {
    setNewProducto({
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio,
      descripcion_producto: producto.descripcion,
      aroma_producto: producto.aroma,
      cantidad_producto: producto.cantidad,
      marca_producto: producto.id_mar,
      seccion_producto: producto.id_seccion,
      imagen_producto: "",
    });
    setImagenPreview(producto.imagen);
    setEditId(producto.id_producto);
    setModalOpen(true);
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

      <button className="btn-back" onClick={handleBack}>
        ← Regresar
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId ? "Editar Producto" : "Agregar Producto"}</h3>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Nombre del Producto"
                value={newProducto.nombre_producto}
                onChange={(e) => setNewProducto({ ...newProducto, nombre_producto: e.target.value })}
              />
              <input
                type="number"
                placeholder="Precio"
                value={newProducto.precio_producto}
                onChange={(e) => setNewProducto({ ...newProducto, precio_producto: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                value={newProducto.descripcion_producto}
                onChange={(e) => setNewProducto({ ...newProducto, descripcion_producto: e.target.value })}
              />
              <input
                type="text"
                placeholder="Aroma"
                value={newProducto.aroma_producto}
                onChange={(e) => setNewProducto({ ...newProducto, aroma_producto: e.target.value })}
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={newProducto.cantidad_producto}
                onChange={(e) => setNewProducto({ ...newProducto, cantidad_producto: e.target.value })}
              />
              <select
                value={newProducto.marca_producto}
                onChange={(e) => setNewProducto({ ...newProducto, marca_producto: e.target.value })}
              >
                <option value="">Seleccionar Marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.nombre_marca}
                  </option>
                ))}
              </select>
              <select
                value={newProducto.seccion_producto}
                onChange={(e) => setNewProducto({ ...newProducto, seccion_producto: e.target.value })}
              >
                <option value="">Seleccionar Sección</option>
                {secciones.map((seccion) => (
                  <option key={seccion.id_seccion} value={seccion.id_seccion}>
                    {seccion.nombre_seccion}
                  </option>
                ))}
              </select>
              <input
                type="file"
                placeholder="Imagen del Producto"
                onChange={(e) => {
                  setImagenPreview(URL.createObjectURL(e.target.files[0]));
                  setNewProducto({ ...newProducto, imagen_producto: e.target.files[0] });
                }}
              />
              {imagenPreview && <img src={imagenPreview} alt="Imagen previa" width="100" />}
            </div>
            <div className="modal-actions">
              <button onClick={handleSaveProducto}>{editId ? "Actualizar" : "Guardar"}</button>
              <button onClick={() => { setModalOpen(false); resetForm(); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="productos-table-container">
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
                  <button className="btn-edit" onClick={() => handleEdit(producto)}>Editar</button>
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductosAdmin;
