import React from "react";
// import { doc, getDoc } from "firebase/firestore";

export default function TrackDetails({track, evento}){
    // evento?.descripcion
    // evento?.artista
    // evento?.lugar
    // evento?.fecha
    if(!evento && !track) return null;
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
    const estiloBoton = track ? colores[track.source]||{background:"#b3b1b1", color:"white", border:"1px solid #5f5f5f"}: null;
    return(
        <>
        <div style={{
            padding: 16,
            // border: "1px solid #ddd",
            borderRadius: 12,
            marginTop: 16,
            // background: "#f9f9f9"
            }}>
                {evento && (
                <>
                <h3>Información del Evento</h3>
                <p><strong>Descripción:</strong> {evento.descripcion}</p>
                <p><strong>Artista:</strong> {evento.artista}</p>
                <p><strong>Lugar:</strong> {evento.lugar}</p>
                <p><strong>Fecha:</strong> {" "}
  {evento.fecha?.toDate().toLocaleDateString()}</p>
                <hr />
                </>
            )}

        {track && (
        <>
          <h3>Información de la Canción</h3>
          {track?.image ? (
            <img src={track.image} width={150} />
          ): null}
          <p><strong>Título:</strong> {track.title}</p>
          <p><strong>Artista:</strong> {track.artist}</p>
          <p><strong>Álbum:</strong> {track.album}</p>
        </>
      )}

            {/* <h3>{track.title}</h3>
            <p><strong>Artista: </strong>{track.artist}</p>
            {evento && (
                <>
                <hr/>
                <p><strong>Evento: </strong> {evento.descripcion}</p>
                <p><strong>Evento: </strong> {evento.lugar}</p>
                </>
            )} */}
        </div>
            <div>
            {track && (
                track.previewUrl?(
                <div style={{marginTop:12}}>
                    <div style={{fontWeight:700,marginBottom:6}}>Preview(30s)</div>
                    <audio controls src={track.previewUrl} style={{width:"100%"}} />
                </div>
            ):(
                <div style={{marginTop:12, opacity:0.7}}>No hay preview disponible para esta canción.</div>
            )
            )}
        </div>
        </>
    );
}