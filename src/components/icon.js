// importa toda la libreria leaflet y guarda en la variable L
import L, { icon } from 'leaflet';

// importa la imagen del icono principal del marcador
// import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconUrl from "./marker-icon-2x-orange.png";

// importa la imagen de la sombra del marcador
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Crea una constante llamada defaultIcon para alamacenar el icono personalizado
const DefaultIcon = L.icon({
    // Asigna la imafen que se usuara como icono
    iconUrl: iconUrl,
    // Asigna la imagen que se usara como sobra del icono
    shadowUrl: iconShadow,
    // Defini el tamaño del icono [ancho, alto]
    iconSize: [25, 41],
    // Define el punto exacto del icono que se colocará sobre el mapa
    iconAnchor: [12, 41],
    // Define la posicion donde aparecerá el popup respecto al icono
    popupAnchor: [1, -34],
    // Define el tamaño de la sombra 
    shadowSize: [41, 41],
});
// Exportar el icono para poder usarlo en otros archivos
export default DefaultIcon;