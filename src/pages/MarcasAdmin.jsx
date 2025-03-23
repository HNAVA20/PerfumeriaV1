import React, { useState } from 'react';
import '../styles/MarcasAdmin.css';

function MarcasCrud() {
  const [marcas, setMarcas] = useState([
    { id: 1, nombre: 'Chanel' },
    { id: 2, nombre: 'Dior' },
    { id: 3, nombre: 'Gucci' }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newMarca, setNewMarca] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddMarca = () => {
    if (newMarca.trim()) {
      if (editIndex !== null) {
        const updatedMarcas = [...marcas];
        updatedMarcas[editIndex].nombre = newMarca;
        setMarcas(updatedMarcas);
        setEditIndex(null);
      } else {
        const newId = marcas.length > 0 ? marcas[marcas.length - 1].id + 1 : 1;
        setMarcas([...marcas, { id: newId, nombre: newMarca }]);
      }
      setNewMarca('');
      setModalOpen(false);
    }
  };

  const handleEditMarca = (index) => {
    setNewMarca(marcas[index].nombre);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDeleteMarca = (index) => {
    const updatedMarcas = marcas.filter((_, i) => i !== index);
    setMarcas(updatedMarcas);
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
          {marcas.map((marca, index) => (
            <tr key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditMarca(index)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteMarca(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editIndex !== null ? 'Editar Marca' : 'Agregar Marca'}</h3>
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

export default MarcasCrud;