// Importar React y el hook usesState, que permite manejar estado dentro del componenre
import React, {useState} from "react";

// Exportar por defecto el componente searchBar para poder importarlo sin llaves en otros archivos
export default function SearchBar({onSearch, loading}) {
    // Se declara un estado llamado "term" para guardar el texto que escribe el usuario
    // setTerm es la función que actualiza el valor de term
    const [term, setTerm] = useState("");

    // Función que se ejecuta cuando el usuario envia el formulario (al dar clic)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Limipia el texto, elimina especios al inicio y final
        const clean = term.trim();
        // Si el texto quedo vacio, no hace nada y termina la función
        if(!clean) return;
        // LLama a la función onSearch (enviada desde el componete padre) con el término limpio
        onSearch(clean);
    };

    // Renderiza el componente (la interfaz visual)
    return(
        // Formulario: al enviarlo, se ejcuta handleSubmit
        <form onSubmit={handleSubmit} style={{display: "flex", gap: 8, marginBottom: 16}}>
            {/* Campo de texto controlado: su valor depende del estado "term" */}
            <input
            // Valor visible del input es el estado term
            value={term}
            // Cada vez que el usuario escribe, se actualiza el estado con lo que hay en el input
            onChange={(e) => setTerm(e.target.value)}
            // Texto guía que aparece cuando el input está vacío
            placeholder="Busca artista o canción (ej. Shakira, Coldplay)"
            // Estilos básicos en línea: ocupa todo el espacio disponible y agrega relleno
            style={{flex: 1, padding:10, borderRadius: 10}}
            />
            {/* Botóm de buscar del formulario */}
            <button className="btn" id="btn-buscar" type="submit" style={{padding: "10px 14px"}}
                disabled={loading || !term.trim()}>
                {/* Texto del botón */}
                Buscar
            </button>
        </form>
    )
}