// src/pages/Login.js
import { useState } from "react";
import "./Login.css";
import {auth, db, googleProvider} from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut, signInWithPopup} from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    // return () => unsubscribe();
    //     }, [navigate]);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Verificar si el usuario ya tiene una sesión activa
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Se crea la variable que almacenara los datos
            const user = userCredential.user;
            // Se modifica ya no es usercredential.user.uid sino user.uid
            // const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if(userDoc.exists() && userDoc.data().isActive) {
                alert ("Ya hay una sesión activa en otro dispositivo");
                return;
            }
            // const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // await updateDoc(doc(db, "users", userCredential.user.uid), {isActive:true});
            await updateDoc(userDocRef, {isActive:true});
            
            navigate("/");
        } catch (error){
            console.error("Error añ iniciar sesión: ", error.message);
        }
    };

    // Funcion para ingresar con google
    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().isActive){
                alert ("Ya hay una sesión activa en otro dispositivo");
                return;
            }

            if (!userDoc.exists()){
                await setDoc(userDocRef, {email: user.email, isActive: true});
            } else {
                await updateDoc(userDocRef, {isActive: true});
            }

            navigate("/");
        } catch (error) {
            console.error("Error al iniciar sesión con google: ", error.message);
        }
    };
    return (
        <div className="container-login">
        <div className="card-login" style={{background: "#000000"}}>
            <p style={{color: "white", marginBottom: 10}}>SpotLive</p>
            <h2 style={{color: "white", marginBottom: "80px"}}>Iniciar Sesión</h2>
            <div style={{marginBottom: 50}}>
            <p style={{color: "white", marginBottom: 0, textAlign: "center", fontSize: 10}}>Ingresa y descubre los</p>
            <p style={{color: "white", marginBottom: 10, textAlign: "center", fontSize: 10}}>mejores eventos</p>
            </div>
            <form className="form-login" onSubmit={handleLogin}>
                <h6 style={{color: "white"}}>Correo Electronico</h6>
                <input type="email" placeholder="correo" onChange={(e) => setEmail(e.target.value)} required />
                <h6 style={{color: "white", marginBottom: "10px", marginTop: 10}}>Contraseña</h6>
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                <div style={{display: "flex", justifyContent: "center"}}>
                <button style={{marginTop: 20, width: "100%"}} className="btn-inicio" type="submit">
                    Ingresar
                </button>
                </div>
            </form>
            {/* Boton para ingresar con cuenta de google */}
            <button style={{width: "100%"}} className="btn-google" onClick={handleGoogleLogin}>
                Inicar sesión con Google
            </button>
        </div>
        </div>
    );
}

export default Login;