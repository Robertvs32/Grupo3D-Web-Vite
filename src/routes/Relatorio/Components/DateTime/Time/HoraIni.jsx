import './hora.css'
import { useEffect, useState } from 'react';

export default function HoraIni({name, state, setter, dateTimeFim}){

    const [stringHora, setStringHora] = useState('');
    const [horaFim, setHoraFim] = useState(new Date());
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());

    function alteraHora(event){

        const string = event.target.value;
        const array = string.split(':');
        let novoDateTemporario = obterHora(new Date());
        novoDateTemporario.setHours(array[0])
        novoDateTemporario.setMinutes(array[1]);


        if(dataInicio.getTime() == dataFim.getTime() && novoDateTemporario > horaFim ){
            alert("A hora de início não pode ser maior que a hora final!");
            return;
        } 

        novoDateTemporario = new Date(state);
        novoDateTemporario.setHours(array[0], array[1], 0, 0);

        setter(novoDateTemporario);

    }


    function obterHora(date){
        const dataTemporaria = new Date(date);
        dataTemporaria.setFullYear(1970, 0, 1);
        dataTemporaria.setSeconds(0);
        dataTemporaria.setMilliseconds(0);

        return dataTemporaria;
    }


    function obterData(date){
        const novaData = new Date(date);
        novaData.setHours(0, 0, 0, 0);

        return novaData;
    }

    function horaParaString(date){
        const hora = date.getHours().toString().padStart(2, "0");
        const minutos = date.getMinutes().toString().padStart(2, "0");

        const string = `${hora}:${minutos}:00`;

        return string;
    }

    useEffect(() => {
        const string = horaParaString(state);
        setStringHora(string);

        const horaFimConvertida = obterHora(dateTimeFim);
        setHoraFim(horaFimConvertida);

        const novaDataInicio = obterData(state);
        setDataInicio(novaDataInicio);

        const novaDataFim = obterData(dateTimeFim);
        setDataFim(novaDataFim);    
    }, [state, dateTimeFim])


    return(
        <div className="containerTime">
            <label className="labelTime">{name}</label>
            <input 
                type="time" 
                className="inputTime" 
                value={stringHora}
                onChange={(event) => alteraHora(event)}
            />

        </div>
    );
}