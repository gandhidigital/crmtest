import React, { useState } from 'react';
import './App.css';

const tiposProyecto = ['A', 'B', 'C', 'D', 'E', 'X'];
const estatusProyecto = ['Contacto Inicial', 'Propuesta Entregada', 'Vendido', 'Entregado'];

function App() {
  const [datos, setDatos] = useState([
    {
      cliente: 'Empresa Ejemplo',
      tipo: 'A',
      contacto: 'Juan Pérez',
      estatus: 'Contacto Inicial',
      entrega: '2025-06-01',
    }
  ]);

  const actualizarDato = (index, campo, valor) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index][campo] = valor;
    setDatos(nuevosDatos);
  };

  const agregarFila = () => {
    const nuevaFila = {
      cliente: '',
      tipo: 'A',
      contacto: '',
      estatus: 'Contacto Inicial',
      entrega: '',
    };
    setDatos([...datos, nuevaFila]);
  };

  const eliminarFila = (index) => {
    const nuevosDatos = datos.filter((_, i) => i !== index);
    setDatos(nuevosDatos);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>CRM de Proyectos</h2>
      <button onClick={agregarFila} style={{ marginBottom: '1rem' }}>Agregar nueva fila</button>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo de Proyecto</th>
            <th>Contacto Principal</th>
            <th>Estatus Actual</th>
            <th>Entrega de Proyecto</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              <td>
                <input
                  value={fila.cliente}
                  onChange={(e) => actualizarDato(index, 'cliente', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={fila.tipo}
                  onChange={(e) => actualizarDato(index, 'tipo', e.target.value)}
                >
                  {tiposProyecto.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  value={fila.contacto}
                  onChange={(e) => actualizarDato(index, 'contacto', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={fila.estatus}
                  onChange={(e) => actualizarDato(index, 'estatus', e.target.value)}
                >
                  {estatusProyecto.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="date"
                  value={fila.entrega}
                  onChange={(e) => actualizarDato(index, 'entrega', e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={() => eliminarFila(index)}
                  style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.4rem 0.8rem', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
