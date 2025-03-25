import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/seccionesadmin.css";

const API_URL = "http://localhost:3000/secciones"; // URL del backend

const validationSchema = Yup.object().shape({
  nombre_seccion: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre de la sección es obligatorio"),
});

function SeccionesAdmin() {
  const [secciones, setSecciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // Obtener secciones al cargar la página
  useEffect(() => {
    fetchSecciones();
  }, []);

  const fetchSecciones = async () => {
    try {
      const response = await axios.get(API_URL);
      setSecciones(response.data);
    } catch (error) {
      console.error("Error al obtener secciones:", error);
    }
  };

  const formik = useFormik({
    initialValues: { nombre_seccion: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editId !== null) {
          await axios.put(`${API_URL}/${editId}`, values);
        } else {
          await axios.post(API_URL, values);
        }
        formik.resetForm();
        setEditId(null);
        setModalOpen(false);
        fetchSecciones();
      } catch (error) {
        console.error("Error al guardar sección:", error);
      }
    },
  });

  const handleEditSeccion = (seccion) => {
    formik.setValues({ nombre_seccion: seccion.nombre_seccion });
    setEditId(seccion.id_seccion);
    setModalOpen(true);
  };

  const handleDeleteSeccion = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSecciones();
    } catch (error) {
      console.error("Error al eliminar sección:", error);
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Secciones</h2>

      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Sección
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="secciones-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {secciones.map((seccion) => (
            <tr key={seccion.id_seccion}>
              <td>{seccion.id_seccion}</td>
              <td>{seccion.nombre_seccion}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditSeccion(seccion)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteSeccion(seccion.id_seccion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Sección" : "Agregar Sección"}</h3>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="nombre_seccion"
                placeholder="Nombre de la sección"
                value={formik.values.nombre_seccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre_seccion && formik.errors.nombre_seccion ? (
                <div className="error">{formik.errors.nombre_seccion}</div>
              ) : null}
              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeccionesAdmin;
