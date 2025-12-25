import './cardFiltros.css';

export default function SelectFiltro({name, campo, value, setFiltros, filtros, options}){

    function alteraFiltro(event, campo){
        const valor = event.target.value;
        setFiltros({...filtros, [campo]: valor});
    }

    return(
        <div className="cardFiltros">
            <label className="labelFiltro">{name}</label>

                <select
                    className="inputFiltro" 
                    value={value} 
                    onChange={(e) => alteraFiltro(e, campo)}
                >
                    <option value="">Geral</option>

                    {options.map(option => (
                        <option value={option.value}>{option.nome}</option>
                    ))}
                    
                </select>
        </div>
    );
}