import './data.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale' 

export default function DateTimeFim({state, setter, dateTimeIni}){

    function changeValue(value){
        if(value < dateTimeIni){
            alert("A data final nao pode ser menor que a de inicio!");
            return;
        }
        setter(value);
    }

    return(
        <div className="containerDateTime">
            <label className="labelDateTime">Data e hora - Fim</label>
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