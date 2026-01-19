import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

export default function useRelatorio(){

    const [motorista, setMotorista] = useState('');
    const [dateTimeIni, setDateTimeIni] = useState(new Date);
    const [dateTimeFim, setDateTimeFim] = useState(new Date);
    const [obs, setObs] = useState('');
    const [estacionamento, setEstacionamento] = useState('');
    const [valorEstacionamento, setValorEstacionamento] = useState('');
    const [job, setJob] = useState('');
    const [produtorEmpresa, setProdutorEmpresa] = useState('');
    const [produtorPessoa, setProdutorPessoa] = useState('');
    const [kmIni, setKmIni] = useState('');
    const [kmFim, setKmFim] = useState('');
    const [zonaAzul, setZonaAzul] = useState('');
    const [qtdZonaAzul, setQtdZonaAzul] = useState('');
    const [valorZonaAzul, setValorZonaAzul] = useState('');
    const [inversor, setInversor] = useState('');
    const [pedagio, setPedagio] = useState('');
    const [parceiro, setParceiro] = useState('');
    const [valorPedagioParceiro, setValorPedagioParceiro] = useState('');
    const [placa, setPlaca] = useState('');
    const [atribuicao, setAtribuicao] = useState('');
    const [setor, setSetor] = useState('');
    const [outrosAtribuicao, setOutrosAtribuicao] = useState('');
    const [outrosSetor, setOutrosSetor] = useState('');
    const [alimentacao, setAlimentacao] = useState('');
    const [arrayAlimentacao, setArrayAlimentacao] = useState([]);
    const [verificado, setVerificado] = useState('');
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('');
    const [foraPerimetro, setForaPerimetro] = useState('');

    const relatorioGetters = {
        motorista,
        dateTimeIni,
        dateTimeFim,
        obs,
        estacionamento,
        valorEstacionamento,
        job,
        produtorEmpresa,
        produtorPessoa,
        kmIni,
        kmFim,
        zonaAzul,
        qtdZonaAzul,
        valorZonaAzul,
        inversor,
        pedagio,
        parceiro,
        valorPedagioParceiro,
        placa,
        atribuicao,
        setor,
        outrosAtribuicao,
        outrosSetor,
        alimentacao,
        arrayAlimentacao,
        verificado,
        horasTrabalhadas,
        foraPerimetro
    }

    const relatorioSetters = {
        setMotorista,
        setDateTimeIni,
        setDateTimeFim,
        setObs,
        setEstacionamento,
        setValorEstacionamento,
        setJob,
        setProdutorEmpresa,
        setProdutorPessoa,
        setKmIni,
        setKmFim,
        setZonaAzul,
        setQtdZonaAzul,
        setValorZonaAzul,
        setInversor,
        setPedagio,
        setParceiro,
        setValorPedagioParceiro,
        setPlaca,
        setAtribuicao,
        setSetor,   
        setOutrosAtribuicao,
        setOutrosSetor,
        setAlimentacao,
        setArrayAlimentacao,
        setVerificado,
        setForaPerimetro
    }

    const buscaRelatorio = async (id) => {
        const refDoc = doc(db, "relatorios", id);
        const docSnapshot = await getDoc(refDoc);
        const relatorio = docSnapshot.data();
        const relatorioOrdenado = relatorio.sort((relatorio1, relatorio2) => {
            return relatorio1.dateIni.seconds - relatorio2.dateIni.seconds;
        })

        recuperaValues(relatorio)
    }


    const buscaAtribuicoes = async () => {
        const docRef = doc(db, "atribuicoes", "IgxVe1QYFBXPgbZxxh89");
        const docSnapShot = await getDoc(docRef);
        const atribuicoes = docSnapShot.data();

        return atribuicoes.atribuicoes;
    }

    const buscaSetor = async () => {
        const docRef = doc(db, "setor", "setor");
        const docSnapShot = await getDoc(docRef);
        const setor = docSnapShot.data();

        return setor.setores;
    }

    const dateIni = new Date(dateTimeIni);
    dateIni.setHours(0, 0, 0, 0);

    const dateFim = new Date(dateTimeFim);
    dateFim.setHours(0, 0, 0, 0);

    const arrayAlimentacaoFormatado = arrayAlimentacao.map(item => {
        return {...item, valor: Number(item.valor)}
    })

    const valores = {
        dateIni,
        dateFim,
        motorista,
        dateTimeIni,
        dateTimeFim,
        obs,
        estacionamento,
        valorEstacionamento: Number(valorEstacionamento),
        job,
        produtorEmpresa,
        produtorPessoa,
        kmIni: Number(kmIni),
        kmFim: Number(kmFim),
        zonaAzul,
        qtdZonaAzul: Number(qtdZonaAzul),
        valorZonaAzul: Number(kmFim),
        inversor,
        pedagio,
        parceiro,
        valorPedagioParceiro: Number(kmFim),
        placa,
        atribuicao,
        setor,
        outrosAtribuicao,
        outrosSetor,
        foraPerimetro,
        alimentacao,
        ...(alimentacao === true && {arrayAlimentacao: arrayAlimentacaoFormatado}),
        ...(verificado == "true" ? { verificado: true } : { verificado: false }),
        horasTrabalhadas: (dateTimeFim - dateTimeIni) / 3600000,
        kmRodado: kmFim - kmIni
    }


    async function atualizaDados(id){
        try{
            const refDoc = doc(db, "relatorios", id);
            await setDoc(refDoc, valores);
            return("Atualizado com sucesso!");
        }catch(error){
            return(`Erro ao atualizar o relatorio! ${error}`);
        }
    }

    async function atualizaAtribuicoes(atribuicoes){
        try{    
            const refDoc = doc(db, "atribuicoes", "IgxVe1QYFBXPgbZxxh89");
            await setDoc(refDoc, {atribuicoes});
            alert("Atualizado com sucesso!");
        }catch(error){
            alert(error);
        }
    }

    async function atualizaSetores(setores){
        try{    
            const refDoc = doc(db, "setor", "setor");
            await setDoc(refDoc, {setores});
            alert("Atualizado com sucesso!");
        }catch(error){
            alert(error);
        }
    }


    const recuperaValues = (object) => {
        setMotorista(object.motorista);
        setObs(object.obs);
        setEstacionamento(object.estacionamento);
        setValorEstacionamento(object.valorEstacionamento);
        setJob(object.job);
        setProdutorEmpresa(object.produtorEmpresa);
        setProdutorPessoa(object.produtorPessoa);
        setAlimentacao(object.alimentacao);
        setArrayAlimentacao(object.arrayAlimentacao ?? [{id: 1, refeicao: '', valor: ''}]);
        setVerificado(object.verificado);
        setKmIni(object.kmIni);
        setKmFim(object.kmFim);
        setOutrosAtribuicao(object.outrosAtribuicao);
        setOutrosSetor(object.outrosSetor);
        setParceiro(object.parceiro);
        setPedagio(object.pedagio);
        setValorPedagioParceiro(object.valorPedagioParceiro);
        setPlaca(object.placa);
        setSetor(object.setor);
        setQtdZonaAzul(object.qtdZonaAzul);
        setValorZonaAzul(object.valorZonaAzul);
        setZonaAzul(object.zonaAzul);
        setInversor(object.inversor);
        setDateTimeIni(object.dateTimeIni.toDate());
        setDateTimeFim(object.dateTimeFim.toDate());
        setAtribuicao(object.atribuicao);
        setHorasTrabalhadas(object.horasTrabalhadas)
        setForaPerimetro(object.foraPerimetro)
    }

    return{
        buscaRelatorio,
        buscaAtribuicoes,
        buscaSetor,
        atualizaDados,
        relatorioGetters,
        relatorioSetters,
        atualizaAtribuicoes,
        atualizaSetores
    }

}