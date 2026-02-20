// Importa el hook de useState desde React
import { useState } from "react";
import 'leaflet/dist/leaflet.css'; 
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Ruta from "./UbicacionEvento"
import MapaBasico from "./MapaBasico";

// Define el componente principal
export default function Mapa() {

  // Declara el estado vista y la función para intercambiarlo
  const [vista, setVista] = useState(false);
  const[mapruta, setMapruta] = useState(false);
  // Se define la función que permitirá regresar al inicio
  // Será ejecutada cuando se de clic en regresar
  const inicio = () => {setVista(null);};
  // Agregar estilo a botones
  const estiloboton = {
    fontFamily:"sans-serif",
    backgroundColor: "#e2d4c8",
    borderColor: "#c3a87c",
    borderRadius:"10px",
    padding: "10px",
    fontsize: "20px",
  }
  // Boton resgresar estilos
  const estilobotonr = {
    color: "white",
    borderRadius:"5px",
    backgroundColor:"#ba290c",
    padding: "5px",
    fontsize: "15px",
    borderColor: "#d96d6d",
    margin: "10px 50px",
  }
  // Condición para que en la aplicación el titulo aparezca en el centro si no hay un boton seleccionado
    const contenedortitulo = {
      display: "flex", 
      // flexDirection: "column", 
      alignItems: "start",
      justifyContent:"start", 
      padding: 10 };

      // if(!mapruta){
      //   ;
      // }
  // Retorna la interfaz grafica
  return (
    <div style={{width: "100%", backgroundColor: "#edcbb1"}}>
      {/* Sección superior con titulo y botones */}
      {/* <div style={{textAlign:"center",}}> */}
      <div style={contenedortitulo}>
        {/* Titulo de la aplicación */}
        <h5>Mapa</h5>
        {/* Botón para mostrar mapa básico */}
        <div style={{fontFamily:"sans-serif", display:"flex", gap: "10px", padding:"10px"}}>
          {/* Botón para mostrar rutas */}
          <button style={estiloboton} onClick={()=> setVista("ruta")}>
            Ruta
          </button>
        </div>
      </div>
      {/* Area donde se mostrara el componete seleccionado */}
      <div style={{ height: "30vh", width:"95%", padding: 5}}>
        {vista === false && <MapaBasico />}
        {vista === "ruta" && <Ruta onBack={inicio} estiloss={estilobotonr}/>}
      </div>
    </div>
  );
}
