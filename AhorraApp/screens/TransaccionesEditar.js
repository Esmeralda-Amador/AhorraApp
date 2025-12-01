import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { transaccionController } from '../controllers/TransaccionController';

export default function TransaccionesEditar ({ navigation, route }) {

  const transaction = route.params?.transaction;

  const [categoria, setCategoria] = useState(transaction?.categoria || '');
  const [monto, setMonto] = useState(transaction ? Math.abs(transaction.monto).toString() : '');
  const [tipo, setTipo] = useState(transaction?.tipo || 'Gasto');  
  
  // Parsear fecha
  const parts = transaction?.fecha ? transaction.fecha.split(' / ') : ['','',''];
  const [dia, setDia] = useState(parts[0]);
  const [mes, setMes] = useState(parts[1]);
  const [ano, setAno] = useState(parts[2]);

  const handleGuardarCambios = async () => {
    if (!categoria || !monto || !dia || !mes || !ano) {
      Alert.alert('Campos Incompletos', 'Rellena todo.');
      return;
    }

    try {
        await transaccionController.actualizar(
            transaction.id,
            tipo,
            categoria,
            monto,
            '',
            dia,
            mes,
            ano
        );
        Alert.alert("¡Actualizado!", "Cambios guardados.", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (error) {
        Alert.alert("Error", error.message);
    }
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
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.tipoCont}>
            <TouchableOpacity style={[styles.tipoBtn, tipo === 'Gasto' && styles.tipoBtnActivo]} onPress={() => setTipo('Gasto')}>
              <Text style={[styles.tipoTxt, tipo === 'Gasto' && styles.tipoTxtActivo]}>Gasto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tipoBtn, tipo === 'Ingreso' && styles.tipoBtnActivo]} onPress={() => setTipo('Ingreso')}>
              <Text style={[styles.tipoTxt, tipo === 'Ingreso' && styles.tipoTxtActivo]}>Ingreso</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.inputCard}>
            <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />
          </View>

          <Text style={styles.label}>Monto</Text>
          <View style={styles.inputCard}>
            <TextInput style={styles.input} keyboardType="numeric" value={monto} onChangeText={setMonto} />
          </View>

          <Text style={styles.label}>Fecha</Text>
          <View style={styles.inputCard}>
            <View style={styles.fila}>
              <TextInput style={styles.inputFecha} value={dia} onChangeText={setDia}/>
              <TextInput style={styles.inputFecha} value={mes} onChangeText={setMes}/>
              <TextInput style={styles.inputFecha} value={ano} onChangeText={setAno}/>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios}>
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
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: "#FFFFFF", paddingBottom: 15, paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0) },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  formContainer: { padding: 20, gap: 16 },
  label: { fontSize: 15, fontWeight: '600', color: '#333' },
  inputCard: { backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15, elevation: 2 },
  input: { fontSize: 15, color: "#333" },
  tipoCont:{ flexDirection:'row', marginBottom: 10 },
  tipoBtn:{ flex:1, padding:14, marginHorizontal:5, borderRadius:12, backgroundColor:'#FFFFFF', alignItems:'center', elevation: 2 },
  tipoBtnActivo:{ backgroundColor:'#33604e' },
  tipoTxt:{ color:'#333', fontWeight:'bold' },
  tipoTxtActivo: { color: '#FFFFFF' },
  fila:{ flexDirection:'row', gap: 10 },
  inputFecha:{ flex:1, backgroundColor:'#F5F5F5', padding:10, borderRadius:8, textAlign: 'center' },
  saveButton: { backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});