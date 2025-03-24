import React, { useState, useEffect } from "react";
import "../styles/productosadmin.css"; // Asegúrate de tener el archivo CSS importado

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
  const [editId, setEditId] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  // Función para obtener los productos
  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const data = await response.json();
      console.log("Productos recibidos:", data);  // Verifica la respuesta aquí
      setProductos(Array.isArray(data) ? data : []);  // Asegura que sea un arreglo
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]);  // En caso de error, establece un arreglo vacío
    }
  };

  // Obtener marcas y secciones
  useEffect(() => {
    const fetchMarcas = async () => {
      const response = await fetch("http://localhost:3000/marcas");
      const data = await response.json();
      setMarcas(data);
    };

    const fetchSecciones = async () => {
      const response = await fetch("http://localhost:3000/secciones");
      const data = await response.json();
      setSecciones(data);
    };

    fetchProductos();  // Obtener productos
    fetchMarcas();     // Obtener marcas
    fetchSecciones();  // Obtener secciones
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos del formulario, incluida la imagen
    const formData = new FormData();
    formData.append("nombre_producto", newProducto.nombre_producto);
    formData.append("precio_producto", newProducto.precio_producto);
    formData.append("descripcion_producto", newProducto.descripcion_producto);
    formData.append("aroma_producto", newProducto.aroma_producto);
    formData.append("cantidad_producto", newProducto.cantidad_producto);
    formData.append("marca_producto", newProducto.marca_producto);
    formData.append("seccion_producto", newProducto.seccion_producto);

    // Verifica si hay una imagen y agrégala a FormData
    if (newProducto.imagen_producto) {
      formData.append("imagen_producto", newProducto.imagen_producto);
    }

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Producto guardado correctamente");
        setModalOpen(false);
        fetchProductos();  // Recarga la lista de productos después de guardar
      } else {
        alert("Error al guardar el producto");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar los datos.");
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
                  <td>{producto.precio_producto}</td>
                  <td>{producto.descripcion_producto}</td>
                  <td>{producto.aroma_producto}</td>
                  <td>{producto.cantidad_producto}</td>
                  <td>{producto.marca_producto}</td>
                  <td>{producto.seccion_producto}</td>
                  <td>
                    {producto.imagen_producto && (
                      <img
                        src={producto.imagen_producto}
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
                onChange={(e) =>
                  setNewProducto({ ...newProducto, nombre_producto: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Precio del producto"
                value={newProducto.precio_producto}
                onChange={(e) =>
                  setNewProducto({ ...newProducto, precio_producto: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Descripción del producto"
                value={newProducto.descripcion_producto}
                onChange={(e) =>
                  setNewProducto({ ...newProducto, descripcion_producto: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Aroma del producto"
                value={newProducto.aroma_producto}
                onChange={(e) =>
                  setNewProducto({ ...newProducto, aroma_producto: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Cantidad del producto"
                value={newProducto.cantidad_producto}
                onChange={(e) =>
                  setNewProducto({ ...newProducto, cantidad_producto: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setNewProducto({ ...newProducto, marca_producto: e.target.value })
                }
              >
                <option value="">Seleccionar Marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.nombre_marca}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) =>
                  setNewProducto({ ...newProducto, seccion_producto: e.target.value })
                }
              >
                <option value="">Seleccionar Sección</option>
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
              <button onClick={handleSubmit}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;
