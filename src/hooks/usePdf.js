import { getDocs, where, query, documentId, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function usePdf(){

    const buscaRelatoriosPdf = async (arrayIds) => {
        const refCollection = collection(db, "relatorios");
        const q = query(refCollection, where(documentId(), "in", arrayIds))
        const querySnapShot = await getDocs(q);

        if(querySnapShot.empty){
            alert("Relatorios nao encontrados!");
            return;
        }

        const arrayRelatorios = querySnapShot.docs.map((item) => (
            {...item.data()}
        ))

        return arrayRelatorios;

    }

    return{
        buscaRelatoriosPdf
    }
}