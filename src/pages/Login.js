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
        <div className="container">
        <div className="card" style={{background: "#935a45"}}>
            <h2 style={{color: "white"}}>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="correo" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                <div style={{display: "flex", justifyContent: "center"}}>
                <button className="btn-inicio" type="submit">
                    Ingresar
                </button>
                </div>
            </form>
            {/* Boton para ingresar con cuenta de google */}
            <button className="btn-google" onClick={handleGoogleLogin}>
                Inicar sesión con Google
            </button>
        </div>
        </div>
    );
}

export default Login;