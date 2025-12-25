import './colecao.css'
import useColecoes from '../../../../hooks/useColecoes'

export default function Colecao({setShowModal, setShowAlertColecao, setMensagemColecao, arrayIds, nomeColecao, setNomeColecao, setArrayIds}){

    const { addColecao } = useColecoes();

    return(
        <div id="containerColecao">
            <div id="conteudoColecao">
                
                <button 
                    id="btnFechar"
                    onClick={() => setShowModal(ant => !ant)}
                >
                    X
                </button>

                <h1 id="titleColecao">Nova colecao</h1>
                <h2 id="titleSelecionados">Relatorios selecionados</h2>
                
                {arrayIds.map((item, index) => (
                    <p className="idsText">{`${index + 1}. ${item}`}</p>
                ))}
                
                <label id="labelColecao">Nome da colecao</label>
                <input 
                    id="inputColecao" 
                    type="text" 
                    value={nomeColecao}
                    onChange={(event) => setNomeColecao(event.target.value)}
                />

                <button 
                    id="btnCriarColecao"
                    onClick={async () => {
                        if(nomeColecao == ''){
                            setMensagemColecao("A colecao precisa ter um nome!");
                            setShowAlertColecao(ant => !ant);
                            return;
                        }
                        const resposta = await addColecao(arrayIds, nomeColecao);
                        setMensagemColecao(resposta);
                        setShowModal(ant => !ant);
                        setShowAlertColecao(ant => !ant);
                        setNomeColecao('');
                        setArrayIds([]);
                    }}
                >
                    Adicionar colecao
                </button>
            </div>
        </div>
    )
}