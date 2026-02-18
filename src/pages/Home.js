// import React, { useState } from 'react';
// import { searchInstagramProfile } from '../services/instagramApi';

// function Home() {
//   const [username, setUsername] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const eventos = [
// //   {
// //     id: 1,
// //     nombre: "Festival Rock 2026",
// //     lugar: "CDMX",
// //     descripcion: "Gran festival de rock",
// //     imagen: "/imagenes/rock.jpg",
// //     mapa: "/imagenes/mapa1.png"
// //   }
// ];

//   const buscarPerfil = async () => {
//     if (!username) return;

//     try {
//       setLoading(true);
//       setError("");
//       setProfile(null);
//       const data = await searchInstagramProfile(username);
//       setProfile(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 40, fontFamily: "Arial" }}>
      
//       <h2>Buscar artista en Instagram</h2>

//       <input
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Ej: badbunnypr"
//         style={{ padding:10, marginRight:10 }}
//       />

//       <button onClick={buscarPerfil}>Buscar</button>

//       {loading && <p>Cargando...</p>}
//       {error && <p style={{color:"red"}}>{error}</p>}

//       {profile && (
//         <div style={{ border:'1px solid #ccc', padding:20, marginTop:20, maxWidth:400 }}>
//           <img src={profile.profile_picture_url} width={80} style={{borderRadius:"50%"}} />
//           <h3>@{profile.username}</h3>
//           <p>{profile.name}</p>
//           <p>{profile.biography}</p>

//           <p>
//             <strong>{profile.followers_count}</strong> seguidores — 
//             <strong> {profile.follows_count}</strong> seguidos
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const eventos = [
    {
      id: 1,
      nombre: "Festival Rock 2026",
      lugar: "CDMX",
      descripcion: "Gran festival de rock con bandas nacionales e internacionales.",
      imagen: "/imagenes/rock.jpg",
      mapa: "/imagenes/mapa1.png"
    },
    {
      id: 2,
      nombre: "Concierto Pop Night",
      lugar: "Guadalajara",
      descripcion: "Los mejores artistas pop del momento.",
      imagen: "/imagenes/pop.jpg",
      mapa: "/imagenes/mapa2.png"
    }
  ];

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
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
  );
}

export default Home;