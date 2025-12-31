import './relatorioMotorista.css';
import { useEffect, useState } from 'react';
import RelatorioMotoristaPDF from './relatorioMotoristaPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router';
import usePdf from '../../../hooks/usePdf';
import ReturnBtn from '../../../Components/ReturnBtn/ReturnBtn';
import usePlacas from '../../../hooks/usePlacas';

export default function RelatorioMotorista(){

    const location = useLocation();
    const [arrayRelatorios, setArrayRelatorios] = useState([]);
    const [placas, setPlacas] = useState([]);
    const [total, setTotal] = useState(0);
    const { buscaRelatoriosPdf } = usePdf();
    const { buscaPlacas } = usePlacas();

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
                const placas = await buscaPlacas();

                setArrayRelatorios(arrayTemp);
                filtraPlacas(arrayTemp, placas)
            }
            busca();
        }
    }, [])

    useEffect(() => {
        atualizaValorTotal(arrayRelatorios)
    }, [placas])


    function filtraPlacas(relatorios, placas){
        const placasUtilizadas = relatorios.map((item) => {
            return item.placa;
        })
        const placaSemDuplicidade = new Set(placasUtilizadas);
        const arrayPlacaSemDuplicidade = [...placaSemDuplicidade]

        const arrayDefinitivo = placas.filter((item) => 
            arrayPlacaSemDuplicidade.includes(item.placa)
        )

        setPlacas(arrayDefinitivo);  
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
            let valorHora = 0;
            
            if(item.foraPerimetro){
                valorHora = Number(item.horasTrabalhadas) * Number(buscaValorPlaca(item.placa, 'valor_hora_viagem_motorista'));
            } else {
                valorHora = Number(item.horasTrabalhadas) * Number(buscaValorPlaca(item.placa, 'valor_hora_motorista'));
            }
            
            let calculoViagem = 0;
            
            //atribui o valor das horas trabalhadas
            calculoViagem += Number(valorHora.toFixed(2));

            return contador + calculoViagem;
            
        }, 0)
        setTotal(valorTotal)
    }


    


    //COMPONENTE PAGINA RELATORIO MOTORISTA
    return(
        <div id="containerRelatorioMotorista">

            <h1 id="titleRelatorioMotorista">Relatorio motorista</h1>

            <ReturnBtn
                path="/"
            />

            <PDFViewer id="pdfViewer">
                <RelatorioMotoristaPDF
                    arrayRelatorios={arrayRelatorios}
                    placas={placas}
                    valorTotal={total}
                />  
            </PDFViewer>

        </div>
    )
}