import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PresupuestoEliminar() {

  const [presupuestos, setPresupuestos] = useState([
    { id: '1', categoria: 'Despensa', monto: 300 },
    { id: '2', categoria: 'Gustos', monto: 150 },
    { id: '3', categoria: 'Salidas', monto: 300 },
  ]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Presupuesto",
      "¿Estás seguro de que quieres eliminar este presupuesto?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => setPresupuestos(actuales => 
            actuales.filter(p => p.id !== id)
          ), 
          style: "destructive" 
        }
      ]
    );
  };

  const getIconName = (categoria) => {
    if (categoria === 'Despensa') return 'shopping-cart';
    if (categoria === 'Gustos') return 'coffee';
    if (categoria === 'Salidas') return 'walk';
    return 'tag';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Volver")}>
          <Feather name="arrow-left" size={24} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eliminar Presupuesto</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {presupuestos.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Feather 
                name={getIconName(item.categoria)} 
                size={20} 
                color="#33604E" 
                style={styles.itemIcon} 
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemCategoria}>{item.categoria}</Text>
                <Text style={styles.itemMonto}>
                  ${item.monto}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminar(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  listContainer: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
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
  itemIcon: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemCategoria: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemMonto: {
    fontSize: 14,
    fontWeight: '500',
    color: '#33604E',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  }
});