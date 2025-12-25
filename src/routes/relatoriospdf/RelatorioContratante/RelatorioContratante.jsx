import './relatorioContratante.css';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import RelatorioContratantePDF from './relatorioContratantePDF';
import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router';
import usePdf from '../../../hooks/usePdf';

export default function RelatorioContratante(){

    const location = useLocation();
    const [arrayRelatorios, setArrayRelatorios] = useState([]);
    const [placas, setPlacas] = useState([]);
    const [total, setTotal] = useState(0);
    const { buscaRelatoriosPdf } = usePdf();
    const [flag, setFlag] = useState(false);

    /* 
        NA PRIMEIRA RENDERIZACAO DO COMPONENTE
        RECEBE OS DADOS DO NAVIGATION (ARRAY DE IDS)
        BUSCA OS RELATORIOS DESSES IDS
        ATUALIZA O ESTADO DE RELATORIOS (DADOS)
        ATUALIZA O ESTADO DE PLACAS (SEM DUPLICIDADE E JA COM VALORES PARA PREENCHER)
    */
    useEffect(() => {
        const ids = location.state;

        if(ids && ids.length != 0){
            const busca = async () => {
                const arrayTemp = await buscaRelatoriosPdf(ids);
                setArrayRelatorios(arrayTemp);
                atualizaPlacaComValores(arrayTemp)
            }
            busca();
        }
    }, [])

    useEffect(() => {
        atualizaValorTotal(arrayRelatorios)
    }, [placas])


    //FUNCAO PARA ATUALIZAR O STATE DE PLACAS UTILIZADAS SEM DUPLICIDADE E JA COM OS CAMPOS DE VALORES
    function atualizaPlacaComValores(relatorio){
        const arraySomentePlacas = relatorio.map((item) => {
            return item.placa;
        })

        const arraySemDuplicados = [...new Set(arraySomentePlacas)];

        const arrayPlacaComValores = arraySemDuplicados.map((item) => {
            return {placa: item, valorHora: 0, valorKm: 0}
        })

        setPlacas(arrayPlacaComValores)
    }

    //FUNCAO PARA ALTERAR OS VALORES DE UMA PLACA COM BASE EM UM CAMPO ESPECIFICO
    function alteraValue(event, placa, campo){
        let value = event.target.value;
        
        const arrayModificado = placas.map((item) => {
            if(item.placa == placa){
                return({...item, [campo]: value.replace(',', '.')});
            }
            return({...item})
        })
        
        const arrayVerificado = verificaValoresPlacas(arrayModificado);

        setPlacas(arrayVerificado);
    }

    //FUNCAO PARA BUSCAR O VALOR DO ARRAY PLACAS COM BASE EM UM CAMPO ESPECIFICO
    function buscaValorPlaca(placa, campo){
        const objetoPlaca = placas.find((item) => {
            return item.placa == placa;
        });
        if(objetoPlaca){
            return objetoPlaca[campo];
        }
        return 0;
    }

    //FUNCAO PARA ATUALIZAR O VALOR TOTAL, PERCORRENDO OS RELATORIOS E BUSCANDO OS VALORES DAS PLACAS UTILIZADAS
    function atualizaValorTotal(arrayRelatorios){
        const valorTotal = arrayRelatorios.reduce((contador, item) => {
            // busca os valores por horas trabalhadas e kms rodados
            const valorHora = Number(item.horasTrabalhadas) * Number(buscaValorPlaca(item.placa, 'valorHora'));
            const valorKm = Number(item.kmRodado) * Number(buscaValorPlaca(item.placa, 'valorKm'));

            let calculoViagem = 0;
            
            //atribui o valor das horas trabalhadas
            calculoViagem += Number(valorHora.toFixed(2));

            //se a viagem foi fora de perimetro, adiciona tambem o valor de kms
            //Adicionar campo de perimetro no relatorio para usar aqui
            if(true){
                calculoViagem += Number(valorKm.toFixed(2))
            };

            console.log(`calculo viagem: ${calculoViagem}`)
            return contador + calculoViagem;
            
        }, 0)
        setTotal(valorTotal)
    }


    //VERIFICA SE OS VALORES FORAM PREENCHIDOS COM NUMEROS E RETORNA UMA CONFIRMACAO SE ESTA TUDO CORRETO
    function verificaValoresPlacas(arrayPlacas){

        const placasTemp = arrayPlacas.map((item) => {
            const verificaHora = isNaN(Number(item.valorHora));
            const verificaKm = isNaN(Number(item.valorKm));

            if(verificaHora && verificaKm){
                alert("Digite um numero valido!")
                return({...item, valorHora: 0, valorKm: 0})
            }
            
            if(verificaHora){
                alert("Digite um numero valido!")
                return({...item, valorHora: 0})
            }

            if(verificaKm){
                alert("Digite um numero valido!")
                return({...item, valorKm: 0})
            }

            return({...item})
        })

        return placasTemp; 
    }

    //COMPONENTE DE RELATORIO DO CONTRATANTE UTILIZANDO O MEMO PARA EVITAR RENDERIZACOES DESNECESSARIAS
    const relatorioContratanteMemo = useMemo(() => (
        <PDFViewer id="pdfViewer">
            <RelatorioContratantePDF
                arrayRelatorios={arrayRelatorios}
                placas={placas}
                valorTotal={total}
            />  
        </PDFViewer>
    ), [arrayRelatorios, flag])


    //COMPONENTE PAGINA RELATORIO CONTRATANTE
    return(
        <div id="containerRelatorioContratante">

            <h1 id="titleRelatorioContratante">Relatorio contratante</h1>

            <Link id="linkColecoes" to="/colecoes">Retornar as colecoes</Link>

        <div id="placasContainer">
            {placas.map((item) => (
                <div className="containerPlaca">
                    <p className="nomePlaca">{item.placa}</p>

                    <p className="labelPlaca">Valor hora</p>
                    <input 
                        className="inputValorPlaca"
                        type="text"
                        value={item.valorHora}
                        onChange={(event) => alteraValue(event, item.placa, 'valorHora')}
                    />

                    <p className="labelPlaca">Valor km</p>
                    <input 
                        className="inputValorKm"
                        type="text"
                        value={item.valorKm}
                        onChange={(event) => alteraValue(event, item.placa, 'valorKm')}
                    />
                </div>
            ))}
        </div>
            

            <div>

                <p style={{marginRight: '10px', color: 'white', fontWeight: 'bold'}}>Valor total</p>

                <input 
                    id="inputTotal"
                    type="text"
                    value={total}
                    onChange={(event) => setTotal(event.target.value.replace(',', '.'))}
                />
            </div>
            

            <button 
                id="btnAtualizaPdf"
                onClick={() => {
                    setTotal(valor => Number(valor));
                    setFlag(ant => !ant)
                }}>
                Atualizar Valores
            </button>

            {relatorioContratanteMemo}

        </div>
    )
}