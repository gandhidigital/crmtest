export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbytjA9uNX2e2bpCcYTXvkdh-6eHCY0Q7f9hTHCGqDrX0Z3miix70z4Mc_n6i2BAH8zVWQ/exec', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();

    if (response.ok) {
      return res.status(200).json({ mensaje: 'Guardado correctamente', respuesta: text });
    } else {
      return res.status(response.status).json({ error: 'Falla desde Google Script', detalle: text });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Error en backend: ' + err.message });
  }
}
