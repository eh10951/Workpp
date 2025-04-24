const metro = {
  'Línea 1': ['Observatorio', 'Tacubaya', 'Juanacatlán', 'Chapultepec', 'Sevilla', 'Insurgentes', 'Cuauhtémoc', 'Balderas', 'Salto del Agua', 'Isabel la Católica', 'Pino Suárez', 'Merced', 'Candelaria', 'San Lázaro', 'Moctezuma', 'Balbuena', 'Blvd. Puerto Aéreo', 'Gómez Farías', 'Zaragoza', 'Pantitlán'],
  'Línea 2': ['Cuatro Caminos', 'Panteones', 'Tacuba', 'Cuitláhuac', 'Popotla', 'Colegio Militar', 'Normal', 'San Cosme', 'Revolución', 'Hidalgo', 'Bellas Artes', 'Allende', 'Zócalo', 'Pino Suárez', 'San Antonio Abad', 'Chabacano', 'Viaducto', 'Xola', 'Villa de Cortés', 'Nativitas', 'Portales', 'Ermita', 'General Anaya', 'Tasqueña'],
  'Línea 3': ['Indios Verdes', 'Deportivo 18 de Marzo', 'Potrero', 'La Raza', 'Tlatelolco', 'Guerrero', 'Hidalgo', 'Juárez', 'Balderas', 'Niños Héroes', 'Hospital General', 'Centro Médico', 'Etiopía', 'Eugenia', 'División del Norte', 'Zapata', 'Coyoacán', 'Viveros', 'Miguel Ángel de Quevedo', 'Copilco', 'Universidad'],
  'Línea 4': ['Martín Carrera', 'Talismán', 'Bondojito', 'Consulado', 'Canal del Norte', 'Morelos', 'Candelaria', 'Fray Servando', 'Jamaica', 'Santa Anita'],
  'Línea 5': ['Pantitlán', 'Hangares', 'Terminal Aérea', 'Oceanía', 'Aragón', 'Eduardo Molina', 'Consulado', 'Valle Gómez', 'Misterios', 'La Raza', 'Autobuses del Norte', 'Instituto del Petróleo', 'Politécnico'],
  'Línea 6': ['El Rosario', 'Tezozómoc', 'UAM-Azcapotzalco', 'Ferrería', 'Norte 45', 'Vallejo', 'Instituto del Petróleo', 'Lindavista', 'Deportivo 18 de Marzo', 'La Villa-Basílica', 'Martín Carrera'],
  'Línea 7': ['El Rosario', 'Aquiles Serdán', 'Camarones', 'Refinería', 'Tacuba', 'San Joaquín', 'Polanco', 'Auditorio', 'Constituyentes', 'Tacubaya', 'San Pedro de los Pinos', 'San Antonio', 'Mixcoac', 'Barranca del Muerto'],
  'Línea 8': ['Garibaldi', 'Bellas Artes', 'San Juan de Letrán', 'Salto del Agua', 'Doctores', 'Obrera', 'Chabacano', 'La Viga', 'Santa Anita', 'Coyuya', 'Iztacalco', 'Apatlaco', 'Aculco', 'Escuadrón 201', 'Atlalilco', 'Iztapalapa', 'Cerro de la Estrella', 'UAM-I', 'Constitución de 1917'],
  'Línea 9': ['Tacubaya', 'Patriotismo', 'Chilpancingo', 'Centro Médico', 'Lázaro Cárdenas', 'Chabacano', 'Jamaica', 'Mixiuhca', 'Velódromo', 'Ciudad Deportiva', 'Puebla', 'Pantitlán'],
  'Línea A': ['Pantitlán', 'Agrícola Oriental', 'Canal de San Juan', 'Tepalcates', 'Guelatao', 'Peñón Viejo', 'Acatitla', 'Santa Marta', 'Los Reyes', 'La Paz'],
  'Línea B': ['Ciudad Azteca', 'Plaza Aragón', 'Olimpica', 'Ecatepec', 'Múzquiz', 'Río de los Remedios', 'Impulsora', 'Nezahualcóyotl', 'Villa de Aragón', 'Bosque de Aragón', 'Deportivo Oceanía', 'Oceanía', 'Romero Rubio', 'Ricardo Flores Magón', 'San Lázaro', 'Morelos', 'Tepito', 'Lagunilla', 'Garibaldi', 'Guerrero', 'Buenavista'],
  'Línea 12': ['Mixcoac', 'Insurgentes Sur', 'Hospital 20 de Noviembre', 'Zapata', 'Parque de los Venados', 'Eje Central', 'Ermita', 'Mexicaltzingo', 'Atlalilco', 'Culhuacán', 'San Andrés Tomatlán', 'Lomas Estrella', 'Calle 11', 'Periférico Oriente', 'Tezonco', 'Olivos', 'Nopalera', 'Zapotitlán', 'Tlaltenco', 'Tláhuac']
};

const transbordos = {};
for (const linea in metro) {
  for (const estacion of metro[linea]) {
    if (!transbordos[estacion]) transbordos[estacion] = [];
    transbordos[estacion].push(linea);
  }
}

function encontrarRuta(origen, destino) {
  const grafo = {};

  for (const linea in metro) {
    const estaciones = metro[linea];
    for (let i = 0; i < estaciones.length; i++) {
      if (!grafo[estaciones[i]]) grafo[estaciones[i]] = new Set();
      if (i > 0) grafo[estaciones[i]].add(estaciones[i - 1]);
      if (i < estaciones.length - 1) grafo[estaciones[i]].add(estaciones[i + 1]);
    }
  }

  const visitados = new Set();
  const cola = [[origen]];
  while (cola.length > 0) {
    const ruta = cola.shift();
    const actual = ruta[ruta.length - 1];

    if (actual === destino) return ruta;

    if (!visitados.has(actual)) {
      visitados.add(actual);
      for (const vecino of grafo[actual] || []) {
        cola.push([...ruta, vecino]);
      }
    }
  }
  return [];
}

function obtenerLineas(estacion) {
  return transbordos[estacion] || [];
}

function calcularRuta() {
  const estacionInicio = document.getElementById('estacion-inicio').value;
  const estacionFin = document.getElementById('estacion-fin').value;

  const ruta = encontrarRuta(estacionInicio, estacionFin);
  if (ruta.length === 0) {
    document.getElementById('resultado').innerText = 'No se encontró ruta.';
    return;
  }

  let mensaje = `Ruta más corta desde ${estacionInicio} hasta ${estacionFin}:\n\n`;

  mensaje += ruta.join(' -> ');

  let transbordosMsg = '';

  let lineaActual = obtenerLineas(ruta[0])[0];

  for (let i = 1; i < ruta.length; i++) {
    const lineas = obtenerLineas(ruta[i]);
    if (!lineas.includes(lineaActual)) {
      transbordosMsg += `\n\nTransbordo en ${ruta[i]}: ${lineaActual} → ${lineas[0]}`
      lineaActual = lineas[0];
    }
  }


  if (transbordosMsg) {
    mensaje += `\n\nTransbordos:${transbordosMsg}`;
  }

  document.getElementById('resultado').innerText = mensaje;
}

async function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  let contenido = document.getElementById("resultado").innerText;

  // Limpieza del contenido
  contenido = contenido.replace(/→/g, '->');

  contenido = contenido.replace(/\*\*(.*?)\*\*/g, '$1');
  // Reemplaza solo los caracteres que realmente te den problemas
  contenido = contenido.replace(/[^\x00-\x7FáéíóúÁÉÍÓÚñÑ→\s,.:()]/g, '');
  contenido = contenido.trim();
  contenido = contenido.replace(/ {2,}/g, ' ');
  contenido = contenido.replace(/\n{3,}/g, '\n\n');

  //  Ajuste de líneas
  const lineas = doc.splitTextToSize(contenido, 180);

  let y = 20;
  const espacioLinea = 7;

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ruta del Metro CDMX", 15, y);
  y += 10;

  // Cuerpo del texto
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  lineas.forEach(linea => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(linea, 15, y);
    y += espacioLinea;
  });

  doc.save("ruta_metro.pdf");

}