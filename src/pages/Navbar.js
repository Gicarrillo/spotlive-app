import { Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "../components/SearchBar";

export default function Navbar(){
    return(
    <header id="navSection" className="navSection-style">
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className=" container container-style">
      <div className="d-flex align-items-center mx-3 mx-lg-4">
        {/* <Link to="/" className="logo"> */}
          <span className="logo-text">SpotLive</span>
        {/* </Link> */}
      </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#movileNav">
          <span style={{fontSize:"1.5rem", color:"white"}}>&#9776;</span>
        </button>
        <div className="navbar-collapse justify-content-end collapse menu" id="movileNav">
          <ul className="navbar-nav g-3">
            <li className="nav-item">
              <Link className="nav-link active menu" to="/home">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu" to="/evento">Información</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">Contactanos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Blog</Link>
            </li> */}
            <li><SearchBar className="Bar-nav"/></li>
          </ul>
        </div>
      </div>
    </nav>
  </header> 
    );
}