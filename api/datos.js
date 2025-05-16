export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwDJSyYBOAcNfyfQny3L1LMS09gmnp7fqWShicSTZG9Prk_Gp92chQHnbLGNnCORzkz0Q/exec');

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).json({ result: 'ok', raw: text });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Error al cargar datos: ' + err.message });
  }
}
