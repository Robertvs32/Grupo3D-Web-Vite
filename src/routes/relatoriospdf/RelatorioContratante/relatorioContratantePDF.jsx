import { Document, Page, Text, Image, StyleSheet, Font, View} from '@react-pdf/renderer'
import logo from '../../../assets/img/logoPreta.png';
import Sora from '../../../assets/fonts/Sora-Regular.ttf'
import SoraBold from '../../../assets/fonts/Sora-Bold.ttf'

export default function RelatorioContratantePDF({arrayRelatorios, placas, valorTotal}){

Font.register({
    family: 'Sora',
    fonts: [
        { src: Sora },
        { src: SoraBold, fontWeight: 'bold' }
    ]
})

function horasFormatadas(horas){
    const intHoras = parseInt(horas);
    const minutos = (horas - intHoras) * 60;
    
    if(horas == 0){
        return 0;
    }
    if(intHoras == 0){
        return(`${minutos} minutos`);
    }
    else if(minutos == 0){
        return(`${intHoras} horas`);
    }
    else{
        return(`${intHoras} hora(s) e ${minutos.toFixed(0)} minuto(s)`);
    }
}

    return(
            <Document>
                <Page size="A4" orientation="landscape" style={styles.page}>
                    <Image
                        src={logo}
                        style={styles.logoImg}
                    />

                    <Text style={styles.title}>Relatorio contratante</Text>

                    <View style={styles.containerPlacas}>
                    {placas.map((item) => (
                        <View style={styles.cardPlacas}>
                            <Text style={styles.textPlaca}>{item.placa}</Text>
                            <Text style={styles.textValor}>{`Valor hora R$: ${item.valorHora}`}</Text>
                            <Text style={styles.textValor}>{`Valor Km R$: ${item.valorKm}`}</Text>
                        </View>
                    ))}
                    </View>

                    <View style={styles.containerInfos}>
                        {arrayRelatorios.map((item, index) => (
                            <View style={styles.containerCard}>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Motorista</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.motorista}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Job</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.job}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Placa</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.placa}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Inicio</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.dateTimeIni.toDate().toLocaleString()}</Text>
                                    </View>    
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Termino</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.dateTimeFim.toDate().toLocaleString()}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Setor</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.setor}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Atribuicao</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.atribuicao}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Horas totais</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{horasFormatadas(item.horasTrabalhadas)}</Text>
                                    </View>          
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Km rodado</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.kmRodado}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoCard}>
                                    {index == 0 && (<Text style={styles.titleInfo}>Viagem</Text>)}
                                    <View style={styles.itemInfo}>
                                        <Text>{item.foraPerimetro ? 'Sim' : 'Nao'}</Text>
                                    </View>
                                </View>
                                
                            </View>
                        ))}

                    </View>

                    <Text style={styles.valorTotal}>{`Valor total: ${valorTotal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`}</Text>
                    
                </Page>
            </Document>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: '20',
        position: 'relative',
        fontFamily: 'Sora',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '26',
        marginBottom: '30px',
        marginTop: '15px',
        borderLeft: '5px solid rgba(252, 107, 16, 1)',
        paddingLeft: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        width: '310px',
        color: 'white',
        paddingVertical: '5px'
    },
    logoImg: {
        width: '90',
        position: 'absolute',
        right: '20',
        top: '20'
    },
    containerInfos: {
        marginTop: '15px'
    },
    containerCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(196, 194, 194, 1)'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    titleInfo: {
        fontSize: 8,    
        backgroundColor: 'rgba(46, 45, 45, 1)',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        border: '1px solid white',
        padding: '5px'
    },
    itemInfo: {
        fontSize: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '3px',
        minHeight: '45px',
        width: '100%',
        border: '1px solid white'
    },
    textPlaca: {
        fontSize: '9px',
        fontWeigth: 'bold',
        backgroundColor: 'rgba(46, 45, 45, 1)',
        color: 'white',
        padding: '3px',
        marginBottom: '2px'
    },
    textValor: {
        fontSize: '8px',
        padding: '3px',
    },
    containerPlacas: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardPlacas: {
        backgroundColor: 'rgba(196, 194, 194, 1)',
        width: '120px',
        marginRight: '5px'
    },
    valorTotal: {
        position: 'absolute',
        bottom: '25px',
        right: '25px'
    }
    
})