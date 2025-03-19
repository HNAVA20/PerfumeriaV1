import React, { useState } from 'react';
import '../styles/seccionesadmin.css';

function SeccionesCrud() {
  const [secciones, setSecciones] = useState([
    { id: 1, nombre: 'Perfumería' },
    { id: 2, nombre: 'Ofertas' },
    { id: 3, nombre: 'Novedades' }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newSeccion, setNewSeccion] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSeccion = () => {
    if (newSeccion.trim()) {
      if (editIndex !== null) {
        const updatedSecciones = [...secciones];
        updatedSecciones[editIndex].nombre = newSeccion;
        setSecciones(updatedSecciones);
        setEditIndex(null);
      } else {
        const newId = secciones.length > 0 ? secciones[secciones.length - 1].id + 1 : 1;
        setSecciones([...secciones, { id: newId, nombre: newSeccion }]);
      }
      setNewSeccion('');
      setModalOpen(false);
    }
  };

  const handleEditSeccion = (index) => {
    setNewSeccion(secciones[index].nombre);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDeleteSeccion = (index) => {
    const updatedSecciones = secciones.filter((_, i) => i !== index);
    setSecciones(updatedSecciones);
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
          {secciones.map((seccion, index) => (
            <tr key={seccion.id}>
              <td>{seccion.id}</td>
              <td>{seccion.nombre}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditSeccion(index)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteSeccion(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editIndex !== null ? 'Editar Sección' : 'Agregar Sección'}</h3>
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

export default SeccionesCrud;
