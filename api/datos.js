export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw94ZykqzVa-_8JJBkbw4oHFkXfjCtYPs_2rUvjG6IrszMwSIuxL1QvMbxBGI9i9Og7Ew/exec');
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Error al cargar datos: ' + err.message });
  }
}
