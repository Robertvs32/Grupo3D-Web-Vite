import { db } from "../firebaseConfig";
import { addDoc, collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";

export default function useColecoes(){

    const refCollection = collection(db, "colecoes");
    
    const addColecao = async (arrayIds, nomeColecao) => {
        try{
            const dados = {nome: nomeColecao, relatorios: arrayIds};
            await addDoc(refCollection, dados);
            return('Colecao adicionada com sucesso!');
        }catch(error){
            return(`Erro ao dicionar colecao ${error}`);
        }
    }

    const buscaColecoes = async (filtro) => {
        try{
            const q = filtro != '' 
                ? query(collection(db, 'colecoes'), where('nome', '>=', filtro) ,where('nome', '<', proximoPrefixo(filtro)))
                : query(collection(db, 'colecoes'));

            const colecoes = await getDocs(q);

            if(colecoes.empty){
                alert("Nenhuma colecao encontrada!");
                return [];
            }

            const arrayColecoes = colecoes.docs.map((doc) => (
                {
                    id: doc.id,
                    nome: doc.data().nome,
                    relatorios: doc.data().relatorios
                }
            ));

            return(arrayColecoes);
            
        }catch(error){
            alert(`Erro ao buscar colecoes: ${error}`);
        }
    }

    const excluirColecao = async (id) => {
        try{
            const refDoc = doc(refCollection, id);
            await deleteDoc(refDoc);
            return("Colecao excluida!");
        }catch(error){
            return(`Erro ao excluir colecao ${error}`);
        }
    }

    const proximoPrefixo = (texto) => {
        const base = texto.slice(0, -1);
        const ultimoCaractere = texto.slice(-1);
        const unicodeUltimo = ultimoCaractere.charCodeAt(0) + 1;
        const stringUltimo = String.fromCharCode(unicodeUltimo);

        return(base + stringUltimo);
    }

    

    return{
        addColecao,
        buscaColecoes,
        excluirColecao
    }
}