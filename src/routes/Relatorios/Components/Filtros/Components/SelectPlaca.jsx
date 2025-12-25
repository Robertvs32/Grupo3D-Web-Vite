import './cardFiltros.css';

export default function SelectPlaca({value, setFiltros, filtros, options}){

    function alteraFiltro(event){
        const valor = event.target.value;
        setFiltros({...filtros, placa: valor});
    }

    return(
        <div className="cardFiltros">
            <label className="labelFiltro">Placa</label>

                <select
                    className="inputFiltro" 
                    value={value} 
                    onChange={(e) => alteraFiltro(e)}
                >
                    <option value="">Geral</option>

                    {options.map(option => (
                        <option value={option.placa}>{option.placa}</option>
                    ))}
                    
                </select>
        </div>
    );
}