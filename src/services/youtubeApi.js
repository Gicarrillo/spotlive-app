const API_KEY = 'AIzaSyA8cYAj90dr0ECXZCbaYfuk5BcyXv2NDRc';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query) => {
  // 1. Construimos los parámetros de búsqueda
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    maxResults: '8',
    key: API_KEY,
    type: 'video',
    videoEmbeddable: 'true'
  });

  try {
    // 2. Realizamos la petición con fetch
    const response = await fetch(`${BASE_URL}/search?${params.toString()}`);

    // 3. Validamos si la respuesta es exitosa (fetch no lanza error en 404/500)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // 4. Convertimos la respuesta a JSON
    const data = await response.json();
    
    return data.items;
  } catch (error) {
    console.error("Error en la llamada:", error);
    throw error;
  }
};
