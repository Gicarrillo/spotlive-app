import { Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar(){
    return(
    <header id="navSection">
    <nav className="navbar navbar-expand-lg bg-black fixed-top">
      <div className="container">
      <div className="d-flex align-items-center mx-3 mx-lg-4">
        <Link to="/" className="navbar-brand">
          <img className="mb-4 mx-2" src="img/sin-fondo.png" alt="" height="40"/>
        </Link>
        <Link to="/" className="logo">
          <span className="logo-text">TULUM</span>
        </Link>
      </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#movileNav">
          <span style={{fontSize:"1.5rem", color:"white"}}>&#9776;</span>
        </button>
        <div className="navbar-collapse justify-content-end collapse" id="movileNav">
          <ul className="navbar-nav g-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/evento">Información</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Contactanos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header> 
    );
}