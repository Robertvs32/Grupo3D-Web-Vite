import './checkbox.css';

export default function Checkbox({name, state, setter}){

    function checkBoxChange(value, setter){
        setter(value);
    }

    return(
        <div className="checkBoxContainer">
            <label className="labelCheckBox">{name}</label>
            <div className="containerBtns">
                <button 
                    className={state == true ? "btnCheckBoxTrue" : "btnCheckBox"}
                    onClick={() => checkBoxChange(true, setter)}
                >
                Sim
                </button>

                <button 
                    className={state == false ? "btnCheckBoxFalse" : "btnCheckBox"}
                    onClick={() => checkBoxChange(false, setter)}
                >
                Nao
                </button>
            </div>
        </div>
    );
}