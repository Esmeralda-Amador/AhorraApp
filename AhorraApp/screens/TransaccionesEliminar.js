import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { transaccionController } from '../controllers/TransaccionController';

export default function TransaccionesEliminar () {

  const [transacciones, setTransacciones] = useState([]);

  useFocusEffect(
    useCallback(() => {
        cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
      const data = await transaccionController.obtenerTodas();
      setTransacciones(data);
  };

  const handleEliminar = (id) => {
      Alert.alert("Confirmar", "¿Eliminar definitivamente?", [
          { text: "Cancelar" },
          { 
              text: "Eliminar", 
              onPress: async () => {
                  await transaccionController.eliminar(id);
                  cargarDatos(); 
              }
          }
      ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eliminar Transacción</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {transacciones.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemCategoria}>{item.categoria}</Text>
                <Text style={[styles.itemMonto, { color: item.tipo === 'Ingreso' ? 'green' : 'red' }]}>
                  ${Math.abs(item.monto)}
                </Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminar(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          {transacciones.length === 0 && <Text style={{textAlign:'center', color:'#999'}}>Vacío.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },
  header: { alignItems: "center", padding: 20, backgroundColor: "#FFFFFF", paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20 },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  listContainer: { padding: 20, gap: 16 },
  itemCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, elevation: 2 },
  itemInfo: { flex: 1 },
  itemCategoria: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemMonto: { fontSize: 14, fontWeight: '500' },
  deleteButton: { backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  deleteButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 }
});