import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PresupuestosAgregar() {

  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');

  const guardarPresupuesto = () => {
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
    if (isNaN(montoNum)) {
      Alert.alert('Monto Inválido', 'El monto debe ser un número.');
      return;
    }

    const diaNum = parseInt(diaLimpio, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
      Alert.alert('Día Inválido', 'Por favor, ingresa un día válido (1-31).');
      return;
    }

    const anoNum = parseInt(anoLimpio, 10);
    if (isNaN(anoNum) || anoNum < 2020 || anoNum > 2030) {
      Alert.alert('Año Inválido', 'Por favor, ingresa un año válido (ej: 2024).');
      return;
    }

    Alert.alert(
      "¡Guardado!",
      `Se guardó un presupuesto de $${montoNum} en la categoría ${catLimpia}.\nFecha: ${diaNum}/${mesLimpio}/${anoNum}`
    );

    // Limpiar campos
    setCategoria('');
    setMonto('');
    setDia('');
    setMes('');
    setAno('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Nuevo Presupuesto</Text>

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

        <TouchableOpacity style={styles.saveButton} onPress={guardarPresupuesto}>
          <Feather name="plus-circle" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Guardar Presupuesto</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  scrollView: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33604E',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 15,
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
    justifyContent: "center",
    alignItems: "center",
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