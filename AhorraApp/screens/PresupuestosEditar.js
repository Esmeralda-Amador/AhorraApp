import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { presupuestoController } from '../controllers/PresupuestoController';

// Función auxiliar para parsear fechas
const parseDateParts = (dateStr) => {
    if (!dateStr) return { day: '', month: '', year: '' };
    const parts = dateStr.split(' / ');
    return { day: parts[0], month: parts[1], year: parts[2] };
};


export default function PresupuestosEditar({navigation, route}) {

  // Obtener Presupuesto del router
  const presupuesto = route.params?.presupuesto;

  // Cargar datos en el estado
  const [categoria, setCategoria] = useState(presupuesto?.categoria || '');
  const [monto, setMonto] = useState(presupuesto ? presupuesto.montoLimite.toString() : '');
  
  const fecha = parseDateParts(presupuesto?.fechaInicio);
  const [dia, setDia] = useState(fecha.day);
  const [mes, setMes] = useState(fecha.month);
  const [ano, setAno] = useState(fecha.year);

  const handleGuardarCambios = async () => {
    const catLimpia = categoria.trim();
    const montoLimpio = monto.trim();
    const diaLimpio = dia.trim();
    const mesLimpio = mes.trim();
    const anoLimpio = ano.trim();

    if (!catLimpia || !montoLimpio || !diaLimpia || !mesLimpia || !anoLimpio) {
      Alert.alert('Campos Incompletos', 'Rellena todos los campos.');
      return;
    }
    
    try {
        await presupuestoController.actualizar(
            presupuesto.id,
            catLimpia,
            montoLimpio,
            diaLimpio,
            mesLimpio,
            anoLimpio
        );

        Alert.alert("¡Actualizado!", "Presupuesto guardado.", [
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
        <Text style={styles.headerTitle}>Editar Presupuesto</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.inputCard}>
            <Feather name="tag" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ej: Alimentos, Gustos, Despensa"
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
              placeholder="Ej: 300"
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },

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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },

  formContainer: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: -8,
  },

  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
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
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});