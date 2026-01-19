import './relatorios.css'
import RelatoriosPreview from './Components/RelatorioPreview/RelatoriosPreview';
import Filtros from './Components/Filtros/Filtros'
import useRelatorios from '../../hooks/useRelatorios';
import { useEffect, useState } from 'react';
import iconMotorista from '../../assets/img/condutor.png';
import iconContratante from '../../assets/img/aperto-de-mao.png';
import { useNavigate } from 'react-router';
import Alert from '../../Components/Alert/Alert'

export default function RelatoriosPendentes(){

    const { relatorios, buscaRelatorios, excluiDocumento, filtros, setFiltros, limpaFiltros } = useRelatorios();
    const [arrayIds, setArrayIds] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [gatilho, setGatilho] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        buscaRelatorios();
        console.log(relatorios[0])
    },[gatilho])

    return(
        <div id="containerRel">
            <h1 id="titleRel">Relatórios</h1>         

            <Filtros
                filtros={filtros}
                buscaRelatorios={buscaRelatorios}
                setFiltros={setFiltros}
                limpaFiltros={limpaFiltros}
                setGatilho={setGatilho}
            />

            <div style={{display: 'flex'}}>
                <button 
                    className="btnRelatorio"
                    onClick={() => {
                        if(arrayIds.length == 0){
                            setShowAlert(true);
                            return;
                        }
                        navigate('relatorioMotorista', {state: arrayIds})
                    }}
                >
                    <img src={iconMotorista} alt="icone motorista" />
                </button>

                <button
                    className="btnRelatorio"
                    onClick={() => {
                        if(arrayIds.length == 0){
                            setShowAlert(true);
                            return;
                        }
                        navigate('relatorioContratante', {state: arrayIds})
                    }}
                >
                    <img src={iconContratante} alt="icone contratante" />
                </button>
            </div>

            <RelatoriosPreview
                relatorios={relatorios}
                buscaRelatorios={buscaRelatorios}
                excluiDocumento={excluiDocumento}
                colecao={arrayIds}
                setColecao={setArrayIds}
            />

            {showAlert && (
                <Alert
                    mensagem="Selecione pelo menos um relatorio!"
                    setter={setShowAlert}
                />
            )}
            
            
            
        </div>
    );
}