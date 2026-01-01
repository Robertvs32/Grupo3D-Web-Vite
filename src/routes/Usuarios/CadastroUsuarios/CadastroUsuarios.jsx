import { httpsCallable, getFunctions } from 'firebase/functions';
import Alert from '../../../Components/Alert/Alert';
import { useState } from 'react';
import './cadastroUsuarios.css';
import Loader from '../../../Components/Loader/Loader';
import iconUser from '../../../assets/img/user-laranja.png';
import iconEmail from '../../../assets/img/email-laranja.png';
import iconSenha from '../../../assets/img/senha-laranja.png';

export default function CadastroUsuarios(){

    const [loader, setLoader] = useState(false);

    const [mensagem, setMensagem] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const functions = getFunctions();
    const criarUsuario = httpsCallable(functions, 'criarUsuario');

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    function alteraValue(event, setter){
        const value = event.target.value;
        setter(value);
    }

    function verificaEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex para verificar o padrao de email
        return regex.test(email);
    };

    async function auxiliarCriarUsuario(){
        if(nome == ''){
            setMensagem('Nome nao pode estar vazio!');
            setShowAlert(true);
            return;
        }
        if(email == '' || !verificaEmail(email)){
            setMensagem('Verifique o email !');
            setShowAlert(true);
            return;
        }
        if(senha == '' || confirmarSenha == '' || senha != confirmarSenha){
            setMensagem('Verifique a senha ou a confirmacao!');
            setShowAlert(true);
            return;
        }

        setLoader(true);

        try{
            const response = await criarUsuario({
                nome, 
                email, 
                senha
            });
            setMensagem(response.data);
        }catch(error){
            setMensagem(error.message);
        }
        setLoader(false);
        setShowAlert(true);
    }

    return(
        <div id="containerCadastroUsuarios">

            <h1 id="titleCadastroUsuarios">Cadastrar novo usuario</h1>

            <div id="cadastroContainer">

                <h2 id="titleCadastro">Cadastro</h2>
    
                <label className="labelCadastroUsuario">Nome</label>
                <div className="containerInput">
                    <img className="imgInput" src={iconUser} alt="" />

                    <input 
                        className="inputCadastroUsuario" 
                        placeholder="Ex: Luis"
                        type="text" 
                        onChange={(event) => alteraValue(event, setNome)}
                    />
                </div>
                

                <label className="labelCadastroUsuario">Email</label>
                <div className="containerInput">
                    <img className="imgInput" src={iconEmail} alt="" />

                    <input 
                        className="inputCadastroUsuario" 
                        placeholder="Ex: luis@gmail.com"
                        type="text" 
                        onChange={(event) => alteraValue(event, setEmail)}
                    />
                </div>

                <label className="labelCadastroUsuario">Senha</label>
                <div className="containerInput">
                    <img className="imgInput" src={iconSenha} alt="" />

                    <input 
                        className="inputCadastroUsuario"
                        placeholder="**********"
                        type="password" 
                        onChange={(event) => alteraValue(event, setSenha)}
                    />
                </div>

                <label className="labelCadastroUsuario">Confirmar senha</label>
                <div className="containerInput">
                    <img className="imgInput" src={iconSenha} alt="" />

                    <input 
                        className="inputCadastroUsuario" 
                        placeholder="**********"
                        type="password" 
                        onChange={(event) => alteraValue(event, setConfirmarSenha)}
                    />
                </div>

                <button 
                    id="btnCriarUsuario"
                    onClick={() => auxiliarCriarUsuario()}
                >
                    Criar usuario
                </button>
            </div>

            {showAlert && (
                <Alert
                    mensagem={mensagem}
                    setter={setShowAlert}
                />
            )}

            {loader && (
                <Loader/>
            )}

        </div>    
    )
}