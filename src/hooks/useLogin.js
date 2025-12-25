import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";

export default function useLogin(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function login(email, senha){
        try{
            await signInWithEmailAndPassword(auth, email, senha);
        } catch(error){
            alert(`Erro ao fazer login:  ${error}`)
        }
    }

    return{
        login,
        email,
        senha,
        setEmail,
        setSenha
    }
}