import './alert.css'

export default function Alert({mensagem, setter}){
    return(
        <div id="containerAlert">
            <div id="contentAlert">
                <p>{mensagem}</p>
                <button 
                    id="btnOk"
                    onClick={() => setter(ant => !ant)}
                >
                    Ok
                    </button>
            </div>
        </div>
    );
}