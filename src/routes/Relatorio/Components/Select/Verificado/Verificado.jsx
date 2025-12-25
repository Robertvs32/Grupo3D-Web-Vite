import './verificado.css';

export default function Verificado({state, setter}){

    function alteraValue(event, setter){
        setter(event.target.value);
    }

    return(
        <div id="containerVerificado">
            <label id="labelVerificado">Verificado</label>
            <select 
                id="selectVerificado"
                value={state}
                onChange={(event) => alteraValue(event, setter)}
            >
                <option value={true}>Verificado</option>
                <option value={false}>Não verificado</option>
            </select>
        </div>
    );
}