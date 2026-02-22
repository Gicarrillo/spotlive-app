import React, { useState } from 'react';
import { searchVideos } from '../services/youtubeApi';

function MyVideosApp() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el spinner o mensaje de carga
  const [username, setUsername] = useState("");

  const handleSearch = async () => {
    setLoading(true); // Iniciamos la carga
    try {
      // Usamos un término dinámico o el que definiste
      const data = await searchVideos(username);
      setResults(data);
    } catch (err) {
      alert("Hubo un error al obtener los videos");
    } finally {
      setLoading(false); // Finalizamos la carga (sea éxito o error)
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>YouTube Test App</h1>
      <h2>Buscar artista en Instagram</h2>

       <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Ej: badbunnypr"
        style={{ padding:10, marginRight:10 }}
      />

      <button onClick={handleSearch}>Buscar</button>
        {/* // onClick={handleSearch}  */}
        {/* // disabled={loading} */}
        {/* // style={{ padding: '10px 20px', cursor: 'pointer' }} */}
        {/* {loading ? 'Buscando...' : `Buscar Videos de ${username}`} */}
      {/* </button> */}

      <hr />

      {/* Grid simple para mostrar los resultados */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '20px' 
      }}>
        {results.map(video => (
          <div key={video.id.videoId} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            {/* <img 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title} 
              style={{ width: '100%', borderRadius: '4px' }}
            /> */}
            <img 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title}
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{ padding: '10px' }}>
              <h4 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>{video.snippet.title}</h4>
              <small>{video.snippet.channelTitle}</small>
            </div>
            {/* <h4 style={{ fontSize: '14px', margin: '10px 0' }}>{video.snippet.title}</h4> */}
            <a 
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Ver video →
            </a>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && (
        <p>No hay resultados. Haz clic en el botón para buscar.</p>
      )}
    </div>
  );
}

export default MyVideosApp;