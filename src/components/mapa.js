// Importa el hook de useState desde React
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'; 
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Ruta from "./UbicacionEvento"
import MapaBasico from "./MapaBasico";

// Define el componente principal
export default function Mapa({evento}) {
  // Declara el estado vista y la función para intercambiarlo
  const [vista, setVista] = useState(false);
  const [coords,setCoords] = useState(null);//para guardar la latirtud y longitud
  const[mapruta, setMapruta] = useState(false);
  // Se define la función que permitirá regresar al inicio
  // Será ejecutada cuando se de clic en regresar
  useEffect(()=>{
    const obtCoords = async()=>{
      if(!evento || !evento.lugar)return;
      try{
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(evento.lugar)}`
        );
        const data = await response.json();
        if(data&&data.length>0){
          setCoords([parseFloat(data[0].lat),parseFloat(data[0].lon)]);
        }
      }catch(err){
        console.log("Error al buscar dirección");
      }
    };
    obtCoords();
  },[evento?.lugar]);

  const inicio = () => {setVista(null);};
  // Agregar estilo a botones
  const estiloboton = {
    fontFamily:"sans-serif",
    backgroundColor: "#e2d4c8",
    borderColor: "#c3a87c",
    borderRadius:"10px",
    // padding: "5px",
    // fontsize: "10px",
  }
  // Boton resgresar estilos
const cerrar = {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "#ba290c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  zIndex: 20000
};

  const modal= {
  // padding: 10,
  width: "80%",
  height: "70%",
  backgroundColor: "white",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative"
};

const estilocard = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};
  // Condición para que en la aplicación el titulo aparezca en el centro si no hay un boton seleccionado
    const contenedortitulo = {
      display: "flex", 
      // flexDirection: "row", 
      alignItems: "center",
      justifyContent:"space-between", 
      padding: "0px 12px" };

      // if(!mapruta){
      //   ;
      // }
  // Retorna la interfaz grafica
  return (
    <div style={{width: "100%", backgroundColor: "#d2d0ce", borderRadius: 10}}>
      {/* Sección superior con titulo y botones */}
      {/* <div style={{textAlign:"center",}}> */}
      <div style={contenedortitulo}>
        {/* Titulo de la aplicación */}
        <h6>Mapa</h6>
          {/* Botón para mostrar rutas */}
          <button className="btn-buscar" onClick={()=> setVista(true)}>
            Ruta
          </button>
        {/* </div> */}
      </div>
      {/* Area donde se mostrara el componete seleccionado */}
      <div style={{ height: "30vh", width:"100%", padding: 5}}>
        {vista === false && coords ? (<MapaBasico posicion={coords} lugar={evento.lugar}/>):""}
        {vista && (
          <div style={estilocard}>
            <div style={modal}>
              <h6 style={{margin: 15}}>Mapa</h6>
              <button style={cerrar} onClick={() => setVista(false)}>
                  ✕
                </button> 
                <Ruta lugar={evento.lugar}/>  
            </div>
          </div>
          )}
      </div>
    </div>
  );
}
