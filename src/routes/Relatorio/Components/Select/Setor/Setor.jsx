import '../select.css';
import { useState, useEffect } from 'react';
import useRelatorio from '../../../../../hooks/useRelatorio';

export default function Setor({state, setter}){

    const { buscaSetor } = useRelatorio();
    const [setor, setSetor] = useState([]);
    
    useEffect(() => {
        const busca = async () => {
            const resposta = await buscaSetor();
            setSetor(resposta);
        }

        busca();
    }, [])

    return(
        <div className="containerSelectRelatorio">
            <label className="labelSelectRelatorio">Setor</label>
            <select 
                className="selectRelatorio"
                onChange={(event) => setter(event.target.value)}
                value={state}
            >

                <option value="Selecionar setor" disabled>Selecionar setor</option>

                {setor.map((opcao => (
                    <option value={opcao}>{opcao}</option>
                )))}
            </select>
        </div>
    );
}