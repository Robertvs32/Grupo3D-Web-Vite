import '../select.css';
import { useEffect, useState } from 'react';
import usePlacas from '../../../../../hooks/usePlacas';

export default function Placa({state, setter}){

    const { buscaPlacas } = usePlacas();
    const [placas, setPlacas] = useState([]);

    useEffect(() => {
        const busca = async () => {
            let arrayPlacas = await buscaPlacas();
            setPlacas(arrayPlacas);
        }

        busca();
    }, [])

    return(
        <div className="containerSelectRelatorio">
            <label className="labelSelectRelatorio">Placa</label>
            <select 
                className="selectRelatorio"
                onChange={(event) => {setter(event.target.value)}}
                value={state}
            >
                {placas.map((opcao => (
                    <option value={opcao.placa}>{opcao.placa}</option>
                )))}
            </select>
        </div>
    );
}