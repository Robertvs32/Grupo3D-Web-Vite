import './filtros.css'
import './Components/cardFiltros.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import InputFiltro from './Components/InputFiltro';
import SelectFiltro from './Components/SelectFiltro';
import { useState, useEffect } from 'react';
import usePlacas from '../../../../hooks/usePlacas';
import SelectPlaca from './Components/SelectPlaca';

export default function Filtros({setFiltros, filtros, limpaFiltros, buscaRelatorios}){

    const [placas, setPlacas] = useState([]);
    const { buscaPlacas } = usePlacas();

    useEffect(() => {
        const busca = async () => {
            const arrayPlacas = await buscaPlacas();
            setPlacas(arrayPlacas);
        }

        busca();
    }, [])

    const optionsVerificado = [
        {
            nome: "Verificado",
            value: true
        },
        {
            nome: "Não verificado",
            value: false
        }
        
    ]

    return(
        <>
            <h2 id="titleFiltros">Filtros</h2>

            <div id="filtrosContainer">
                <div className="cardFiltros">
                    <label className="labelFiltro">Data Inicio</label>

                    <DatePicker
                        selected={filtros.dataInicio}
                        onChange={(valor) => setFiltros({...filtros, ['dataInicio']: valor})}
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                    />
                </div>

                <div className="cardFiltros">
                    <label className="labelFiltro">Data Final</label>

                    <DatePicker
                        selected={filtros.dataFim}
                        onChange={(valor) => setFiltros({...filtros, ['dataFim']: valor})}
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                    />
                </div>

                <InputFiltro 
                    name="Motorista"
                    value={filtros.motorista}
                    campo="motorista"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <InputFiltro 
                    name="Job"
                    value={filtros.job}
                    campo="job"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <InputFiltro 
                    name="Atribuicao"
                    value={filtros.atribuicao}
                    campo="atribuicao"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <InputFiltro 
                    name="Setor"
                    value={filtros.setor}
                    campo="setor"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <InputFiltro 
                    name="Contratante"
                    value={filtros.contratante}
                    campo="contratante"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <InputFiltro 
                    name="Produtor"
                    value={filtros.produtor}
                    campo="setor"
                    setFiltros={setFiltros}
                    filtros={filtros}
                />

                <SelectPlaca
                    value={filtros.placa}
                    setFiltros={setFiltros}
                    filtros={filtros}
                    options={placas}
                />

                <SelectFiltro
                    name="Verificado"
                    campo="verificado"
                    value={filtros.verificado}
                    setFiltros={setFiltros}
                    filtros={filtros}
                    options={optionsVerificado}
                />
            </div>

            <button 
                id="btnFiltro"
                onClick={() => {
                    limpaFiltros(); 
                }}
            >
                Limpar Filtros
            </button>

            <button 
                id="btnFiltro"
                onClick={() => {
                    buscaRelatorios(); 
                }}
            >
                Aplicar filtros
            </button>

            
        </>
        
    );
}