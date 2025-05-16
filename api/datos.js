export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbytjA9uNX2e2bpCcYTXvkdh-6eHCY0Q7f9hTHCGqDrX0Z3miix70z4Mc_n6i2BAH8zVWQ/exec');
    const text = await response.text();
    console.log("Respuesta cruda del script:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: 'Respuesta no es JSON válido', detalle: text });
    }

    if (!Array.isArray(data)) {
      return res.status(500).json({ error: 'Respuesta inesperada del script', detalle: data });
    }

    const datosConIdTexto = data.map(fila => ({
      ...fila,
      id: String(fila.id ?? '')
    }));

    return res.status(200).json(datosConIdTexto);
  } catch (err) {
    return res.status(500).json({ error: 'Error al cargar datos: ' + err.message });
  }
}