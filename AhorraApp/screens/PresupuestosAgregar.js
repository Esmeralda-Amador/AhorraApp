import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    SafeAreaView, ScrollView, StatusBar, Platform, Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { presupuestoController } from '../controllers/PresupuestoController';

export default function PresupuestosAgregar ({ navigation }) {

const [categoria, setCategoria] = useState('');
const [montoTotal, setMontoTotal] = useState('');

const [dia, setDia] = useState('');
const [mes, setMes] = useState('');
const [ano, setAno] = useState('');

const handleGuardarPresupuesto = async () => {
    const catLimpia = categoria.trim();
    const montoLimpio = montoTotal.trim();
    const diaLimpio = dia.trim();
    const mesLimpio = mes.trim();
    const anoLimpio = ano.trim();

    if (!catLimpia || !montoLimpio || !diaLimpio || !mesLimpio || !anoLimpio) {
        Alert.alert('Campos Incompletos', 'Rellena Categoría, Monto y Fecha.');
        return;
    }
    
    try {
        await presupuestoController.agregar(
            catLimpia,
            montoLimpio,
            diaLimpio,
            mesLimpio,
            anoLimpio
        );
        
        Alert.alert("¡Guardado!", "Presupuesto registrado con éxito.", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);

    } catch (error) {
        Alert.alert('Error', error.message);
    }
 };

return (
<SafeAreaView style={styles.container}>
<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

 <View style={styles.header}>
 <TouchableOpacity onPress={() => navigation.goBack()}>
 <Feather name="arrow-left" size={24} color="#33604E" />
 </TouchableOpacity>
 <Text style={styles.headerTitle}>Nuevo Presupuesto</Text>
 <View style={{ width: 24 }} />
 </View>

<ScrollView style={styles.scrollView}>
 <View style={styles.formContainer}>

 <Text style={styles.label}>Categoría</Text>
<View style={styles.inputCard}>
 <Feather name="tag" size={20} color="#666" style={styles.inputIcon} />
<TextInput
 style={styles.input}
 placeholder="Ej: Despensa, Servicios, Salidas"
 placeholderTextColor="#999"
 value={categoria}
 onChangeText={setCategoria}
 />
 </View>

 <Text style={styles.label}>Monto Límite Mensual ($)</Text>
 <View style={styles.inputCard}>
 <Feather name="shield" size={20} color="#666" style={styles.inputIcon} />
 <TextInput
 style={styles.input}
placeholder="Ej: 5000"
 placeholderTextColor="#999"
 keyboardType="numeric"
 value={montoTotal}
onChangeText={setMontoTotal}
 />
</View>

 
          <Text style={styles.label}>Fecha Inicio</Text>
<View style={styles.inputCard}>
 <View style={styles.fila}>
 <TextInput style={styles.inputFecha} placeholder="Día" keyboardType="numeric" value={dia} onChangeText={setDia}/>
 <TextInput style={styles.inputFecha} placeholder="Mes" value={mes} onChangeText={setMes}/>
 <TextInput style={styles.inputFecha} placeholder="Año" keyboardType="numeric" value={ano} onChangeText={setAno}/>
</View>
 </View>
<TouchableOpacity style={styles.saveButton} onPress={handleGuardarPresupuesto}>
 <Feather name="plus-circle" size={24} color="#FFFFFF" />
<Text style={styles.saveButtonText}>Guardar Presupuesto</Text>
 </TouchableOpacity>
</View>
</ScrollView>
 </SafeAreaView>
 );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#FFFFFF" },
 scrollView: { flex: 1, backgroundColor: "#E7E7E7" },

header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: "#FFFFFF", paddingBottom: 15, paddingTop: 15 + STATUS_BAR_HEIGHT, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },

formContainer: { padding: 20, gap: 16, paddingBottom: 40 },
label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: -8 },
inputCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 18, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
inputIcon: { marginRight: 12 },
input: { flex: 1, fontSize: 15, color: "#333" },
saveButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12, gap: 10, marginTop: 20 }, saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  
    fila:{ 
      flex:1,
      flexDirection:'row', 
      justifyContent:'space-between',
      gap: 10,
    },
    inputFecha:{ 
      flex:1, 
      backgroundColor:'#F5F5F5', 
      padding:10, 
      borderRadius:8, 
      textAlign: 'center',
      fontSize: 15,
      color: '#333',
    },
});