import './pago.css';

export default function Pago({state, setter}){

    function alteraValue(event, setter){
        setter(event.target.value);
    }

    return(
        <div id="containerPago">
            <label id="labelPago">Pagamento</label>
            <select 
                id="selectPago"
                value={state}
                onChange={(event) => alteraValue(event, setter)}
            >
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
            </select>
        </div>  
    );
}