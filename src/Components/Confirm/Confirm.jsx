import './confirm.css'

export default function Confirm({mensagem, actionConfirm, actionCancel}){
    return(
        <div id="containerConfirm">
            <div id="contentConfirm">
                <p>{mensagem}</p>

                <div id="btnsConfirm">

                    <button 
                        id="btnCancel"
                        onClick={() => actionCancel()}
                    >
                        Cancelar
                    </button>

                    <button 
                        id="btnOk"
                        onClick={() => actionConfirm()}
                    >
                        Ok
                    </button>

                    
                </div>

                
            </div>
        </div>
    );
}

