export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxw5quM3_ULlKHSPss8HXTleF_WeiWD_i8PLjudbiADbbj5lRaGQSWBlvelEXbrdIOW/exec');
    const data = await response.json();

    // Asegura que todos los registros tengan el ID como string
    const datosConIdTexto = data.map(fila => ({
      ...fila,
      id: String(fila.id ?? '')
    }));

    return res.status(200).json(datosConIdTexto);
  } catch (err) {
    return res.status(500).json({ error: 'Error al cargar datos: ' + err.message });
  }
}
