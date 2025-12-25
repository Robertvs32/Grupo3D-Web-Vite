import './data.css'
import { useState, useEffect } from 'react';

export default function DataFim({state, setter, dateTimeIni}){

    const [dataString, setDataString] = useState('');
    const [dataIni, setDataIni] = useState(new Date());

    function alteraDate(event){
        
        const stringDate = event.target.value;
        const arrayString = stringDate.split('-');
        let dataTemporaria = obterData(new Date());
        dataTemporaria.setFullYear(Number(arrayString[0]), Number(arrayString[1] - 1), Number(arrayString[2]));

        if(dataTemporaria < dataIni){
            alert("A data Final não pode ser menor que a data inicial!");
            return;
        }

        dataTemporaria = new Date(state);
        dataTemporaria.setFullYear(Number(arrayString[0]), Number(arrayString[1] - 1), Number(arrayString[2]));
        setter(dataTemporaria);

    }

    function obterData(date){
        const novaData = new Date(date);
        novaData.setHours(0, 0, 0, 0);

        return novaData;
    }

    function dateParaString(date){
        const ano = date.getFullYear().toString();
        const dia = date.getDate().toString().padStart(2, "0");
        const mes = (date.getMonth() + 1).toString().padStart(2, "0");

        const string = `${ano}-${mes}-${dia}`;

        return string;
    }

    //CAPTURA E CONVERTE O VALOR DATA DO STATE E PASSA PARA O VALUE DO INPUT NO FORMATO CORRETO
    useEffect(() => {
        //CONVERTE E ATRIBUI O VALOR DO STATE PARA O VALUE DO INPUT
        const string = dateParaString(state);
        setDataString(string);

        const novaDataIni = obterData(dateTimeIni);
        setDataIni(novaDataIni);

    }, [state, dateTimeIni]);

    return(
        <div className="containerDate">
            <label className="labelDate">Data final</label>
            <input 
                type="date" 
                className="inputDate" 
                value={dataString}
                onChange={(event) => alteraDate(event)}
            />
        </div>
    );
}