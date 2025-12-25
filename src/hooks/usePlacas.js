import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function usePlacas(){

    const buscaPlacas = async () => {
        const docRef = doc(db, "placas e valores", "WKoQg1pcB401ZWmAk2Pz");
        const docSnapShot = await getDoc(docRef);
        const placas = docSnapShot.data();

        return placas.placas;
    }

    const atualizaPlacas = async (array) => {

        const placas = {
            placas: array.map((item) => {
                return {...item, 
                    valor_hora_motorista: Number(item.valor_hora_motorista),
                    valor_hora_viagem_motorista: Number(item.valor_hora_viagem_motorista),
                }
            })
        }

        try{
            const refDoc = doc(db, "placas e valores", "WKoQg1pcB401ZWmAk2Pz");
            await setDoc(refDoc, placas);
            alert("Atualizado com sucesso!");
        }catch(error){
            alert(error);
        }
    }

    return{
        buscaPlacas,
        atualizaPlacas
    }

}