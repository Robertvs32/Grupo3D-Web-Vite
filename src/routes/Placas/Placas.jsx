import './placas.css'
import Lixeira from '../../assets/img/lixeira.png'
import usePlacas from '../../hooks/usePlacas';
import { useState, useEffect } from 'react';

export default function Placas(){

    const { buscaPlacas, atualizaPlacas } = usePlacas();
    const [arrayPlacas, setArrayPlacas] = useState([]);

    function alteraValue(event, id, campo){
        let value = event.target.value;
        if(campo == "valor"){
            value = (value.replace(",","."));
        }
        
        const novoArray = arrayPlacas.map((item) => {
            if(item.id == id){
                return(
                    {...item, [campo]: value}
                );
            }
            return item;
        })

        setArrayPlacas(novoArray);
    }

    function removerPlaca(id){
        const novoArray = arrayPlacas.filter((item) => {
            if(item.id != id){
                return(item);
            }
        })

        setArrayPlacas(novoArray)
    }

    function addPlaca(){
        let id = 1;

        if(arrayPlacas.length != 0){
            id = arrayPlacas[arrayPlacas.length - 1].id + 1;
        }
        
        const novoArray = [...arrayPlacas, {id: id, carro: "", placa: "", valor_hora_motorista: "", valor_hora_viagem_motorista: ""}];
        setArrayPlacas(novoArray);
    }

    useEffect(() => {
        const busca = async () => {
            const array = await buscaPlacas();
            setArrayPlacas(array);
        }
        busca();
    }, [])

    return(
        <div id="containerPlacas">
            <h1 id="titlePlacas">Placas e valores</h1>

            <div className="containerPlacasInfos">

                {arrayPlacas.map((item) => {
                    return(
                        <>
                        <div className="cardPlaca">

                            <button 
                                className="btnRemovePlaca"
                                onClick={() => {
                                    const confirm = window.confirm("Deseja excluir?");
                                    confirm && removerPlaca(item.id)
                                }}
                            >
                                <img className="imgRemovePlaca" src={Lixeira} alt="" />
                            </button>

                            <div className="inputCards">
                                <label className="labelInputCards">Veículo</label>
                                    <input 
                                    className="inputPlaca" 
                                    type="text" 
                                    value={item.carro}
                                    onChange={(event) => alteraValue(event, item.id, "carro")}
                                />
                            </div>

                            <div className="inputCards">
                                <label className="labelInputCards">Placa</label>
                                    <input 
                                    className="inputPlaca" 
                                    type="text" 
                                    value={item.placa}
                                    onChange={(event) => alteraValue(event, item.id, "placa")}
                                />
                            </div>

                            <div className="inputCards">
                                <label className="labelInputCards">Valor hora / motorista</label>
                                <input 
                                    className="inputPlaca" 
                                    type="text" 
                                    value={item.valor_hora_motorista}
                                    onChange={(event) => alteraValue(event, item.id, "valor_hora_motorista")}
                                />
                            </div>

                            <div className="inputCards">
                                <label className="labelInputCards">Valor hora viagem / motorista</label>
                                <input 
                                    className="inputPlaca" 
                                    type="text" 
                                    value={item.valor_hora_viagem_motorista}
                                    onChange={(event) => alteraValue(event, item.id, "valor_hora_viagem_motorista")}
                                />
                            </div>
                        </div>
                        </>
                    );
                })}

                <button
                    id="btnAddPlaca"
                    onClick={() => addPlaca()}
                >
                    Adicionar placa
                </button>

            </div>

            <button
                id="btnEnviarPlacas"
                onClick={async () => {
                    const confirm = window.confirm("Deseja atualizar?");
                    confirm && await atualizaPlacas(arrayPlacas)}
                    
                }
            >
                Atualizar placas
            </button>
        </div>

    );
}