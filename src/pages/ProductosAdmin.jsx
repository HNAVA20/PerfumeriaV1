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
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!newProducto.nombre_producto) newErrors.nombre_producto = "El nombre del producto es obligatorio";
    if (!newProducto.precio_producto || isNaN(newProducto.precio_producto) || newProducto.precio_producto <= 0) 
      newErrors.precio_producto = "El precio debe ser un número positivo";
    if (!newProducto.descripcion_producto) newErrors.descripcion_producto = "La descripción es obligatoria";
    if (!newProducto.aroma_producto) newErrors.aroma_producto = "El aroma es obligatorio";
    if (!newProducto.cantidad_producto || isNaN(newProducto.cantidad_producto) || newProducto.cantidad_producto <= 0)
      newErrors.cantidad_producto = "La cantidad debe ser un número positivo";
    if (!newProducto.marca_producto) newErrors.marca_producto = "La marca es obligatoria";
    if (!newProducto.seccion_producto) newErrors.seccion_producto = "La sección es obligatoria";
    if (!newProducto.imagen_producto) newErrors.imagen_producto = "La imagen es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProducto = async () => {
    if (!validate()) return;

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
    setErrors({});
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

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmar) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/productos/${id}`);
      if (response.status === 200) {
        fetchProductos();
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
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
              {errors.nombre_producto && <div className="error-message">{errors.nombre_producto}</div>}

              <input
                type="number"
                placeholder="Precio"
                value={newProducto.precio_producto}
                onChange={(e) => setNewProducto({ ...newProducto, precio_producto: e.target.value })}
              />
              {errors.precio_producto && <div className="error-message">{errors.precio_producto}</div>}

              <input
                type="text"
                placeholder="Descripción"
                value={newProducto.descripcion_producto}
                onChange={(e) => setNewProducto({ ...newProducto, descripcion_producto: e.target.value })}
              />
              {errors.descripcion_producto && <div className="error-message">{errors.descripcion_producto}</div>}

              <input
                type="text"
                placeholder="Aroma"
                value={newProducto.aroma_producto}
                onChange={(e) => setNewProducto({ ...newProducto, aroma_producto: e.target.value })}
              />
              {errors.aroma_producto && <div className="error-message">{errors.aroma_producto}</div>}

              <input
                type="number"
                placeholder="Cantidad"
                value={newProducto.cantidad_producto}
                onChange={(e) => setNewProducto({ ...newProducto, cantidad_producto: e.target.value })}
              />
              {errors.cantidad_producto && <div className="error-message">{errors.cantidad_producto}</div>}

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
              {errors.marca_producto && <div className="error-message">{errors.marca_producto}</div>}

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
              {errors.seccion_producto && <div className="error-message">{errors.seccion_producto}</div>}

              <input
                type="file"
                placeholder="Imagen del Producto"
                onChange={(e) => {
                  setImagenPreview(URL.createObjectURL(e.target.files[0]));
                  setNewProducto({ ...newProducto, imagen_producto: e.target.files[0] });
                }}
              />
              {errors.imagen_producto && <div className="error-message">{errors.imagen_producto}</div>}
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
                  <button className="btn-delete" onClick={() => handleDelete(producto.id_producto)}>Eliminar</button>

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