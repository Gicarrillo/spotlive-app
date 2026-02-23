import { Link,useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from "react";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore,doc,updateDoc } from "firebase/firestore";
import app from "../firebaseConfig";
export default function Navbar(){
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  useEffect(()=>{ //pata conocer y escuchar los cambios en el estado de autenticacion dentro de la app
    const usu = onAuthStateChanged(auth,(usr)=>{
      if(usr){
        setUsuario(usr.displayName || usr.email);//para colocar nombre de usuario activo
      }else{
        setUsuario(null);
      }
    });
    return ()=>usu();
  },[auth]
  );
  const handleOut = async ()=>{
      try{
        const usr = auth.currentUser;
        if(usr){
          const userDocRef = doc(db,"users",usr.uid);
          await updateDoc(userDocRef,{isActive:false});
        }
        await signOut(auth);
        navigate("/login");
      }catch(err){
        console.log("Error al intentar cerrar sesión:", err.message);
      }
    };
    return(
    <header id="navSection" className="navSection-style">
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className=" container container-style" style={{padding:"10px"}}>
      <div className="d-flex align-items-center mx-3 mx-lg-4">
        <Link to="/home">
          <span className="logo-text">SpotLive</span>
        </Link>
      </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#movileNav">
          <span style={{fontSize:"1.5rem", color:"white"}}>&#9776;</span>
        </button>
        <div className="navbar-collapse justify-content-end collapse menu" id="movileNav">
          <ul className="navbar-nav g-3">
            {usuario&&(
              <li className="nav-item  me-2"><span style={{color:"white",fontWeight:"bold", fontSize:"18px"}}>¡Hola, {usuario}!</span></li>
            )}
            <li>
              <button onClick={handleOut} className="btn btn-sm btn-danger" style={{borderRadius:"8px", padding:"0px 10px"}}>Salir</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header> 
    );
}