import { useParams } from 'react-router'
import './relatorio.css'
import { useEffect, useState } from 'react';
import useRelatorio from '../../hooks/useRelatorio';
import InputRelatorio from './Components/InputRelatorio/InputRelatorio';
import Checkbox from './Components/Checkbox/Checkbox';
import Atribuicao from './Components/Select/Atribuicao/Atribuicao';
import Placa from './Components/Select/Placa/Placa';
import Setor from './Components/Select/Setor/Setor';
import Alimentacao from './Components/Alimentacao/Alimentacao';
import Obs from './Components/Obs/Obs';
import Verificado from './Components/Select/Verificado/Verificado';
import Pago from './Components/Select/Pago/Pago';
import DataInicio from './Components/DateTime/Date/DataInicio';
import DataFim from './Components/DateTime/Date/DataFim';
import HoraIni from './Components/DateTime/Time/HoraIni';
import HoraFim from './Components/DateTime/Time/HoraFim';
import Confirm from '../../Components/Confirm/Confirm';
import Alert from '../../Components/Alert/Alert';


export default function Relatorio(){

    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState();
    const [mensagemAtualiza, setMensagemAtualiza] = useState();

    const { id } = useParams();
    const { buscaRelatorio, relatorioGetters, relatorioSetters, atualizaDados } = useRelatorio(); //

    useEffect(() => {
        buscaRelatorio(id);
    }, []);


    return(
        <div id="relatorioContainer">
            <h1 id="titleRelatorio">Editar relatório</h1>

            <div id="formularioContainer">

                <DataInicio
                    name="Data inicial"
                    state={relatorioGetters.dateTimeIni}
                    setter={relatorioSetters.setDateTimeIni}
                    dateTimeFim={relatorioGetters.dateTimeFim}
                />

                <HoraIni
                    name="Hora Inicial"
                    state={relatorioGetters.dateTimeIni} 
                    setter={relatorioSetters.setDateTimeIni}
                    dateTimeFim={relatorioGetters.dateTimeFim}
                />

                <DataFim
                    name="Data inicial"
                    state={relatorioGetters.dateTimeFim}
                    setter={relatorioSetters.setDateTimeFim}
                    dateTimeIni={relatorioGetters.dateTimeIni}
                />

                <HoraFim
                    name="Hora Inicial"
                    state={relatorioGetters.dateTimeFim} 
                    setter={relatorioSetters.setDateTimeFim}
                    dateTimeIni={relatorioGetters.dateTimeIni}
                />

                <InputRelatorio
                    name="Motorista"
                    value={relatorioGetters.motorista}
                    setter={relatorioSetters.setMotorista}
                />

                <InputRelatorio
                    name="Job"
                    value={relatorioGetters.job}
                    setter={relatorioSetters.setJob}
                />

                <InputRelatorio
                    name="Km Inicial"
                    value={relatorioGetters.kmIni}
                    setter={relatorioSetters.setKmIni}
                />

                <InputRelatorio
                    name="Km Final"
                    value={relatorioGetters.kmFim}
                    setter={relatorioSetters.setKmFim}
                />

                <InputRelatorio
                    name="Contratante"
                    value={relatorioGetters.produtorEmpresa}
                    setter={relatorioSetters.setProdutorEmpresa}
                />

                <InputRelatorio
                    name="Produtor(a)"
                    value={relatorioGetters.produtorPessoa}
                    setter={relatorioSetters.setProdutorPessoa}
                />

                <Checkbox
                    name="Inversor"
                    state={relatorioGetters.inversor}
                    setter={relatorioSetters.setInversor}
                />

                <Checkbox
                    name="Viagem"
                    state={relatorioGetters.foraPerimetro}
                    setter={relatorioSetters.setForaPerimetro}
                />

                <Checkbox
                    name="Parceiro"
                    state={relatorioGetters.parceiro}
                    setter={relatorioSetters.setParceiro}
                />

                <Checkbox
                    name="Pedágio"
                    state={relatorioGetters.pedagio}
                    setter={relatorioSetters.setPedagio}
                />

                {(relatorioGetters.parceiro && relatorioGetters.pedagio) && (
                    <InputRelatorio
                        name="Valor pedágio parceiro"
                        value={relatorioGetters.valorPedagioParceiro}
                        setter={relatorioSetters.setValorPedagioParceiro}
                    />
                )}


                <Checkbox
                    name="ZonaAzul"
                    state={relatorioGetters.zonaAzul}
                    setter={relatorioSetters.setZonaAzul}
                />

                {relatorioGetters.zonaAzul && (
                    <>
                        <InputRelatorio
                            name="Qtd Zona azul"
                            value={relatorioGetters.qtdZonaAzul}
                            setter={relatorioSetters.setQtdZonaAzul}
                        />

                        <InputRelatorio
                            name="Valor Zona Azul"
                            value={relatorioGetters.valorZonaAzul}
                            setter={relatorioSetters.setValorZonaAzul}
                        />
                    </>
                )}

                <Checkbox
                    name="Estacionamento"
                    state={relatorioGetters.estacionamento}
                    setter={relatorioSetters.setEstacionamento}
                />

                {relatorioGetters.estacionamento && (
                    <InputRelatorio
                        name="Valor Estacionamento"
                        value={relatorioGetters.valorEstacionamento}
                        setter={relatorioSetters.setValorEstacionamento}
                    />
                )}

                <Placa
                    state={relatorioGetters.placa}
                    setter={relatorioSetters.setPlaca}
                />

                <Atribuicao
                    state={relatorioGetters.atribuicao}
                    setter={relatorioSetters.setAtribuicao}
                />

                {(relatorioGetters.atribuicao == 'Outros') && (
                    <InputRelatorio
                        name="Atribuicao - Outros"
                        value={relatorioGetters.outrosAtribuicao}
                        setter={relatorioSetters.setOutrosAtribuicao}
                    />
                )}

                <Setor
                    state={relatorioGetters.setor}
                    setter={relatorioSetters.setSetor}
                />

                {(relatorioGetters.setor == 'Outros') && (
                    <InputRelatorio
                        name="Setor - Outros"
                        value={relatorioGetters.outrosSetor}
                        setter={relatorioSetters.setOutrosSetor}
                    />
                )}

                <Checkbox
                    name="Alimentação"
                    state={relatorioGetters.alimentacao}
                    setter={relatorioSetters.setAlimentacao}
                />

                <Verificado
                    state={relatorioGetters.verificado}
                    setter={relatorioSetters.setVerificado}
                />

                <Pago
                    state={relatorioGetters.pagamento}
                    setter={relatorioSetters.setPagamento}
                />

            
            </div>

            {relatorioGetters.alimentacao && (
                <Alimentacao
                    array={relatorioGetters.arrayAlimentacao}
                    setter={relatorioSetters.setArrayAlimentacao}    
                />
            )}

            <Obs
                value={relatorioGetters.obs}
                setter={relatorioSetters.setObs}
            />

            <button
            id="btnEnviar"
                onClick={() => {setShowConfirm(true)}  
            }
            >
                Atualizar dados
            </button>

            {showConfirm && (
                <Confirm
                    mensagem="Deseja atualizar?"
                    actionConfirm={ async () => {
                            const response = await atualizaDados(id);
                            setShowConfirm(false);

                            setMensagemAtualiza(response);
                            setShowAlert(true);               
                        }   
                    }
                    actionCancel={() => setShowConfirm(false)}
                />
            )}

            {showAlert && (
                <Alert
                    mensagem={mensagemAtualiza}
                    setter={setShowAlert}
                />
            )}
 
        </div>
    )
}