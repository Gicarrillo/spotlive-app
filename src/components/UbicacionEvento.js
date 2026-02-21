// Importamos los componentes principales de react-leaflet
import { MapContainer, TileLayer, useMap } from "react-leaflet";
// Importamos hooks de react
import { useEffect, useRef, useState } from "react";
// Importamos Leaflet directamente
import L from "leaflet";
// Importamos la libreria para manejo de rutas
import "leaflet-routing-machine";
// Importamos el icono personalizado
import DefaultIcon from "./icon";
// Importamos el icono de origen
import IconOrigen from "./iconorigen";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

// Componente encargado de dibjujar la ruta en el mapa
function Routing({from, to}) {
    // Agregar un estado para cambiar el destino
    const map = useMap();
    // Referenci para guardar el control de rutas
    const routingRef=useRef(null);

    // Sejecuta cuando cambia el mapa a los puntos
    useEffect(() => {
        // Si el mapa aun no esta listo, no hacemos nada
        if(!map) return;
        // Si el control de rutas aun no existe
        if (!routingRef.current) {
            // Creamos el control de rutas
            routingRef.current = L.Routing.control({
                // Puntos de inicio y fin
                waypoints:[
                    L.latLng(from[0], from[1]),
                    L.latLng(to[0], to[1])
                ],
                // Permite arrastrar la ruta
                routeWhileDragging: true,
                // No mostrar rutas alternativas
                showAlternatives: false,
                // Estilo de la linea
                lineOptions: {
                        styles:[{color: "#ae372a", weight: 4}]
                },
                    // Servicio para calcular la ruta
                    router: L.Routing.osrmv1({
                        serviceUrl: "https://router.project-osrm.org/route/v1/",
                        profile: "driving",
                        language: "es"
                    }),
                    // Perzonalizar marcadores
                    createMarker: function(i, wp) {
                        return L.marker(wp.latLng, {
                            icon: i===0 ? IconOrigen : DefaultIcon
                        }). bindPopup(i===0 ? "Inicio" : i===1 ? "Destino" : "Paso"
                        );
                    }
            }).addTo(map);
        } else {
            // Si ya existe el control, actualizamos puntos
            routingRef.current.setWaypoints([
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1])
            ]);
        }
    }, [map, from, to]);
    // Este componnete no renderiza nada visible
    return null;
}
// Componente principal de la vista ruta
export default function Ruta({lugar}){
    const [origen, setOrigen] = useState(null);
    // Destino
    const [destino, setDestino] = useState(null);
    // Para obtener la ubicación del usuario
    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos)=> {
                const {latitude, longitude} = pos.coords;
                setOrigen([latitude, longitude]);
            });
        }
    }, []);

    // Funcion para convertir el luegar  a coordenadas
    console.log("Lugarrecibido: ",lugar);
    useEffect(() => {
        if(!lugar) return;
    const buscar = async () => {
        try{
            const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lugar)}`
        );
            const data = await response.json();
            console.log(data);

            if(data.length >0) {
                setDestino([
                    parseFloat(data[0].lat),
                    parseFloat(data[0].lon)
                ]);
            }
        } catch (error) {
            console.error("Error al obtener coordenadas", error);
        }
    };
    // if(data.length > 0){
    //     setDestino([
    //         parseFloat(data[0].lat),
    //         parseFloat(data[0].lon)
    //     ]);
    // }
    buscar();
 }, [lugar]);
    return (
        // Se agregar un div para poder colocar el botón de regresar
        <div style={{height: "100vh", width: "100%"}}>
            {/* Se crea el botón de regresar */}
            {/* <button onClick={onBack} style={{...estiloss, position: "absolute", zIndex:1000}}>
                Regresar a inicio
            </button> */}
            <MapContainer
            center={[20.577, -100.3592]} //Coordenadas iniciales
            zoom={13} //nivel de zoom
            style={{height: "100%", width: "100%", margin: "10px 10px"}}
            >
                {/* Capa base del mapa */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"/>
                    {/* Componenete que dibuja la ruta */}
                    {origen && destino && (
                        <Routing
                        // Se le asigna la ubicación actual a from
                            from={origen}
                            to={destino}
                        />
                    )}:

            </MapContainer>
        </div>
    );
}