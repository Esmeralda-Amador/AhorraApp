import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TransaccionesEditar ({ navigation, route }) {

  // Si quieres recibir la transacción que viene del Stack
  const transaction = route.params?.transaction;

  const [categoria, setCategoria] = useState(transaction?.categoria || 'Mascotas');
  const [monto, setMonto] = useState(transaction?.monto?.toString() || '-500');
  const [tipo, setTipo] = useState(transaction?.tipo || 'Gasto');  
  const [dia, setDia] = useState(transaction?.fecha?.split(' / ')[0] || '27');
  const [mes, setMes] = useState(transaction?.fecha?.split(' / ')[1] || 'Sept');
  const [ano, setAno] = useState(transaction?.fecha?.split(' / ')[2] || '2025');

  const handleGuardarCambios = () => {
    const catLimpia = categoria.trim();
    const montoLimpio = monto.trim();
    const diaLimpio = dia.trim();
    const mesLimpio = mes.trim();
    const anoLimpio = ano.trim();

    if (!catLimpia || !montoLimpio || !diaLimpio || !mesLimpio || !anoLimpio) {
      Alert.alert('Campos Incompletos', 'Por favor, rellena todos los campos.');
      return;
    }

    const montoNum = parseFloat(montoLimpio);
    if (isNaN(montoNum) || montoNum === 0) {
      Alert.alert('Monto Inválido', 'El monto debe ser un número distinto de cero.');
      return;
    }

    const diaNum = parseInt(diaLimpio, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
      Alert.alert('Día Inválido', 'Por favor, ingresa un día válido (1-31).');
      return;
    }

    const anoNum = parseInt(anoLimpio, 10);
    if (isNaN(anoNum) || anoNum < 2020 || anoNum > 2030) {
      Alert.alert('Año Inválido', 'Por favor, ingresa un año válido (ej: 2024, 2025).');
      return;
    }

    Alert.alert(
      "¡Actualizado!",
      `La transacción ha sido actualizada con éxito.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Transacción</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>

          <Text style={styles.label}>Tipo de Movimiento</Text>
          <View style={styles.tipoCont}>
            <TouchableOpacity 
              style={[styles.tipoBtn, tipo === 'Gasto' && styles.tipoBtnActivo]}
              onPress={() => setTipo('Gasto')}
            >
              <Text style={[styles.tipoTxt, tipo === 'Gasto' && styles.tipoTxtActivo]}>Gasto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tipoBtn, tipo === 'Ingreso' && styles.tipoBtnActivo]}
              onPress={() => setTipo('Ingreso')}
            >
              <Text style={[styles.tipoTxt, tipo === 'Ingreso' && styles.tipoTxtActivo]}>Ingreso</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.inputCard}>
            <Feather name="tag" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ej: Wifi, Mascotas, etc"
              placeholderTextColor="#999"
              value={categoria}
              onChangeText={setCategoria}
            />
          </View>

          <Text style={styles.label}>Monto</Text>
          <View style={styles.inputCard}>
            <Feather name="dollar-sign" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ej: -300 o 500"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
            />
          </View>

          <Text style={styles.label}>Fecha</Text>
          <View style={styles.inputCard}>
            <View style={styles.fila}>
              <TextInput style={styles.inputFecha} placeholder="Día" keyboardType="numeric" value={dia} onChangeText={setDia}/>
              <TextInput style={styles.inputFecha} placeholder="Mes" value={mes} onChangeText={setMes}/>
              <TextInput style={styles.inputFecha} placeholder="Año" keyboardType="numeric" value={ano} onChangeText={setAno}/>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios}>
            <Feather name="check-circle" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: "#FFFFFF", paddingBottom: 15, paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0), borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  formContainer: { padding: 20, gap: 16, paddingBottom: 40 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: -8 },
  inputCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 18, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: "#333" },
  tipoCont:{ flexDirection:'row', marginBottom: 10 },
  tipoBtn:{ flex:1, padding:14, marginHorizontal:5, borderRadius:12, backgroundColor:'#FFFFFF', alignItems:'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tipoBtnActivo:{ backgroundColor:'#33604e' },
  tipoTxt:{ color:'#333', fontWeight:'bold', fontSize: 15 },
  tipoTxtActivo: { color: '#FFFFFF' },
  fila:{ flex:1, flexDirection:'row', justifyContent:'space-between', gap: 10 },
  inputFecha:{ flex:1, backgroundColor:'#F5F5F5', padding:10, borderRadius:8, textAlign: 'center', fontSize: 15, color: '#333' },
  saveButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12, gap: 10, marginTop: 20 },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
