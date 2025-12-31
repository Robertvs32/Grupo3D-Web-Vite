import { httpsCallable, getFunctions } from 'firebase/functions';
import Alert from '../../Components/Alert/Alert';
import { useState } from 'react';
import './usuarios.css'

export default function Usuarios(){

    const [mensagem, setMensagem] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const functions = getFunctions();
    const criarUsuario = httpsCallable(functions, 'criarUsuario');

    const obj = {
        email: 'alberto@gmail.com',
        senha: '12344321',
        nome: 'Alberto'
    }

    return(
        <div id="containerUsuarios">

            <h1 id="titleUsuarios">Usuarios</h1>

            <button onClick={async () => {
                try{
                    const response = await criarUsuario(obj);
                    setMensagem(response.data);
                }catch(error){
                    setMensagem(error.message);
                }
                setShowAlert(true);
            }}>Criar usuario</button>

            {showAlert && (
                <Alert
                    mensagem={mensagem}
                    setter={setShowAlert}
                />
            )}

        </div>

        
    )
}