import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, } from "firebase/firestore";
import app from "../firebaseConfig";

function Home() {
  const navigate = useNavigate();
  const [eventoBuscar,setEventoBuscar]=useState("");
  const [eventos, setEventos] = useState([]);
  // const [tipoEvento,setTipoEvento] = useState([]);
  const [evento, setEvento] = useState("all");
  const db = getFirestore(app);

  // Cargar eventos de firestore
  useEffect(() => {
    async function obtenerEventos() {
      try{
        const eventoss =await getDocs(collection(db, "eventos"));

        const listaEventos = eventoss.docs.map(doc =>({
          id: doc.id,
          ...doc.data()
        }));
        setEventos(listaEventos);
      }catch (error) {
        console.error("Error al obtner los eventos", error)
      }
    }
    obtenerEventos();
  }, [db]);
  // const filtrados = eventos.filter(ev =>{
  //   if (!eventoBuscar) return true;
  //   const nombreEvento = ev.autor.toLowerCase() || "";
  //   const busqueda = eventoBuscar.toLowerCase();
  //   return nombreEvento.includes(busqueda);
  // }
  // );
  // const eventoFiltrados = eventos.filter((eve) => {
  //   const coincideEvento =
  //     evento === "all" || eve.tipoEvento === evento;
  //   return coincideEvento;
  // });
  const eventosMostrar = eventos.filter((eve) => {
    const busqueda= eve.autor.toLowerCase().includes(eventoBuscar.toLowerCase()) || eve.descripcion?.toLowerCase().includes(eventoBuscar.toLowerCase());//para la busqueda de evento por autor
    const eventoTipo = evento === "all"|| eve.tipoEvento === evento;//para filtro de eventos segun su tipo
    return busqueda && eventoTipo;
  })

  return (
    <>
    <div>
    <Navbar onSearch={(eve) => setEventoBuscar(eve)}/>
    </div>
    <div style={{ padding: 100, fontFamily: "Arial" }}>
      <h2>Eventos Disponibles</h2>
      <select className="btn-filtro"
          // SetOrden toma el valor con el cual se va a ordenar
          onChange={(e) => setEvento(e.target.value)}
          style={{ padding: 8, borderRadius: 8, width: "25%", marginTop: 5 }}>
           {/* Opciones que tiene para ordenar los titulos */}
            <option value="all">Todos los eventos</option>
            <option value="concierto">Conciertos</option>
            <option value="obra">Obras de Teatro</option>
            <option value="conferencia">Conferencias</option>
            <option value="exposicion">Exposiciones</option>
          </select>
          <h6 style={{marginTop:"20px"}}>Resultados {eventosMostrar.length} (Eventos)</h6>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {eventosMostrar.map((evento) => (
          <div 
            key={evento.id}
            onClick={() => navigate(`/evento/${evento.id}`)}
            style={{
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 16,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              background: "#fff"
            }}
          >
            <img
              src={evento.imagen}
              alt={evento.nombre}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 8
              }}
            />
            <h3 style={{ marginTop: 10 }}>{evento.nombre}</h3>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p style={{ fontSize: 14 }}>{evento.descripcion}</p>
          </div>
        ))}
      </div>
      {eventosMostrar.length === 0 && (
        <div className="alert alert-info">No hay eventos para dicha categoría o búsqueda</div> )}
    </div>
    </>
  );
}

export default Home;