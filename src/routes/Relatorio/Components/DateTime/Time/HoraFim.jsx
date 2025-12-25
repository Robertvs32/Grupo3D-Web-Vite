import './hora.css'
import { useEffect, useState } from 'react';

export default function HoraFim({name, state, setter, dateTimeIni}){

    const [stringHora, setStringHora] = useState('');
    const [horaIni, setHoraIni] = useState(new Date());
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());

    function alteraHora(event){

        const string = event.target.value;
        const array = string.split(':');
        let novoDateTemporario = obterHora(new Date());
        novoDateTemporario.setHours(array[0])
        novoDateTemporario.setMinutes(array[1]);


        if(dataInicio.getTime() == dataFim.getTime() && novoDateTemporario < horaIni ){
            alert("A hora final não pode ser menor que a hora inicial!");
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

        const horaIniConvertida = obterHora(dateTimeIni);
        setHoraIni(horaIniConvertida);

        const novaDataFim = obterData(state);
        setDataFim(novaDataFim);

        const novaDataIni = obterData(dateTimeIni);
        setDataInicio(novaDataIni);    

        const dataFimTemp = obterData(state);
        const dataInicioTemp = obterData(dateTimeIni);

        const horaFimTemp = obterHora(state)
        const horaInicioTemp = obterHora(dateTimeIni)

        if(dataInicioTemp.getTime() === dataFimTemp.getTime() && horaInicioTemp.getTime() > horaFimTemp.getTime()){
            alert("A hora final não poder ser menor que a hora inicial")
            const horaFinal = obterHora(dateTimeIni);
            const hora = horaFinal.getHours();
            const minutos = horaFinal.getMinutes();

            dataFimTemp.setHours(hora, minutos, 0, 0);
            setter(dataFimTemp);
        }


    }, [state, dateTimeIni])




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