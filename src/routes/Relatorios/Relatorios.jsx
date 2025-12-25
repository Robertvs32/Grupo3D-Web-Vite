import './relatorios.css'
import RelatoriosPreview from './Components/RelatorioPreview/RelatoriosPreview';
import Filtros from './Components/Filtros/Filtros'
import useRelatorios from '../../hooks/useRelatorios';
import { useEffect, useState } from 'react'
import Colecao from './Components/Colecao/Colecao';
import Alert from '../../Components/Alert/Alert';

export default function RelatoriosPendentes(){

    const [showModal, setShowModal] = useState(false);
    const [nomeColecao, setNomeColecao] = useState('');

    const { relatorios, buscaRelatorios, excluiDocumento, filtros, setFiltros, limpaFiltros, gatilho } = useRelatorios();

    const [arrayIds, setArrayIds] = useState([]);

    const [showAlertSelect, setShowAlertSelect] = useState(false);
    const [showAlertColecao, setShowAlertColecao] = useState(false);
    const [mensagemColecao, setMensagemColecao] = useState('');

    useEffect(() => {
        buscaRelatorios();
    },[])

    return(
        <div id="containerRel">
            <h1 id="titleRel">Relatórios</h1>

            <Filtros
                filtros={filtros}
                buscaRelatorios={buscaRelatorios}
                setFiltros={setFiltros}
                limpaFiltros={limpaFiltros}
            />

            <div>
                <button 
                    id="btnAddColecao"
                    onClick={() => {
                        if(arrayIds.length == 0){
                            setShowAlertSelect(true);
                            return;
                        }
                        setShowModal(ant => !ant)
                    }}
                >
                    Criar colecao
                </button>
            </div>

            <RelatoriosPreview
                relatorios={relatorios}
                buscaRelatorios={buscaRelatorios}
                excluiDocumento={excluiDocumento}
                colecao={arrayIds}
                setColecao={setArrayIds}
            />

            {showModal && (
                <Colecao
                    setShowModal={setShowModal}
                    arrayIds={arrayIds}
                    nomeColecao={nomeColecao}
                    setNomeColecao={setNomeColecao}
                    setShowAlertColecao={setShowAlertColecao}
                    setMensagemColecao={setMensagemColecao}
                    setArrayIds={setArrayIds}
                />
            )}

            {showAlertSelect && (
                <Alert
                    mensagem="Selecione pelo menos um relatorio!"
                    setter={setShowAlertSelect}
                />
            )}

            {showAlertColecao && (
                <Alert
                    mensagem={mensagemColecao}
                    setter={setShowAlertColecao}
                />
            )}
            
            

        </div>
    );
}