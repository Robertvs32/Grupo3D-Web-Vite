import './atribuicoes.css'
import lixeira from '../../assets/img/lixeira.png'
import { useState, useEffect }from 'react'
import useRelatorio from '../../hooks/useRelatorio';

export default function Atribuicoes(){

    const { buscaAtribuicoes, atualizaAtribuicoes } = useRelatorio();

    const [atribuicoes, setAtribuicoes] = useState([]);

    function excluiAtribuicao(item, index){
        if(item === "Outros"){
            alert("Não é possível excluir essa atribuição!");
            return;
        }
        const novoArray = atribuicoes.filter((itemF, indexF) => {
            return indexF != index;
        })
        setAtribuicoes(novoArray);
    }

    function alteraValue(event, index){
        const value = event.target.value;
        const novoArray = atribuicoes.map((itemF, indexF) => {
            if(indexF == index){
                return value;
            } else {
                return itemF;
            }
        });
        setAtribuicoes(novoArray);
    }

    function addAtribuicao(){
        const novoArray = [...atribuicoes, ""];
        setAtribuicoes(novoArray);
    }

    useEffect(() => {
        const busca = async () => {
            const novoArray = await buscaAtribuicoes();
            setAtribuicoes(novoArray);
        }
        busca();
    }, []); 

    return(
        <div id="containerAtribuicoes">
                <h1 id="titleAtribuicoes">Atribuições</h1>

                <div id="cardContainerAtribuicoes">
                {atribuicoes.map((item, index) => (
                        <div className="cardAtribuicoes">
                            <button 
                                className="btnExcluir"
                                onClick={() => {
                                    const confirm = window.confirm("Deseja mesmo excluir?");
                                    confirm && excluiAtribuicao(item, index)
                                }}
                            >
                                <img className="imgLixeira" src={lixeira} alt="" />
                            </button>
                            <input 
                                className="inputAtribuicoes"
                                type="text" 
                                value={item}
                                onChange={(event) => alteraValue(event, index)}
                            />
                        </div>
                    
                ))}
                </div>

                <button 
                    id="btnAdd"
                    onClick={() => addAtribuicao()}
                >
                    Adicionar atribuicao
                </button>
                
                <button 
                    id="btnAtualizar"
                    onClick={() => {
                        const confirm = window.confirm("Deseja atualizar as atribuições?");
                        confirm && atualizaAtribuicoes(atribuicoes)
                    }}
                >
                    Atualizar atribuições
                </button>

        </div>

    );
}