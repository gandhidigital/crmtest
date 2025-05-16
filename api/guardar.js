export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw94ZykqzVa-_8JJBkbw4oHFkXfjCtYPs_2rUvjG6IrszMwSIuxL1QvMbxBGI9i9Og7Ew/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

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
