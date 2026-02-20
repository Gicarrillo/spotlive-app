import React from "react";
// import { doc, getDoc } from "firebase/firestore";

export default function TrackDetails({track, evento}){
    // evento?.descripcion
    // evento?.artista
    // evento?.lugar
    // evento?.fecha
    if(!track) return null;
    const colores = {
        "iTunes API":{
            background:"#fc4866",
            color:"white",
            border:"1px solid #fc4866",
        },
        "Deezer API":{
            background:"#9b2afd",
            color:"white",
            border:"1px solid #9b2afd",
        }
    }
    const estiloBoton = colores[track.source]||{background:"#b3b1b1", color:"white", border:"1px solid #5f5f5f"};
    return(
        <>
        <div>
            <h3>{track.title}</h3>
            <p><strong>Artista: </strong>{track.artist}</p>
            {evento && (
                <>
                <hr/>
                <p><strong>Evento: </strong> {evento.descripcion}</p>
                <p><strong>Evento: </strong> {evento.lugar}</p>
                </>
            )}
        </div>
        <div style={{padding:12,border:"1px solid #ddd",borderRadius:10,marginTop:16,background:"#6b792c", color:"white"}}>
            <h3 style={{marginTop:0}}>Detalle</h3>
            <div style={{display:"flex",gap:12}}>
                <img src={track.image} alt={track.title} width={120} height={120} style={{borderRadius:12}} />
                <div style={{fontWeight:700,fontSize:18}}>{track.title}</div>
                <div><b>Artista:</b> {track.artist}</div>
                <div><b>Álbum:</b> {track.album}</div>
                <div style={{fontSize:12,opacity:0.7}}><b>Fuente:</b> {track.source}</div>
            </div>
            <div>
                <button style={{padding:10, margin:"10px 10px 10px 0", borderRadius:"20px", background:estiloBoton.background, color:estiloBoton.color, border:estiloBoton.border}} onClick={()=>window.open(track.externalUrl,"_blank")}>
                    Escuchar en {track.source === "iTunes API" ? "Apple Music" : track.source === "Deezer API" ? "Deezer" : track.source} 🎶
                </button>
                <button style={{padding:10, margin:"10px 10px 10px 0", borderRadius:"20px", background:"#1DB954", color:"white", border:"1px solid #1DB954"}} onClick={()=>window.open(`https://open.spotify.com/search/${track.artist}%20${track.title}`)}>Escuchar en Spotify 🎵</button>
            </div>
            {track.previewUrl?(
                <div style={{marginTop:12}}>
                    <div style={{fontWeight:700,marginBottom:6}}>Preview(30s)</div>
                    <audio controls src={track.previewUrl} style={{width:"100%"}} />
                </div>
            ):(
                <div style={{marginTop:12, opacity:0.7}}>No hay preview disponible para esta canción.</div>
            )}
        </div>
        </>
    );
}