// functions/index.js

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  // Solo queremos intervenir si alguien entra exactamente a la raíz "vanter.net/"
  if (url.pathname === '/') {
    
    // 1. Leemos el idioma oculto que el navegador pide por defecto
    const acceptLang = request.headers.get('accept-language') || '';
    const supportedLangs = ['es', 'fr', 'jp'];
    
    // 2. Comparamos para ver si soportamos su idioma
    let targetLang = 'en'; // Inglés por defecto
    
    for (const lang of supportedLangs) {
      // acceptLang suele verse así: "es-MX,es;q=0.9,en;q=0.8"
      if (acceptLang.includes(lang)) {
        targetLang = lang;
        break;
      }
    }

    // 3. Redirigimos desde el servidor (El navegador no parpadea, solo obedece)
    url.pathname = `/${targetLang}/`;
    return Response.redirect(url.toString(), 302);
  }

  // Si no es la raíz (ej. ya está en /es/services), lo dejamos pasar normalmente
  return context.next();
}