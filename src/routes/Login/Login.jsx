import './login.css';
import Logo from '../../assets/img/logo.png';
import User from '../../assets/img/user.png';
import Senha from '../../assets/img/senha.png';
import useLogin from '../../hooks/useLogin';

export default function Login(){

    const { login, email, senha, setEmail, setSenha } = useLogin();

    function alteraDados(event, setter){
        const value = event.target.value;
        setter(value);
    }

    return(
        <div id="containerLogin">
            <div id="loginSubContainer">
                <img id="imgLogin" src={Logo} alt="" />

                <div className="inputLogin">
                    <img className="imgInputUser" src={User} alt="user" />
                    <input 
                        className="input" 
                        type="text"
                        value={email}
                        onChange={(event) => {alteraDados(event, setEmail)}}
                    />
                </div>

                <div className="inputLogin">
                    <img className="imgInputSenha" src={Senha} alt="senha" />
                    <input 
                        className="input" 
                        type="password"
                        value={senha}
                        onChange={(event) => {alteraDados(event, setSenha)}}
                    />
                </div>

                <button 
                    id="btnLogin"
                    onClick={async () => await login(email, senha)}
                >
                    Fazer login
                </button>

            </div>
        </div>
    );
}