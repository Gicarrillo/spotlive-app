// Importamos los componetes principales de react-leaflet
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
// Importamos el icono personalizado que definimos en icon.js
import DefaultIcon from "./icon";
// Definimos y exportamos el componente MapaBasico
export default function MapaBasico({estiloss} 

) {
    // Retornamos el contenido visual del componente
    return (
        <div style={{height: "100%", width: "100%"}}>
            <MapContainer
            //  center={[20.5888, -100.3899]}
            // Nuevas coordenadas iniciales
             center={[20.577, -100.3592]}
             zoom={13}
             style={{height: "100%", width: "100%"}}
             >
                {/* Mapa base (OpenStreetMap) */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  atribution="&copy; OpenStreetMap contributors"/>

                  {/* Marcador + popup */}
                    <Marker position={[20.577, -100.3592]} icon={DefaultIcon}>
                        <Popup>Nueva ubicación</Popup>
                    </Marker>
             </MapContainer>
        </div>
    );
}