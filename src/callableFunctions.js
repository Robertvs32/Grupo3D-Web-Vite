import { httpsCallable } from "firebase/functions";
import { functions } from './firebaseConfig' 

export const deletarUsuario = httpsCallable(functions, "deletarUsuario");
export const criarUsuario = httpsCallable(functions, 'criarUsuario');