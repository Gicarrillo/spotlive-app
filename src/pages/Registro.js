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
        <div className="container">
            <div className="card">
                <h2>Registro</h2>
                <form onSubmit={handleRegister}>
                    <h5>Nombre</h5>
                    <input type="text" placeholder="Nombre" onChange={(e) => setUser(e.target.value)} required />
                    <h5>Correo Electronico</h5>
                    <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
                    <h5>Contraseña</h5>
                    <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                    <button className="btn btn-inicio" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;