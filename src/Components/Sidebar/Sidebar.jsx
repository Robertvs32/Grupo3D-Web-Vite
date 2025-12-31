import './sidebar.css';
import Logo from '../../assets/img/logo.png';
import Logout from '../../assets/img/logout.png';
import CardSidebar from './CardSidebar';
import relatorios from '../../assets/img/relatorios.png';
import relatorio from '../../assets/img/relatorio.png'
import Placa from '../../assets/img/placa.png';
import Usuario from '../../assets/img/usuario.png'
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import setaEsquerda from '../../assets/img/esquerda.png';
import setaDireita from '../../assets/img/direita.png';
import atribuicao from '../../assets/img/atribuicao.png'
import Setores from '../../assets/img/setores.png'

export default function Sidebar({setterLogout}){

    const [showSidebar, setShowSidebar] = useState(true);

    return(
        <div className={`${showSidebar ? 'sidebarContainer' : 'sidebarContainerFechado'}`}>
            <img id="imgSidebarContainer" src={Logo} alt=""/>

            <CardSidebar
                titulo="Relatórios"
                img={relatorio}
                path="/"
                setter={setShowSidebar}
            />

            <CardSidebar
                titulo="Placas"
                img={Placa}
                path="placas"
                setter={setShowSidebar}
            />

            <CardSidebar
                titulo="Atribuicoes"
                img={atribuicao}
                path="atribuicoes"
                setter={setShowSidebar}
            />

            <CardSidebar
                titulo="Setores"
                img={Setores}
                path="setores"
                setter={setShowSidebar}
            />

            <CardSidebar
                titulo="Usuários"
                img={Usuario}
                path="usuarios"
                setter={setShowSidebar}
            />

            <button 
                id="logoutIcon"
                onClick={() => {
                    setterLogout(false);
                    signOut(auth);
                }}
            > 
                <img src={Logout}/>
                
            </button>

            <button id="btnSidebar"
                onClick={() => setShowSidebar(ant => !ant)}
            >
                <img src={showSidebar ? setaEsquerda : setaDireita} alt="Seta para fechar sidebar"/>
            </button>
            
            
        </div>
    );
}