import React, { useState, useEffect } from 'react';
import './App.css';

const tiposProyecto = ['Elegir', 'A', 'B', 'C', 'D', 'E', 'X'];
const estatusProyecto = [
  'Lead',
  'Contacto Inicial',
  'Propuesta Entregada',
  'Vendido',
  'Entregado',
  'Detenido',
  'Presentación',
  'Propuesta',
  'Firma de Contrato'
];
const plataformas = ['Sin Definir', 'VTEX', 'Shopify', 'Duda', 'BigCommerce', 'B2C BC', 'B2B BC', 'B2C-B2B BC'];

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('/api/datos')
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error('Error al cargar datos:', err));
  }, []);

  const actualizarDato = (index, campo, valor) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index][campo] = valor;
    setDatos(nuevosDatos);
  };

  const agregarFila = () => {
    const nuevaFila = {
      cliente: '',
      tipo: 'Elegir',
      contacto: '',
      estatus: 'Lead',
      entrega: '',
      plataforma: 'Sin Definir',
    };
    setDatos([...datos, nuevaFila]);
  };

  const eliminarFila = (index) => {
    const nuevosDatos = datos.filter((_, i) => i !== index);
    setDatos(nuevosDatos);
  };

  const guardarFila = async (fila) => {
    try {
      const res = await fetch('/api/guardar', {
        method: 'POST',
        body: JSON.stringify(fila),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const text = await res.text();

      if (res.ok) {
        alert('Fila guardada en Google Sheets');
      } else {
        alert('Error al guardar fila: ' + text);
      }
    } catch (err) {
      alert('Error de red al guardar fila: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>CRM de Proyectos</h2>
      <button onClick={agregarFila} className="agregar">Agregar nueva fila</button>
      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo de Proyecto</th>
              <th>Contacto Principal</th>
              <th>Estatus Actual</th>
              <th>Entrega de Proyecto</th>
              <th>Plataforma</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={fila.cliente || ''}
                    onChange={(e) => actualizarDato(index, 'cliente', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    style={{ width: '100px' }}
                    value={fila.tipo || 'Elegir'}
                    onChange={(e) => actualizarDato(index, 'tipo', e.target.value)}
                  >
                    {tiposProyecto.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    value={fila.contacto || ''}
                    onChange={(e) => actualizarDato(index, 'contacto', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    style={{ width: '160px' }}
                    value={fila.estatus || 'Lead'}
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
                    style={{ width: '130px' }}
                    value={fila.entrega || ''}
                    onChange={(e) => actualizarDato(index, 'entrega', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    style={{ width: '160px' }}
                    value={fila.plataforma || 'Sin Definir'}
                    onChange={(e) => actualizarDato(index, 'plataforma', e.target.value)}
                  >
                    {plataformas.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => guardarFila(fila)}
                    className="guardar"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => eliminarFila(index)}
                    className="eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
