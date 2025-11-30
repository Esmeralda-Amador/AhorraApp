// TransaccionesEliminar.js
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Alert, SafeAreaView, ScrollView, 
  StatusBar, Platform, TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DatabaseService from '../database/DatabaseService';

export default function TransaccionesEliminar({ navigation }) {

  const [transacciones, setTransacciones] = useState([]);

  // Inicializar DB y cargar transacciones
  const initDB = async () => {
    try {
      await DatabaseService.initialize();
      cargarTransacciones();
    } catch (error) {
      console.log("Error al inicializar la DB:", error);
    }
  };

  const cargarTransacciones = async () => {
    try {
      const data = await DatabaseService.getAll();
      setTransacciones(data);
    } catch (error) {
      console.log("Error al cargar transacciones:", error);
    }
  };

  useEffect(() => {
    initDB();
  }, []);

  // Función para eliminar transacción compatible con web + móvil
  const handleEliminar = async (id) => {
    const isWeb = Platform.OS === "web";
    let confirmar = true;

    if (isWeb) {
      // Confirmación simple en web
      confirmar = window.confirm("¿Estás seguro de que quieres eliminar esta transacción?");
    } else {
      // Para Android/iOS
      confirmar = await new Promise((resolve) => {
        Alert.alert(
          "Eliminar Transacción",
          "¿Estás seguro de que quieres eliminar esta transacción?",
          [
            { text: "Cancelar", onPress: () => resolve(false), style: "cancel" },
            { text: "Eliminar", onPress: () => resolve(true), style: "destructive" }
          ]
        );
      });
    }

    if (!confirmar) return;

    try {
      const eliminado = await DatabaseService.remove(id);
      if (eliminado) {
        setTransacciones(actuales => actuales.filter(t => t.id !== id));
        navigation.goBack(); // Regresa a Gestion_de_transacciones
      } else {
        if (isWeb) alert("No se pudo eliminar la transacción.");
        else Alert.alert("Error", "No se pudo eliminar la transacción.");
      }
    } catch (error) {
      console.log("Error al eliminar transacción:", error);
      if (isWeb) alert("Ocurrió un problema al eliminar la transacción.");
      else Alert.alert("Error", "Ocurrió un problema al eliminar la transacción.");
    }
  };

  const getIconName = (categoria) => {
    if (categoria === 'Mascotas') return 'heart';
    if (categoria === 'Wifi') return 'wifi';
    if (categoria === 'Devolución' || categoria === 'Devolución compra') return 'corner-up-left';
    return 'tag';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eliminar Transacción</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {transacciones.map((item) => (
            <View key={item.id.toString()} style={styles.itemCard}>
              <Feather 
                name={getIconName(item.categoria)} 
                size={20} 
                color="#33604E" 
                style={styles.itemIcon} 
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemCategoria}>{item.categoria}</Text>
                <Text style={[
                  styles.itemMonto, 
                  { color: item.monto > 0 ? '#108043' : '#FF3B30' }
                ]}>
                  ${item.monto}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleEliminar(item.id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  listContainer: { padding: 20, gap: 16, paddingBottom: 40 },
  itemCard: {
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
  itemIcon: { marginRight: 12 },
  itemInfo: { flex: 1 },
  itemCategoria: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemMonto: { fontSize: 14, fontWeight: '500' },
  deleteButton: { backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  deleteButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 }
});
