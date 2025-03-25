import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "../styles/MarcasAdmin.css";

// Definir esquema de validación con Yup
const schema = yup.object().shape({
  nombre_marca: yup
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .required("El nombre de la marca es obligatorio"),
});

const API_URL = "http://localhost:3000/marcas"; // URL del backend

function MarcasCrud() {
  const [marcas, setMarcas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get(API_URL);
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener marcas:", error);
    }
  };

  const formik = useFormik({
    initialValues: { nombre_marca: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editId !== null) {
          await axios.put(`${API_URL}/${editId}`, values);
        } else {
          const response = await axios.post(API_URL, values);
          setMarcas([...marcas, response.data]);
        }
        resetForm();
        setEditId(null);
        setModalOpen(false);
        fetchMarcas();
      } catch (error) {
        console.error("Error al guardar marca:", error);
      }
    },
  });

  const handleEditMarca = (marca) => {
    formik.setValues({ nombre_marca: marca.nombre_marca });
    setEditId(marca.id_marca);
    setModalOpen(true);
  };

  const handleDeleteMarca = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMarcas();
    } catch (error) {
      console.error("Error al eliminar marca:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Marcas</h2>
      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Marca
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="marcas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id_marca}>
              <td>{marca.id_marca}</td>
              <td>{marca.nombre_marca}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditMarca(marca)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDeleteMarca(marca.id_marca)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Marca" : "Agregar Marca"}</h3>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="nombre_marca"
                placeholder="Nombre de la marca"
                value={formik.values.nombre_marca}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.nombre_marca && formik.errors.nombre_marca
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.nombre_marca && formik.errors.nombre_marca && (
                <div className="error-message">{formik.errors.nombre_marca}</div>
              )}

              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button className="btn-back" onClick={handleBack}>
        ← Regresar
      </button>
    </div>
  );
}

export default MarcasCrud;
