import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MarcasAdmin.css";

const API_URL = "http://localhost:3000/marcas"; // URL del backend

function MarcasCrud() {
  const [marcas, setMarcas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newMarca, setNewMarca] = useState("");
  const [editId, setEditId] = useState(null);

  // Obtener marcas al cargar la página
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

  const handleAddMarca = async () => {
    if (newMarca.trim()) {
      try {
        if (editId !== null) {
          // Editar marca existente
          await axios.put(`${API_URL}/${editId}`, { nombre_marca: newMarca });
        } else {
          // Agregar nueva marca
          const response = await axios.post(API_URL, { nombre_marca: newMarca });
          setMarcas([...marcas, response.data]);
        }

        setNewMarca("");
        setEditId(null);
        setModalOpen(false);
        fetchMarcas(); // Recargar marcas
      } catch (error) {
        console.error("Error al guardar marca:", error);
      }
    }
  };

  const handleEditMarca = (marca) => {
    setNewMarca(marca.nombre_marca);
    setEditId(marca.id_marca);
    setModalOpen(true);
  };

  const handleDeleteMarca = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMarcas(); // Recargar marcas después de eliminar
    } catch (error) {
      console.error("Error al eliminar marca:", error);
    }
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
                <button className="btn-edit" onClick={() => handleEditMarca(marca)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteMarca(marca.id_marca)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Marca" : "Agregar Marca"}</h3>
            <input
              type="text"
              placeholder="Nombre de la marca"
              value={newMarca}
              onChange={(e) => setNewMarca(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddMarca}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarcasCrud;
