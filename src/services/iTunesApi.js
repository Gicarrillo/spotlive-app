//Exportar función asíncrona (searchitunes), esta pemitirá ser utilizada desde otros archivos o componentes
export async function searchItunes(term, limit=4) {
    //construir url para consumir la api pública de iTunes
    // - term: termino de busqueda, se codifica para url
    // - media=music indica que se buscará de contenido musical
    // - entity=song especifica que solo se desean canciones
    // - limit define numero máximo de resultados a devolver
    const url =
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}`+
        `&media=music&entity=song&limit=${limit}`;
    //se hace petición http a la api de itunes usando fetch
    //await detiene ejecución hasta recibir respuesta del servidor
    const res = await fetch(url);
    //validar si respuesta fue exitosa. Si ocurre error, se lanza una excepción con código http
    if(!res.ok) throw new Error(`iTunes HTTP ${res.status}`);
    const data = await res.json(); //convierte respuesta obtenida a JSON
    //retorna arreglo de resultados obtenidos desde API. Si no existen resultado, se devuelve un arreglo vacío
    return data.results || [];
}