import './gerenciarUsuarios.css'
import { db } from '../../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { deletarUsuario } from '../../../callableFunctions';
import Confirm from '../../../Components/Confirm/Confirm';
import Loader from '../../../Components/Loader/Loader';
import Alert from '../../../Components/Alert/Alert';


export default function GerenciarUsuarios(){

    const [arrayUsers, setArrayUsers] = useState([]);
    const [uid, setUid] = useState('');
    
    //States de controle do ciclo de vida: carregamento, reenderizacao, aviso, loader...
    const [flag, setFlag] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [alert, setAlert] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [loader, setLoader] = useState(false);

    const handleDelete = async (uid) => {
        try{
            setLoader(true);
            const response = await deletarUsuario({uidUsuario: uid});
            setMensagem(response.data);
            setLoader(false);
            setAlert(true);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const busca = async () => {
            try{
                const colecao = collection(db, "users");
                const docsSnapshot = await getDocs(colecao);
                const arrayTemp = docsSnapshot.docs.map(item => {
                    return {
                        uid: item.id,
                        ...item.data()
                    };
                })
                setArrayUsers(arrayTemp)
            }catch(error){
                alert(error)
            }
        }
        busca();
    }, [flag])

    return(
        <>
            <div id="containerGerenciarUsuarios">
                <h1 id="titleGerenciarUsuarios">Gerenciar usuarios</h1>

                <div id="containerUsuarios">

                {arrayUsers.map(item => {
                    return(
                        <div className="userCard">
                            <h2 className="titleUser">{item.user}</h2>
                            <p className="infoUser">{`email: ${item.email}`}</p>
                            <p className="infoUser">{`adm: ${item.adm}`}</p>
                            <button 
                                className="excluirUser"
                                onClick={() => {
                                    setUid(item.uid);
                                    setShowConfirm(true);
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    )
                })}

                </div>
            </div>
        
            {showConfirm && (
                <Confirm
                    mensagem="Deseja excluir?"
                    actionConfirm={ async () => {
                        await handleDelete(uid);
                        setShowConfirm(false)
                        setFlag(flag => !flag)
                    }}
                    actionCancel={() => setShowConfirm(false)}
                />
            )}

            {loader && (
                <Loader/>
            )}

            {alert && (
                <Alert
                    mensagem={mensagem}
                    setter={setAlert}
                />
            )}
            
        </>
        

        
    )
}