// Importamos React para poder crear componetes con JSON
import React from "react";

// Exportamos por defecto el componente TrackCard
// Este componente recibe información de una canción mediante props
export default function TrackCard({ title, artist, album, image, source, onSelect, urlcompleta}) {
    // El componete retorna una estructura visual de una tarjeta
    return(
        // Contenedor principal de la tarjeta
        <div
        className="detallescard"
        // Evento que se ejecuta cuando el usario da clic en la tarjeta
        // Llama a la función onSelect enviada desde el componente padre
        onClick={onSelect}
        // Estilo en línea para dar formato visual a la tarjeta
        style={{
            // Acomoda los elemntos deforma horizontal
            display: "flex",
            // Espacio entre elemntos
            gap: 12,
            // Espacio interno
            padding: 5,
            // Borde gris claro
            border: "1px solid #000000",
            // Borde redondeados
            borderRadius: 10,
            // Cambia el cursor para indicar que es clickeable
            cursor: "pointer",
            // Alinea verticalmente los elementos
            alignItems: "center",
            height: 100,
        }}
        >
            {/* Imagen del álbum o canción */}
            <img
            // URL de la imagen recibida como prop
            src = {image}
            // Texto alternativo para accesibilidad
            alt={title}
            // Tamaño fijo de la imagen
            width={80}
            height={80}
            // Bordes redondeados en la imagen
            style={{borderRadius: "10"}}
            />
             <div>
                {/* Información de la canción */}
                <h6 style={{ margin: 0 }}>{title}</h6>
                <p style={{ margin: "2px 0", fontSize: 14 }}>{artist}</p>
                <p style={{ margin: "4px 0", fontSize: 13 }}>
                {album}
                </p>
                <div style={{display: "flex"}}>
                    {/* Boton que abre una pagina externa con window.open*/}
                    {/* StopPropagation bloquea la ejecucuón de onselect que solo abre los detalles */}
                    {/* <button className="btn" onClick={(e) => {e.stopPropagation(); window.open(urlcompleta, "_blank");}} >
                        Escuchar en la plataforma
                    </button> */}
                    <span style={{ fontSize: 13, color: "rgb(195, 194, 194)"}}> {source}</span>
                </div>
            </div>
        </div>
    );
}