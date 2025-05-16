export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('await fetch('https://script.google.com/macros/s/AKfycb.../exec', {
  method: 'POST',
  body: JSON.stringify(fila),
  headers: {
    'Content-Type': 'application/json',
  },
});
', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    // Intentar interpretar como JSON. Si no es posible, devolver como texto.
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).json({ result: 'ok', raw: text });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Error en proxy: ' + err.message });
  }
}
