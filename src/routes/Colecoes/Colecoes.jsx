import './colecoes.css';
import motoristaIcon from '../../assets/img/condutor.png';
import contratanteIcon from '../../assets/img/aperto-de-mao.png';
import lixeira from '../../assets/img/lixeira.png'
import useColecoes from '../../hooks/useColecoes';
import { useState, useEffect } from 'react';
import Alert from '../../Components/Alert/Alert';
import Confirm from '../../Components/Confirm/Confirm';
import { useNavigate } from 'react-router';

export default function Colecoes(){

    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [colecoes, setColecoes] = useState([]);
    const [nomeFiltro, setNomeFiltro] = useState('');

    const [idSelecionado, setIdSelecionado] = useState('');
    const [mensagem, setMensagem] = useState('');

    const { buscaColecoes, excluirColecao } = useColecoes();

    useEffect(() => {
        const busca = async () => {
            const arrayColecoes = await buscaColecoes(nomeFiltro);
            setColecoes(arrayColecoes);
        }
        busca();
    }, [])

    const filtrarColecoes = async (filtro) => {
        const array = await buscaColecoes(filtro);
        setColecoes(array);
    }

    return(
        <div id="containerColecoes">

            <h1 id="titleColecoes">Colecoes</h1>

            <div id="containerFiltros">
                <label id="labelFiltroColecoes">Filtrar por nome</label>
                <input 
                    id="inputFiltroColecoes" 
                    type="text"
                    value={nomeFiltro}
                    onChange={(event) => setNomeFiltro(event.target.value)}
                />

                <div id="containerBtnsFiltro">
                    <button 
                        id="btnFiltroColecoes"
                        onClick={async () => {
                            setNomeFiltro('');
                            await filtrarColecoes('');
                        }}
                    >
                        Limpar
                    </button>

                    <button 
                        id="btnFiltroColecoes"
                        onClick={async () => await filtrarColecoes(nomeFiltro)}
                    >
                        Aplicar
                    </button>
                </div>
                
            </div>

            <div id="containerCardColecoes">

                {colecoes.map(item => (
                    <div className="cardColecao" key={item.id}>
                        <button 
                            className="deleteColecao"
                            onClick={() => {
                                setIdSelecionado(item.id);
                                setShowConfirm(true);
                            }}
                        >
                            <img src={lixeira} alt="" />
                        </button>

                        <h1 className="nomeColecao">{item.nome}</h1>
                        <div className="containerGerarRelatorio">
                            <button 
                                className="btnGerarRelatorio" 
                            >
                                <img src={motoristaIcon} alt="" />
                            </button>
                            <button 
                                className="btnGerarRelatorio"
                                onClick={() => navigate('/relatoriocontratante', {state: item.relatorios})}
                            >
                                <img src={contratanteIcon} alt=""/>
                            </button>
                        </div>
                    </div>
                ))}

            </div>
            
            {showConfirm && (
                <Confirm
                    mensagem="Deseja excluir?"
                    actionCancel={() => setShowConfirm(false)}
                    actionConfirm={async () => {
                        const mensagem = await excluirColecao(idSelecionado);
                        setMensagem(mensagem);
                        setShowAlert(true);
                        setShowConfirm(false);
                        const array = await buscaColecoes('');
                        setColecoes(array);
                    }}
                />
            )}

            {showAlert && (
                <Alert
                    mensagem={mensagem}
                    setter={setShowAlert}
                />
            )}

        </div>
    )
}