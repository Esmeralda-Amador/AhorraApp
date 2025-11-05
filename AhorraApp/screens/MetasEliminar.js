

import React, { useState } from "react"

import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Alert, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function EliminarMetas() {
  const [metas, setMetas] = useState([
    { id: 1, nombre: "Viaje a Japón", monto: 5000 },
    { id: 2, nombre: "Laptop Nueva", monto: 1500 },
    { id: 3, nombre: "Fondo de Emergencia", monto: 3000 },
  ])

  const handleEliminarMeta = (metaId) => {
    Alert.alert(
      "Eliminar Meta",
      "¿Estás seguro de que quieres eliminar esta meta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            const nuevasMetas = metas.filter((meta) => meta.id !== metaId)
            setMetas(nuevasMetas)
          },
          style: "destructive",
        },
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        {/* 1. HEADER IDÉNTICO AL DE CREAR META */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput placeholder="Buscar" style={styles.searchInput} placeholderTextColor="#999" />
            <Feather name="mic" size={18} color="#999" />
          </View>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* 2. TÍTULO IDÉNTICO AL DE CREAR META */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Eliminar Meta</Text>
        </View>

        {/* 3. CONTENIDO (AQUÍ VA LA LISTA) */}
        <View style={styles.listContainer}>
          {metas.map((meta) => (
            <View key={meta.id} style={styles.metaItem}>
              <View style={styles.metaInfo}>
                <Text style={styles.metaNombre}>{meta.nombre}</Text>
                <Text style={styles.metaMonto}>Objetivo: ${meta.monto}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleEliminarMeta(meta.id)}
              >
                <Feather name="trash-2" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 4. BOTTOM NAV IDÉNTICO AL DE CREAR META */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="bar-chart-2" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="dollar-sign" size={24} color="#33604E" />
          <Text style={styles.navLabel}>Ahorros</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    gap: 12,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 30,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  metaInfo: {
    flex: 1,
    marginRight: 10,
  },
  metaNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  metaMonto: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E7E7E7",
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#33604E",
    fontWeight: "600",
  },
  navLabelInactive: {
    color: "#999",
    fontWeight: "400",
  },
})
