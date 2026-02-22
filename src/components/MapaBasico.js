// Importamos los componetes principales de react-leaflet
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
// Importamos el icono personalizado que definimos en icon.js
import DefaultIcon from "./icon";
// Definimos y exportamos el componente MapaBasico
export default function MapaBasico({posicion,lugar} 

) {
    // Retornamos el contenido visual del componente
    return (
        <div style={{height: "100%", width: "100%"}}>
            <MapContainer
            //  center={[20.5888, -100.3899]}
            // Nuevas coordenadas iniciales
             center={posicion}
             zoom={13}
             style={{height: "100%", width: "100%"}}
             >
                {/* Mapa base (OpenStreetMap) */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  atribution="&copy; OpenStreetMap contributors"/>

                  {/* Marcador + popup */}
                    <Marker position={posicion} icon={DefaultIcon}>
                        <Popup>{lugar}</Popup>
                    </Marker>
             </MapContainer>
        </div>
    );
}