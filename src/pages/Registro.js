// src/pages/Register.js
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Guarda el nombre del usuario en Auth
            await updateProfile(userCredential.user, {
            displayName: user
            });

             await setDoc(doc(db, "users", userCredential.user.uid), {user:user, email: email, isActive: false});
        navigate("/login");
        } catch (error) {
            console.error("Error en el registro", error.message);
        }
    };
    return (
        <div className="container-login">
            <div className="card-login">
                <p style={{color: "white", marginBottom: 10}}>SpotLive</p>
                <h2 style={{color: "white", marginBottom: "80px"}}>Registro</h2>
                <div style={{marginBottom: 50}}>
                <p style={{color: "white", marginBottom: 0, textAlign: "center", fontSize: 10}}>Ingresa y descubre los</p>
                <p style={{color: "white", marginBottom: 10, textAlign: "center", fontSize: 10}}>mejores eventos</p>
                </div>
                <form onSubmit={handleRegister}>
                    <h6 style={{color: "white", marginBottom: 10}}>Nombre</h6>
                    <input type="text" placeholder="Nombre" onChange={(e) => setUser(e.target.value)} required />
                    <h6 style={{color: "white", marginBottom: "10px", marginTop: 10}}>Correo Electronico</h6>
                    <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
                    <h6 style={{color: "white", marginBottom: "10px", marginTop: 10}}>Contraseña</h6>
                    <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                    <button style={{width: "100%", marginTop: 30}} className="btn-inicio" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;