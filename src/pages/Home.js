import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, } from "firebase/firestore";
import app from "../firebaseConfig";

function Home() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
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


  return (
    <>
    <div>
    <Navbar/>
    </div>
    <div style={{ padding: 100, fontFamily: "Arial" }}>
      <h2>Eventos Disponibles</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {eventos.map((evento) => (
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
    </div>
    </>
  );
}

export default Home;