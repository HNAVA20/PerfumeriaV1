import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/seccionesadmin.css";

const API_URL = "http://localhost:3000/secciones"; // URL del backend

function SeccionesAdmin() {
  const [secciones, setSecciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSeccion, setNewSeccion] = useState("");
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

  const handleAddSeccion = async () => {
    if (newSeccion.trim()) {
      try {
        if (editId !== null) {
          // Editar sección existente
          await axios.put(`${API_URL}/${editId}`, { nombre_seccion: newSeccion });
        } else {
          // Agregar nueva sección
          const response = await axios.post(API_URL, { nombre_seccion: newSeccion });
          setSecciones([...secciones, response.data]);
        }

        setNewSeccion("");
        setEditId(null);
        setModalOpen(false);
        fetchSecciones(); // Recargar secciones
      } catch (error) {
        console.error("Error al guardar sección:", error);
      }
    }
  };

  const handleEditSeccion = (seccion) => {
    setNewSeccion(seccion.nombre_seccion);
    setEditId(seccion.id_seccion);
    setModalOpen(true);
  };

  const handleDeleteSeccion = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSecciones(); // Recargar secciones después de eliminar
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
            <input
              type="text"
              placeholder="Nombre de la sección"
              value={newSeccion}
              onChange={(e) => setNewSeccion(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddSeccion}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeccionesAdmin;
