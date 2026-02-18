// Importamos React para poder trabajat con JSX y componnetes
import React, { useState } from "react";
// Importa el componente TrackCard desde el archivo local
import TrackCard from "./TrackCard";
// Exporta por defecto el componente TrackList
// Recibe dos props
// Items: arreglo de canciones
//  onSelect: fucnión que se jecuta cuando se selecciona una canción
export default function TrackList({items, onSelect}) {
    // Para que no se muestre el card si esta vació cuando no se encuentre resultados
    // con los filtros
    if (!items || items.length === 0) return null;
    // El componente retorna la lista visual de canciones
    return (
        // Contenerdor principal usando un grid para acomodar las tarjetas
        <div className="card" style={{display: "grid", gap: 10}}>
            {/* Recorre el arreglo de canciones usando map */}
            {items.map((t) => (
                // Renderiza una tarjeta TrackCard por cada elemento del arreglo
                <TrackCard
                // Key es obligatorio en listas de React
                // Ayuda a React a identificar cada elmento de forma unica
                key={t.id}
                // Se envian los datos de la canción al componete TrackCard
// Cada una de estas variables se debe de a atrer con este nombre dentro de trackcard
                title={t.title}
                artist={t.artist}
                album={t.album}
                image={t.image}
                source={t.source}
                urlcompleta={t.urlcompleta}
                // Función que se jecuta al dar clic en la tarjeta
                // Envía la canción seleccionada al componnete padre
                onSelect={() => onSelect(t)}
                />
            ))}

        </div>
    );
}