import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EstiloInicio.css';
import logo from "./logo.jpeg";

export default function PaginaInicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <div className="inicio-content">
        <img className="img-inicio" src={logo}></img>
        <h1 className="inicio-logo">SpotLive</h1>
        <p className="inicio-slogan">
          Siente la diversión, vive el momento. <br />
          Los mejores eventos en la palma de tu mano.
        </p>
        <div className="inicio-buttons">
            {/*para ir al login y acceder*/}
          <button className="btn-start" onClick={() => navigate('/login')}>
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
