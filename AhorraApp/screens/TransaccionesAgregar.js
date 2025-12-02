// TransaccionesAgregar.js
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  SafeAreaView, ScrollView, StatusBar, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DatabaseService from '../database/DatabaseService';

export default function TransaccionesAgregar({ navigation }) {

  const hoy = new Date();
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dia, setDia] = useState(String(hoy.getDate()));
  const [mes, setMes] = useState(String(hoy.getMonth() + 1));
  const [year, setYear] = useState(String(hoy.getFullYear()));

  const guardar = async () => {
    if (!categoria || monto === '') {
      Alert.alert("Error", "Completa categoría y monto.");
      return;
    }
    const m = Number(monto);
    if (isNaN(m)) { Alert.alert("Error", "Monto inválido"); return; }

    try {
      await DatabaseService.add({
        categoria,
        monto: m,
        descripcion,
        dia: Number(dia),
        mes: Number(mes),
        year: Number(year),
        tipo: m >= 0 ? 'Ingreso' : 'Gasto'
      });
      navigation.goBack();
    } catch (e) {
      console.log("Error al guardar:", e);
      Alert.alert("Error", "No se pudo guardar la transacción.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva Transacción</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>

          {/* CATEGORIA */}
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.inputCard}>
            <Feather name="tag" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              value={categoria}
              onChangeText={setCategoria}
              style={styles.input}
              placeholder="Ej: Sueldo, Comida"
              placeholderTextColor="#999"
            />
          </View>

          {/* MONTO */}
          <Text style={styles.label}>Monto (usa negativo para gasto)</Text>
          <View style={styles.inputCard}>
            <Feather name="dollar-sign" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              value={monto}
              onChangeText={setMonto}
              style={styles.input}
              placeholder="Ej: 1200 o -350"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* DESCRIPCIÓN */}
          <Text style={styles.label}>Descripción</Text>
          <View style={styles.inputCard}>
            <Feather name="file-text" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.input}
              placeholder="Opcional"
              placeholderTextColor="#999"
            />
          </View>

          {/* FECHA */}
          <Text style={styles.label}>Fecha (día / mes / año)</Text>

          <View style={[styles.inputCard, { flexDirection: "column" }]}>
            <View style={styles.fila}>
              <TextInput 
                value={dia} 
                onChangeText={setDia} 
                style={styles.inputFecha} 
                keyboardType="numeric"
              />
              <TextInput 
                value={mes} 
                onChangeText={setMes} 
                style={styles.inputFecha} 
                keyboardType="numeric"
              />
              <TextInput 
                value={year} 
                onChangeText={setYear} 
                style={styles.inputFecha} 
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* GUARDAR */}
          <TouchableOpacity style={styles.saveButton} onPress={guardar}>
            <Feather name="plus-circle" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


// ====================== ESTILOS ======================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 14,
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

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: "100%"
  },

  inputFecha: { 
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 20,
  },

  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
