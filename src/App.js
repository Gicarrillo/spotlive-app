// import React, { useState } from 'react';
// import { searchInstagramProfile } from './services/instagramApi';

// function App() {
//   const [username, setUsername] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

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

// export default App;

// src/App.js
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Evento from "./pages/Evento"
import Mapa from "./components/mapa";
// // Importar dashboard
// import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/evento/:id" element={<Evento/>}/>
          <Route path="/mapa" element={<Mapa/>}/>
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/> */}
        </Routes>
      </Router>
     </AuthProvider>
  );
}
export default App;

