export default async function handler(req, res) {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/ID-DE-TU-HOJA/export?format=csv'); // ejemplo, si usas CSV
    const data = await response.text(); // para CSV, si aplicara

    // PERO para Apps Script, usualmente necesitas algo como:
    const raw = await fetch('https://script.google.com/macros/s/TU_ID_SCRIPT/exec');
    const datos = await raw.json();

    const datosConIdTexto = datos.map(fila => ({
      ...fila,
      id: String(fila.id ?? '') // fuerza a string o vacío
    }));

    return res.status(200).json(datosConIdTexto);
  } catch (err) {
    return res.status(500).json({ error: 'Error al cargar datos: ' + err.message });
  }
}
