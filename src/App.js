import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Evento from "./pages/Evento"
import Mapa from "./components/mapa";
import InicioApp from "./pages/InicioApp"
// // Importar dashboard
// import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InicioApp/>}/>
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