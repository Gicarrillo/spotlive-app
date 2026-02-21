// Importamos todos los elementos y archivos a utilizar

import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import TrackList from "../components/TrackList";
import TrackDetails from "../components/TrackDetails";
import { searchInstagramProfile } from '../services/instagramApi';


// import RecomendationsList from "./components/RecommendationsList";
// import HistoryPanel from "./components/HistoryPanel";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebaseConfig"

import { searchItunes } from "../services/iTunesApi";
import { searchDeezer } from "../services/deezerApi";
import Mapa from "../components/mapa";
import { field } from "firebase/firestore/pipelines";
import Navbar from "./Navbar";
// Importamos estilos
// import "./App.css"
// Recibimos lo que devuelve la API de iTunes
function normalizeItunesTrack(t) {
  return{
    id: `itunes-${t.trackId}`,
    title: t.trackName,
    artist: t.artistName,
    album: t.collectionName,
    image: (t.artworkUrl100 || "").replace("100x100", "200x200"),
    previewUrl: t.previewUrl || null,
    urlcompleta: t.trackViewUrl || null,
    source: "iTunes API",
    seed: t.artistName, 
  };
}
// Recibimos los datos que devuelve la API de dezeer
function normalizeDeezerTrack(t) {
  return{
    id: `deezer-${t.id}`,
    title: t.title,
    artist: t.artist?.name,
    album: t.album?.title,
    image: t.album?.cover_medium || "",
    previewUrl: t.preview || null,
    urlcompleta: t.link || null,
    source: "Deezer API",
    seed: t.artist?.name,
  };
}
// Declaramos y exportamos la Aplicación para su ejecución
export default function Evento() {
  const { id } = useParams();
  const db = getFirestore(app);
  const [datosevento, setDatoseventos] = useState(null);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [recs, setRecs] = useState([]);
  // const [history, setHistory] = useState([]);
  // Para mostrar el historial y guardar lo que existan
  const [history, setHistory] = useState(() =>
  {
    // Busca si hay historial guardado en el navegador
    const guardados =localStorage.getItem("history");
    // Condición para guardar los datos que hay o para dejar el arreglo vacío
    return guardados ? JSON.parse(guardados) : [];
  });
// Estado para manejar los mensajes de cargando y error
  const [loadinginsta, setLoadinginsta] = useState(false);
  const  [errorinsta, setErrorinsta] = useState("");
  // Estado para controlar el mensaje de resultados
  const[result, setResult] = useState(false);
  // Estado para el mensaje de cargando con tiempo
  const [tiempo, setTiempo] = useState(false);

// Filtrar para ordenar alfabeticamente
  const[orden, setOrden] = useState("none");
  // Filtrar por fuente
  const[fuente, setFuente] = useState("all");
  // Para ordenar segun el artista
  const[artista, setArtista] = useState("all");

  // const db =getFirestore(app);
  // Para guardar el historial
  // Cada que cambie history se guarda uno nuevo
//   useEffect(() => {
//     // Se gaurdan los datos con la clave history
//     // JSON.stringfy convierte el arreglo de la canción en texto
//     localStorage.setItem("history", JSON.stringify(history));
    // [history] para determinar que se ejecuta cuando cambia history
//   }, [history]);
useEffect(() => {
  async function obtenerEvento() {
    try{
      const docRef = doc(db, "eventos", id);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        const data = docSnap.data();

        setDatoseventos(data);

        if(data.artista) {
          runSearch(data.artista);
        }
      }
    } catch (error) {
      console.error("Error al obtener evento", error);
    }
    
  }
  if(id){
    obtenerEvento();
  }
}, [id, db]);
  // Paso C2: función principal de busqueda (llama a 2 APIs)
  async function runSearch(term) {
    setError("");
    setLoading(true);
    setSelected(null);
    setRecs([]);
    setTracks([]);
    // Se modifica el valor de result para mostra el mensaje
    setResult(true);
    // Para mostrar si tarda mucho la api
    setTiempo(false);
    // Tiempo que espera la Api para mostrar el mensaje
    // Se asigno poco tiempo para  verificar que haya sido implementada correctamente
    const tiempos=setTimeout(() => {
      setTiempo(true);
    }, 500);

    // Guardar historial
    // setHistory((prev) => [{term, time: Date.now() }, ...prev].slice(0,8));
    try{
      // Llamadas paralelas a 2 plataformas
      const [itunesResults, deezerResults] = await Promise.all([
        searchItunes(term, 8),
        searchDeezer(term, 8),
      ]);

      // Normalizar y combinar resultados
      const itunes = itunesResults.map(normalizeItunesTrack);
      const deezer = deezerResults.map(normalizeDeezerTrack);

      setTracks([...itunes, ...deezer]);
    } catch (e) {
      setError(e.message || "Ocurrio un error consultando las APIs");
    } finally {
      // Para reiniciar el tiempo cada que finalice una carga
      clearTimeout(tiempos);
      setLoading(false);
      // Desactiva el mensaje de la API lenta
      setTiempo(false);
    }
  }

    const buscarPerfil = async () => {
    if (!username) return;

    try {
      setLoadinginsta(true);
      setError("");
      setProfile(null);
      const data = await searchInstagramProfile(username);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadinginsta(false);
    }
  };

  //Pasi C3: al seleccionar una canción, generar recomendaciones
  async function handleSelect(track) {
    setSelected(track);
    setRecs([]);
    setError("");
    // Que cargando sea cierto
    setLoading(true);
    try{
      const seed = track.seed || track.artist || track.title;
      const deezerResults = await searchDeezer(seed, 10);
      const normalized = deezerResults.map(normalizeDeezerTrack);

      // Quitar coincidencias directas
      const filtered = normalized.filter((x) => x.title !== track.title).slice(0, 8);
      setRecs(filtered);
    } catch (e) {
      setError(e.message || "Error al obtener recomendaciones");
    } finally {
      setLoading(false);
    }
  }
  // Funicón para eliminar historial
//   function eliminarhistorial() {
//     // Vaciamos el arreglo
//     setHistory([]);
//     // Borramos del navegador los datos que tengamos con la clave de history
//     localStorage.removeItem("history") 
//   }
  // Agregue para ver el total de canciones
  // console.log(tracks.length)
  // Filtros que se aplican
  // Crea la lista de los resultados filtrados que se visualizará
  const tracksFiltrados = tracks.filter((t) => {
    // Crea una lista de los que son filtrados considerando su fuente
  const coincideFuente =
  // Si fuente es todos o source igual a la fuente seleccionada
    fuente === "all" || t.source === fuente;
  // Si la opción es todos muestra sin importar el artista
  // Se la opción es artista muestra solo las que coincidan con el artista
  const coincideArtista =
    artista === "all" || t.artist === artista;
  //La canción debe cumplir con ambas condiciones para mostrarse
  return coincideFuente && coincideArtista;
});
// Crea la lista de los artistas que aparecen al consultar los datos
const artistasDisponibles = [
  // Muestra en el select a los artistas sin repeticiones(set)
  // Elimina valores vacios o nulos con (Boolean)
  ...new Set(tracks.map(t => t.artist).filter(Boolean))
];
// Crea la lista de las canciones por titulo ordenadas de a-z o z-a
// se utiliza sort para saber cual va primero entre caso va primero el valor de a y luego b
const tracksOrdenados = [...tracksFiltrados].sort((a, b) => {
  if (orden === "az")
    // localeCompare compara dos textos para ordenar alfabeticamente
    return a.title.localeCompare(b.title);

  if (orden === "za")
    return b.title.localeCompare(a.title);
// Es para que no se modifiquen los elementos
  return 0;
});



  return(
    <>
    <Navbar/>
    <div className="main-container">
      <div className="lado-izquierdo">
        <div className="filtros-resultados">
          <select
          onChange={(e) => {
          // Modifica el valor de la fuente para que se cambie al que selecciono
          setFuente(e.target.value);}}
          className="selectionar btn-filtro"
          aria-label="Filtar resultados" style={{ padding: 8, borderRadius: 8, width: "25%" }}> 
            {/* Opciones que se muestra que puede seleccionar */}
            <option value="all">Todos</option>
            <option value="iTunes API">iTunes</option>
            <option value="Deezer API">Deezer</option>
            </select>
                      
          {/* Lista desplegable para ordenar alfabeticamente de forma normal o inversa */}
          <select className="btn-filtro"
          // SetOrden toma el valor con el cual se va a ordenar
          onChange={(e) => setOrden(e.target.value)}
          style={{ padding: 8, borderRadius: 8, width: "25%", marginTop: 5 }}>
           {/* Opciones que tiene para ordenar los titulos */}
            <option value="none">Sin orden</option>
            <option value="az">Titulo A-Z</option>
            <option value="za">Titulo Z-A</option>
          </select>
          <h6>Resultados {tracksFiltrados.length} (Cátalogo)</h6>
        </div>

        {/* EVENTOOOOO Y LISTASSS */}
        <div className="evento container">
        <TrackDetails track={selected} evento={datosevento}/>
          <div className="card-lista">
            <TrackList items={tracksOrdenados} onSelect={handleSelect}/>
          </div>
        </div>
          <div className="container">
            <div style={{padding: 16, fontFamily: "Arial"}}>
              {/* <h4 style={{marginTop: 0}}>
                Detalles del Evento
              </h4> */}
              {/* <SearchBar onSearch={runSearch} loading={loading}/> */}

              <div>
                {/* <HistoryPanel history={history} onPick={runSearch} onlimpiar={eliminarhistorial}/> */}
                <div>
                  {/* Si loaging es true muestra el mensaje de cargando */}
                  {loading && (
                    <div className="card card-cargando" style={{padding: 12, border: "1px solid #ddd", borderRadius: 10}}>
                      Cargando...
                      <div className="spinner" style={{padding: 12, margin: 10}}>

                      </div>
                    </div>
                  )}
                  {/* Para mostrar mensaje si ha tardado mucho, valida que loading y tiempo esten en verdadero*/}
                  {loading && tiempo && (
                    <div className="card card-lento" style={{ margin: 20, padding:12, border: "1px solid #ddd", borderRadius: 10}}>
                      La API está cargando los resultados, podría tardar un poco
                    </div>
                  )}
                  {/* Si error es verdadero muestra mensaje de error */}
                  {error &&(
                    <div style={{padding: 12, border: "1px solid #ffb3b3", borderRadius: 10, background: "#f4c5"}}>
                      <b>Error: </b> {error}
                    </div>
                  )}
                  {/* Condicion para mostrar  mensaje sino se encuentran resultados */}
                  {/* {result && !loading && !error && tracks.length === 0 &&(
                    <div className="card card-noresult" style={{padding:12, border: "1px solid #ddd", borderRadius: 10}}>
                      No se encontraron resultados
                    </div>
                  ) } */}
                  {/*Se modificaron los elementos de la conción ya que desde result
                  se pued econsultar cuando ya se realizo una busqueda y cuando no  */}
                  {!result && (
                    <div className="card" style={{padding: 12, border: "1px solid #ddd", borderRadius: 10}}>
                      No hay canciones del artista
                      </div>
                  )}
                  {tracks.length > 0 && (
                    <>
                    
                    {/* <TrackList items={tracks} onSelect={handleSelect}/>
                    <TrackDetails track={selected}/>
                    </> */}
                    <div>
                      {/* Lista desplegable para saber que filtro aplicar */}

                      {/* Valida no haya tracks filtrados y muestra un mensaje que le avise al usuario */}
                      {tracksFiltrados.length === 0 &&(
                    <div className="card" style={{padding: 12, border: "1px solid #ddd", borderRadius: 10}}>
                      No se obtuvieron resultados
                    </div>
                  )}
                  </div>
                  {/* Muestra los resultados de las listas filtradas */}
                      <div className="card-lista">

                        {/* <TrackList items={tracksOrdenados} onSelect={handleSelect}/> */}
                        <div>
                          {/* Muestra solo el card si se ha seleccionado una canción */}

                      </div>
                      </div>
                      {/* Muestra las recomendaciones */}
                      <div className="card-lista" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
                        {/* <RecomendationsList items={recs} onSelect={handleSelect}/>                   */}
                      </div>
                    </>
                )}
                  {/* <RecomendationsList items={recs} onSelect={handleSelect}/> */}
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="lado-derecho">
        <div className="card-insta" style={{ padding: 20}}>
      
          <h2>Buscar artista en Instagram</h2>
          <div className="forminsta">
            <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Ej: badbunnypr"
            style={{ padding:8, marginRight:10, borderRadius: 50 }}
          />

          <button className="btn-buscar-insta" onClick={buscarPerfil}>Buscar</button>
          </div>
          {/* <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Ej: badbunnypr"
            style={{ padding:8, marginRight:10, borderRadius: 50 }}
          />

          <button className="btn-buscar-insta" onClick={buscarPerfil}>Buscar</button> */}

          {loadinginsta && <p>Cargando...</p>}
          {errorinsta && <p style={{color:"red"}}>{errorinsta}</p>}

          {profile && (
            <div style={{ border:'1px solid #ccc', padding:20, marginTop:20, maxWidth:400 }}>
              <img src={profile.profile_picture_url} width={80} style={{borderRadius:"50%"}} />
              <h3>@{profile.username}</h3>
              <p>{profile.name}</p>
              <p>{profile.biography}</p>

              <p>
                <strong>{profile.followers_count}</strong> seguidores — 
                <strong> {profile.follows_count}</strong> seguidos
              </p>
            </div>
          )}
          </div>
          <Mapa evento={datosevento}/>
      </div>
  </div>
  </>
  );
}
