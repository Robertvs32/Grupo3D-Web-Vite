import './alimentacao.css';
import lixeira from '../../../../assets/img/lixeira.png';

export default function Alimentacao({array, setter}){


    function removerRef(array, setter, id){
        if(array.length <= 1){
            alert("Valor mínimo atingido!");
            return;
        }

        const novoArray = array.filter((item) => {
            return item.id != id;
        });
        
        setter(novoArray);
    }


    function adicionaRef(array, setter){
        const id = array[array.length - 1].id + 1;
        const novoArray = [...array, 
            {
                id: id,
                refeicao: "",
                valor: ""
            }
        ]

        setter(novoArray);
    }

    function alteraValue(event, array ,setter, campo, id){
        const valor = event.target.value;
        const novoArray = array.map((item) => {
            if(item.id == id){
                return {...item, [campo]: valor.replace(',', '.')};
            }else{
                return{...item}
            }
        })

        setter(novoArray);

    }


    return(
        <div id="alimentacaoContainer">
            <div id="labelsAlimentacao">
                <label>Refeição</label>
                <label>Valor</label>
            </div>

            {array.map((refeicao) => {
                return(
                    <div className="inputsAlimentacao">
                        <div className="containerInput">
                            <button 
                                class="removerRef"
                                onClick={() => removerRef(array, setter, refeicao.id)}
                            >
                            <img className="imgRemoverRef" src={lixeira} />
                            </button>
                            <input 
                                className="inputRefeicao"
                                type="text"
                                value={refeicao.refeicao}
                                onChange={(e) => alteraValue(e, array, setter, "refeicao", refeicao.id )}
                            />
                                
                        </div>
                        <div className="containerInput">
                            <p>R$</p>
                            <input 
                                className="inputValor"
                                type="text" 
                                value={refeicao.valor}
                                onChange={(e) => alteraValue(e, array, setter, "valor", refeicao.id )}
                            />
                        </div>
                    </div>
                );
                
            })}

            <button id="addRef"
                onClick={() => adicionaRef(array, setter)}
            >
                Adicionar Refeição
            </button>


        </div>
    );
}