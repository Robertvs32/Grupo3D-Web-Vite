import './setores.css'
import lixeira from '../../assets/img/lixeira.png'
import { useState, useEffect }from 'react'
import useRelatorio from '../../hooks/useRelatorio';

export default function Setores(){

    const { buscaSetor, atualizaSetores } = useRelatorio();

    const [setores, setSetores] = useState([]);

    function excluiSetor(item, index){
        if(item === "Outros"){
            alert("Não é possível excluir esse setor!");
            return;
        }
        const novoArray = setores.filter((itemF, indexF) => {
            return indexF != index;
        })
        setSetores(novoArray);
    }

    function alteraValue(event, index){
        const value = event.target.value;
        const novoArray = setores.map((itemF, indexF) => {
            if(indexF == index){
                return value;
            } else {
                return itemF;
            }
        });
        setSetores(novoArray);
    }

    function addSetor(){
        const novoArray = [...setores, ""];
        setSetores(novoArray);
    }

    useEffect(() => {
        const busca = async () => {
            const novoArray = await buscaSetor();
            setSetores(novoArray);
        }
        busca();
    }, []); 

    return(
        <div id="containerSetores">
                <h1 id="titleSetores">Setores</h1>

                <div id="cardContainerSetores">
                {setores.map((item, index) => (
                        <div className="cardSetores">
                            <button 
                                className="btnExcluir"
                                onClick={() => {
                                    const confirm = window.confirm("Deseja mesmo excluir?");
                                    confirm && excluiSetor(item, index)
                                }}
                            >
                                <img className="imgLixeira" src={lixeira} alt="" />
                            </button>
                            <input 
                                className="inputSetores"
                                type="text" 
                                value={item}
                                onChange={(event) => alteraValue(event, index)}
                            />
                        </div>
                    
                ))}
                </div>

                <button 
                    id="btnAdd"
                    onClick={() => addSetor()}
                >
                    Adicionar setor
                </button>
                
                <button 
                    id="btnAtualizar"
                    onClick={() => {
                        const confirm = window.confirm("Deseja atualizar as setores?");
                        confirm && atualizaSetores(setores)
                    }}
                >
                    Atualizar setores
                </button>

        </div>

    );
}