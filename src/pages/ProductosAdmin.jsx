import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/productosadmin.css"; // Asegúrate de tener el archivo CSS importado
const API_URL = "http://localhost:3000/productos"; // URL del backend

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [secciones, setSecciones] = useState([]);
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
  const [editId, setEditId] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos");
        const data = await response.json();
        console.log("Productos recibidos:", data);
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
  
    const fetchMarcasYSecciones = async () => {
      try {
        const [marcasRes, seccionesRes] = await Promise.all([
          axios.get("http://localhost:3000/marcas"),
          axios.get("http://localhost:3000/secciones"),
        ]);
        setMarcas(marcasRes.data);
        setSecciones(seccionesRes.data);
      } catch (error) {
        console.error("Error al obtener marcas y secciones:", error);
      }
    };
  
    fetchProductos();
    fetchMarcasYSecciones();
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
        setNewProducto({ ...newProducto, imagen_producto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarProducto = async () => {
    try {
      const response = await axios.post("http://localhost:3000/productos", {
        nombre_producto: newProducto.nombre_producto,
        descripcion: newProducto.descripcion_producto,
        aroma: newProducto.aroma_producto,
        precio: parseFloat(newProducto.precio_producto),
        cantidad: parseInt(newProducto.cantidad_producto),
        id_mar: parseInt(newProducto.marca_producto),
        id_seccion: parseInt(newProducto.seccion_producto),
        imagen: newProducto.imagen_producto,
      });
  
      console.log("Respuesta del servidor:", response.data);
  
      // Actualiza lista de productos después de insertar
      const responseProductos = await axios.get("http://localhost:3000/productos");
      setProductos(responseProductos.data);
  
      // Cierra el modal
      setModalOpen(false);
  
      // Limpia el formulario
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
  
    } catch (error) {
      console.error("Error guardando producto:", error.response ? error.response.data : error);
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

      <div className="table-container">
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
              {Array.isArray(productos) && productos.length > 0 ? (
              productos.map((producto) => (
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
                      {producto.imagen && (
                        <img
                        src={producto.imagen}
                        alt={producto.nombre_producto}
                        width="50"
                      />
                      )}
                    </td>
                    <td>
                      <button className="btn-edit">Editar</button>
                      <button className="btn-delete">Eliminar</button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="10">No se encontraron productos.</td>
              </tr>
            )}
            </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Producto" : "Agregar Producto"}</h3>
            <div className="modal-body">
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

              {/* Select dinámico para Marcas */}
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
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.nombre_marca}
                  </option>
                ))}
              </select>

              {/* Select dinámico para Secciones */}
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
                {secciones.map((seccion) => (
                  <option key={seccion.id_seccion} value={seccion.id_seccion}>
                    {seccion.nombre_seccion}
                  </option>
                ))}
              </select>

              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagenPreview && <img src={imagenPreview} alt="Vista previa" width="100" />}
            </div>


            <div className="modal-actions">
              <button onClick={guardarProducto}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;
