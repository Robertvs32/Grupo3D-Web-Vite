import './inputRelatorio.css'

export default function InputRelatorio({name, value, setter}){

    function changeValue(e, setter){
        const value = e.target.value.replace(',', '.');
        setter(value);
    }

    return(
        <div className="containerInputRelatorio">
            <label className="labelInputRelatorio">{name}</label>
            <input 
                className="inputRelatorio"
                type="text" 
                value={value}
                onChange={e => changeValue(e, setter)}
            />
        </div>
    );
}