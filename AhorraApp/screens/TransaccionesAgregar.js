import React,{useState}from'react';
import{View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,SafeAreaView,ScrollView,StatusBar,Platform}from'react-native';
import{Feather}from'@expo/vector-icons';
import{transaccionController}from'../controllers/TransaccionController';

export default function TransaccionesAgregar({navigation,route}){
const tipoInicial=route.params?.tipoInicial||'Gasto';
const[categoria,setCategoria]=useState('');
const[monto,setMonto]=useState('');
const[tipo,setTipo]=useState(tipoInicial);
const[dia,setDia]=useState('');
const[mes,setMes]=useState('');
const[ano,setAno]=useState('');

const mesesMap={
'enero':1,'feb':2,'marzo':3,'abr':4,'mayo':5,'junio':6,
'julio':7,'agosto':8,'septiembre':9,'octubre':10,'noviembre':11,'diciembre':12,
'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':11,'12':12,
};

const guardarMovimiento=async()=>{
if(!categoria.trim()||!monto.trim()||!dia.trim()||!mes.trim()||!ano.trim()){
Alert.alert('Campos Incompletos','Por favor, rellena todos los campos.');
return;
}
const montoNum=parseFloat(monto.trim());
if(isNaN(montoNum)||montoNum<=0){
Alert.alert('Monto Inválido','El monto debe ser un número positivo.');
return;
}
const currentYear=new Date().getFullYear();
const diaNum=parseInt(dia.trim(),10);
const anoNum=parseInt(ano.trim(),10);
const mesStrLower=mes.trim().toLowerCase();
const mesNum=mesesMap[mesStrLower]||parseInt(mesStrLower,10);

if(isNaN(mesNum)||mesNum<1||mesNum>12){
Alert.alert('Error de Fecha','El mes debe ser un número entre 1 y 12 o un nombre válido.');
return;
}

const fechaAValidar=new Date(anoNum,mesNum-1,diaNum);
if(fechaAValidar.getMonth()!==mesNum-1||fechaAValidar.getDate()!==diaNum){
Alert.alert('Error de Fecha',`El día ${diaNum} no es válido para el mes seleccionado.`);
return;
}
const mesTexto=new Date(anoNum,mesNum-1,1).toLocaleDateString('es-ES',{month:'long'});
const mesFinal=mesTexto.charAt(0).toUpperCase()+mesTexto.slice(1);

try{
await transaccionController.agregar(
tipo,
categoria,
monto,
'',
dia.padStart(2,'0'),
mesFinal,
ano
);
Alert.alert("¡Guardado!","Movimiento registrado.",[
{text:"OK",onPress:()=>navigation.goBack()}
]);
}catch(error){
Alert.alert("Error",error.message);
}
};

return(
<SafeAreaView style={styles.container}>
<StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
<View style={styles.header}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<Feather name="arrow-left"size={24}color="#33604E"/>
</TouchableOpacity>
<Text style={styles.headerTitle}>Nueva Transacción</Text>
<View style={{width:24}}/>
</View>

<ScrollView style={styles.scrollView}>
<View style={styles.formContainer}>

<Text style={styles.label}>Tipo de Movimiento</Text>
<View style={styles.tipoCont}>
<TouchableOpacity style={[styles.tipoBtn,tipo==='Gasto'&&styles.tipoBtnActivo]}onPress={()=>setTipo('Gasto')}>
<Text style={[styles.tipoTxt,tipo==='Gasto'&&styles.tipoTxtActivo]}>Gasto</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.tipoBtn,tipo==='Ingreso'&&styles.tipoBtnActivo]}onPress={()=>setTipo('Ingreso')}>
<Text style={[styles.tipoTxt,tipo==='Ingreso'&&styles.tipoTxtActivo]}>Ingreso</Text>
</TouchableOpacity>
</View>

<Text style={styles.label}>Categoría</Text>
<View style={styles.inputCard}>
<Feather name="tag"size={20}color="#666"style={styles.inputIcon}/>
<TextInput style={styles.input}placeholder="Ej: Salario, Comida..."value={categoria}onChangeText={setCategoria}/>
</View>

<Text style={styles.label}>Monto</Text>
<View style={styles.inputCard}>
<Feather name="dollar-sign"size={20}color="#666"style={styles.inputIcon}/>
<TextInput style={styles.input}placeholder="Ej: 500"keyboardType="numeric"value={monto}onChangeText={setMonto}/>
</View>

<Text style={styles.label}>Fecha</Text>
<View style={styles.inputCard}>
<View style={styles.fila}>
<TextInput style={styles.inputFecha}placeholder="DD"keyboardType="numeric"maxLength={2}value={dia}onChangeText={setDia}/>
<TextInput style={styles.inputFecha}placeholder="MM"maxLength={10}value={mes}onChangeText={setMes}/>
<TextInput style={styles.inputFecha}placeholder="AAAA"keyboardType="numeric"maxLength={4}value={ano}onChangeText={setAno}/>
</View>
</View>

<TouchableOpacity style={styles.saveButton}onPress={guardarMovimiento}>
<Feather name="plus-circle"size={24}color="#FFFFFF"/>
<Text style={styles.saveButtonText}>Guardar</Text>
</TouchableOpacity>

</View>
</ScrollView>
</SafeAreaView>
);
}

const styles=StyleSheet.create({
container:{flex:1,backgroundColor:"#FFFFFF"},
scrollView:{flex:1,backgroundColor:"#E7E7E7"},
header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:20,backgroundColor:"#FFFFFF",paddingBottom:15,paddingTop:15+(Platform.OS==="android"?StatusBar.currentHeight:0),borderBottomWidth:1,borderBottomColor:"#F0F0F0"},
headerTitle:{fontSize:20,fontWeight:"600",color:"#333"},
formContainer:{padding:20,gap:16,paddingBottom:40},
label:{fontSize:15,fontWeight:'600',color:'#333',marginBottom:-8},
inputCard:{flexDirection:"row",alignItems:"center",backgroundColor:"#FFFFFF",borderRadius:12,paddingHorizontal:16,paddingVertical:18,elevation:2},
inputIcon:{marginRight:12},
input:{flex:1,fontSize:15,color:"#333"},
tipoCont:{flexDirection:'row',marginBottom:10},
tipoBtn:{flex:1,padding:14,marginHorizontal:5,borderRadius:12,backgroundColor:'#FFFFFF',alignItems:'center',elevation:2},
tipoBtnActivo:{backgroundColor:'#33604e'},
tipoTxt:{color:'#333',fontWeight:'bold',fontSize:15},
tipoTxtActivo:{color:'#FFFFFF'},
fila:{flex:1,flexDirection:'row',gap:10},
inputFecha:{flex:1,backgroundColor:'#F5F5F5',padding:10,borderRadius:8,textAlign:'center',fontSize:15,color:'#333'},
saveButton:{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#33604E",paddingVertical:16,borderRadius:12,gap:10,marginTop:20},
saveButtonText:{color:"#FFFFFF",fontSize:16,fontWeight:"600"}
});
