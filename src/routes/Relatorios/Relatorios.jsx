import './relatorios.css'
import RelatoriosPreview from './Components/RelatorioPreview/RelatoriosPreview';
import Filtros from './Components/Filtros/Filtros'
import useRelatorios from '../../hooks/useRelatorios';
import { useEffect, useState } from 'react'
import Alert from '../../Components/Alert/Alert';

export default function RelatoriosPendentes(){

    const { relatorios, buscaRelatorios, excluiDocumento, filtros, setFiltros, limpaFiltros, gatilho } = useRelatorios();

    const [arrayIds, setArrayIds] = useState([]);

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

            <RelatoriosPreview
                relatorios={relatorios}
                buscaRelatorios={buscaRelatorios}
                excluiDocumento={excluiDocumento}
                colecao={arrayIds}
                setColecao={setArrayIds}
            />
            
        </div>
    );
}