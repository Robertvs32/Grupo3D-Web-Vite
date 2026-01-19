import './data.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale' 

export default function DateTimeIni({state, setter, dateTimeFim}){

    function changeValue(value){
        if(value > dateTimeFim){
            alert("A data de inicio nao pode ser maior que a data final!");
            return;
        }
        setter(value);
    }

    return(
        <div className="containerDateTime">
            <label className="labelDateTime">Data e hora - Inicio</label>
            <DatePicker
                selected={state}
                onChange={(value) => changeValue(value)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeIntervals={1}
            />
        </div>
    )
}