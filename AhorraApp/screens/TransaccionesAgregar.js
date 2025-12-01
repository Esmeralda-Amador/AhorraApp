// TransaccionesAgregar.js
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  SafeAreaView, ScrollView, StatusBar, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DatabaseService from '../database/DatabaseService';

export default function TransaccionesAgregar({ navigation }) {

  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [year, setYear] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const guardarMovimiento = async () => {
    const catLimpia = categoria.trim();
    const montoLimpio = monto.trim();
    const diaLimpio = dia.trim();
    const mesLimpio = mes.trim();
    const yearLimpio = year.trim();
    const descLimpia = descripcion.trim();

    if (!catLimpia || !montoLimpio || !diaLimpio || !mesLimpio || !yearLimpio) {
      Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos.');
      return;
    }

    const montoNum = parseFloat(montoLimpio);
    if (isNaN(montoNum) || montoNum === 0) {
      Alert.alert('Monto inválido', 'El monto debe ser un número distinto de cero.');
      return;
    }

    const diaNum = parseInt(diaLimpio, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
      Alert.alert('Día inválido', 'Por favor, ingresa un día válido (1-31).');
      return;
    }

    const mesNum = parseInt(mesLimpio, 10);
    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
      Alert.alert('Mes inválido', 'Por favor, ingresa un mes válido (1-12).');
      return;
    }

    const yearNum = parseInt(yearLimpio, 10);
    if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
      Alert.alert('Año inválido', 'Por favor, ingresa un año válido (ej: 2024, 2025).');
      return;
    }

    try {
      // Inicializa la DB solo una vez
      await DatabaseService.initialize();

      const tipoDeterminado = montoNum > 0 ? 'Ingreso' : 'Gasto';
      const nuevaTransaccion = {
        categoria: catLimpia,
        monto: montoNum,
        dia: diaNum,
        mes: mesNum,
        year: yearNum,
        tipo: tipoDeterminado,
        descripcion: descLimpia,
      };

      await DatabaseService.add(nuevaTransaccion);

      Alert.alert(
        "¡Guardado!",
        `Se guardó un ${tipoDeterminado.toLowerCase()} de $${montoNum} en la categoría ${catLimpia}.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );

      // Limpiar inputs
      setCategoria('');
      setMonto('');
      setDia('');
      setMes('');
      setYear('');
      setDescripcion('');

    } catch (error) {
      console.log("Error al guardar transacción:", error);
      Alert.alert("Error", "Hubo un problema al guardar la transacción.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Nueva Transacción</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
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
              <TextInput
                style={styles.inputFecha} 
                placeholder="Día" 
                keyboardType="numeric" 
                value={dia} 
                onChangeText={setDia} 
              />
              <TextInput
                style={styles.inputFecha} 
                placeholder="Mes" 
                keyboardType="numeric" 
                value={mes} 
                onChangeText={setMes} 
              />
              <TextInput
                style={styles.inputFecha} 
                placeholder="Año" 
                keyboardType="numeric" 
                value={year} 
                onChangeText={setYear} 
              />
            </View>
          </View>

          <Text style={styles.label}>Descripción</Text>
          <View style={styles.inputCard}>
            <Feather name="file-text" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Detalles de la transacción"
              placeholderTextColor="#999"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={guardarMovimiento}>
            <Feather name="plus-circle" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  formContainer: { padding: 20, gap: 16, paddingBottom: 40 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: -8 },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: "#333" },
  fila:{ flex:1, flexDirection:'row', justifyContent:'space-between', gap: 10 },
  inputFecha:{ 
    flex:1, backgroundColor:'#F5F5F5', padding:10, borderRadius:8, 
    textAlign: 'center', fontSize: 15, color: '#333',
  },
  saveButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12,
    gap: 10, marginTop: 20,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
