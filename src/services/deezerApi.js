const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
// const CORS_PROXY = "https://cors.isomorphic-git.org/";
const BASE = "https://api.deezer.com";  
export async function searchDeezer(term, limit=3) {
    //concatena proxy cors
    const url = `${CORS_PROXY}${BASE}/search?q=${encodeURIComponent(term)}&limit=${limit}`;
    const res = await fetch(url);//realiza petición
    if(!res.ok) throw new Error(`Deezer HTTP ${res.status}`);//verifica respuesta NO exitosa(status distinto de 200-299)
    const data = await res.json();
    //retorna arreglo de resultados
    //data.data contiene canciones encontradas
    //si no existe, regresamos arreglo vacío para evitar errores
    return data.data || [];
}