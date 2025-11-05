import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EditarMoneda() {

  const [monedaActual, setMonedaActual] = useState('USD'); 
  const [monedaSeleccionada, setMonedaSeleccionada] = useState('USD'); 

  const handleGuardar = () => {
    if (monedaSeleccionada === monedaActual) {
      Alert.alert(
        "Sin cambios",
        "Ya has seleccionado esta moneda."
      );
      return;
    }

    setMonedaActual(monedaSeleccionada);
    Alert.alert(
      "¡Éxito!",
      `Tu moneda ha sido actualizada a ${monedaSeleccionada}.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Volver")}>
          <Feather name="arrow-left" size={24} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Moneda</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Selecciona tu moneda principal</Text>
          
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.cardRow} 
              onPress={() => setMonedaSeleccionada('USD')}>
              <Feather name="dollar-sign" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Dólar Estadounidense (USD)</Text>
              {monedaSeleccionada === 'USD' && <Feather name="check" size={24} color="#33604E" />}
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.cardRow} 
              onPress={() => setMonedaSeleccionada('MXN')}>
              <Feather name="dollar-sign" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Peso Mexicano (MXN)</Text>
              {monedaSeleccionada === 'MXN' && <Feather name="check" size={24} color="#33604E" />}
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.cardRow} 
              onPress={() => setMonedaSeleccionada('EUR')}>
              <Feather name="euro" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Euro (EUR)</Text>
              {monedaSeleccionada === 'EUR' && <Feather name="check" size={24} color="#33604E" />}
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
            <Feather name="check-circle" size={24} color="#FFFFFF" />
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
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, backgroundColor: "#FFFFFF", paddingBottom: 15,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    borderBottomWidth: 1, borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  formContainer: { padding: 20, gap: 16, paddingBottom: 40 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 0 },
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 12, shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
    shadowRadius: 4, elevation: 2, overflow: 'hidden',
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16 },
  cardIcon: { marginRight: 15 },
  cardLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#333' },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginHorizontal: 16 },
  saveButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12,
    gap: 10, marginTop: 20,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});