import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, where, query, getDocs, orderBy, doc, deleteDoc } from "firebase/firestore";

export default function useRelatorios(){

    const [relatorios, setRelatorios] = useState([]);

    const [filtros, setFiltros] = useState({
        dataInicio: '',
        dataFim: '',
        motorista: '',
        job: '',
        atribuicao: '',
        setor: '',
        contratante: '',
        produtor: '',
        placa: '',
        verificado: ''
    });


    const buscaRelatorios = async () => {
        try{
            const arrayRestricoes = [];

            if(filtros.dataInicio){
                arrayRestricoes.push(where('dateIni', '>=', filtros.dataInicio),);
            }

            if(filtros.dataFim){
                arrayRestricoes.push(where('dateFim', '<=', filtros.dataFim),);
            }

            if(filtros.motorista != ''){
                arrayRestricoes.push(where('motorista', '>=', filtros.motorista), where('motorista', '<', proximoPrefixo(filtros.motorista)));
            }

            if(filtros.job != ''){
                arrayRestricoes.push(where('job', '>=', filtros.job), where('job', '<', proximoPrefixo(filtros.job)));
            }

            if(filtros.atribuicao != ''){
                arrayRestricoes.push(where('atribuicao', '==', filtros.atribuicao),);
            }

            if(filtros.setor != ''){
                arrayRestricoes.push(where('setor', '>=', filtros.setor), where('setor', '<', proximoPrefixo(filtros.setor)));
            }

            if(filtros.contratante != ''){
                arrayRestricoes.push(where('produtorEmpresa', '==', filtros.contratante),);
            }

            if(filtros.produtor != ''){
                arrayRestricoes.push(where('produtorPessoa', '==', filtros.produtor),);
            }

            if(filtros.placa != ''){
                arrayRestricoes.push(where('placa', '==', filtros.placa),);
            }

            if(filtros.verificado != ''){   
                const bolVerificado =  filtros.verificado == "true" ? true : false;
                arrayRestricoes.push(where('verificado', '==', bolVerificado,));
            }

            arrayRestricoes.push(orderBy('dateTimeIni', 'desc'))

            const colecao = collection(db, 'relatorios')
            const q = query(colecao, ...arrayRestricoes);
            const querySnapShot = await getDocs(q);
            const listaRelatorios = querySnapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRelatorios(listaRelatorios);

        } catch(error){
            console.log(error);
        }
    }

    const proximoPrefixo = (texto) => {
        const base = texto.slice(0, -1);
        const ultimoCaractere = texto.slice(-1);
        const unicodeUltimo = ultimoCaractere.charCodeAt(0) + 1;
        const stringUltimo = String.fromCharCode(unicodeUltimo);

        return(base + stringUltimo);
    }


    const excluiDocumento = async (colecao, id_documento) => {
        try{
            const docRef = doc(db, colecao, id_documento);
            await deleteDoc(docRef);
        } catch(error) {
            alert(`Erro ao excluir relatório! - ${error}`);
        }
    }

    const limpaFiltros = () => {
        setFiltros({
            dataInicio: '',
            motorista: '',
            job: '',
            atribuicao: '',
            setor: '',
            contratante: '',
            produtor: '',
            placa: '',
            verificado: ''
        });
    }

    return{
        relatorios,
        buscaRelatorios,
        excluiDocumento,
        filtros,
        setFiltros,
        limpaFiltros,
    }

}