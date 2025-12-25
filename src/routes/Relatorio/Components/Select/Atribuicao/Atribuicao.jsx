import '../select.css';
import useRelatorio from '../../../../../hooks/useRelatorio';
import { useEffect, useState } from 'react';

export default function Atribuicao({state, setter}){

    const { buscaAtribuicoes } = useRelatorio();
    const [atribuicoes, setAtribuicoes] = useState([]);

    useEffect(() => {
        const busca = async () => {
            const resultado = await buscaAtribuicoes();
            setAtribuicoes(resultado);
        }

        busca();
    }, [])

    return(
        <div className="containerSelectRelatorio">
            <label className="labelSelectRelatorio">Atribuicao</label>
            <select 
                className="selectRelatorio"
                onChange={(event) => setter(event.target.value)}
                value={state}
            >

                <option value="Selecionar atribuição" disabled>Selecionar atribuição</option>

                {atribuicoes.map((opcao => (
                    <option value={opcao}>{opcao}</option>
                )))}
            </select>
        </div>
    );
}