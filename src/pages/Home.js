import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, } from "firebase/firestore";
import app from "../firebaseConfig";
import HistoryPanel from "../components/Historial";
import { getAuth,onAuthStateChanged } from "firebase/auth";

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
  //para ver si está activo el modal o no
  const [vista,setVista] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [history,setHistory] = useState([]);
  useEffect(()=>{
    if(usuario){
      //para saber que historial se muestra de que usuario 
      const guardado = localStorage.getItem(`historialbusq_${usuario.uid}`);
      if(guardado){
        setHistory(JSON.parse(guardado));
      } else {
        setHistory([]);
      }
    }else{
      setHistory([]);
    }
  },[usuario]);
  const auth = getAuth(app);
  useEffect(()=>{//validar que usuario está logueado
    const unsuscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUsuario(currentUser);
    });
    return ()=>unsuscribe();
  },[auth]);

  useEffect(()=>{
    //para evitar búsquedas vacías y se guarden ene el historial
    // cuando se borra info del input
    if(usuario&&eventoBuscar&&eventoBuscar.trim()!==""){
      setHistory((prev)=>{
        //para evitar duplicados en la bpusqueda si ya se tiene pues se umuestra al inicio
        const noDuplicar = prev.filter((item)=>item.term.toLowerCase()!==eventoBuscar.toLowerCase());
        const nuevoHistory=[
          {term:eventoBuscar,time:Date.now()},...noDuplicar].slice(0,8);
          //guarda el historial al recargar para cada único usuario
          localStorage.setItem(`historialbusq_${usuario.uid}`,JSON.stringify(nuevoHistory));
        return nuevoHistory;
      });
    }
  },[eventoBuscar,usuario]);
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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
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
            {usuario &&(
              <button style={{background:"#B0D49B",borderRadius:"10px", padding:"9px", border:"2px solid #a6c792", fontSize:"14px", fontWeight:"bold"}} onClick={()=>setVista(true)}>
                Historial de búsqueda ({history.length})
              </button>
            )}
      </div>
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
      {vista&&(
        <div style={{position: "fixed", top: 0, left: 0, width: "100%",height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", 
          justifyContent: "center", alignItems: "center", zIndex: 1000}}
          onClick={()=>setVista(false)}>
            <div style={{width:"80%",maxWidth:"300px"}}
            onClick={(e)=>e.stopPropagation()}>{/*para comp terminar la propagación al dar clic fuera*/}
              <HistoryPanel history={history}
              onPick={(term)=>{setEventoBuscar(term); setVista(false);}}
              onClear={()=>{
                setHistory([]);
                localStorage.removeItem("historialbusq")//para borrar el historial y mandarlo al componente
              }}/>
            </div>
          </div>
      )}
    </div>
    </>
  );
}

export default Home;