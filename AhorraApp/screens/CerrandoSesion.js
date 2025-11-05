
import React from "react"

import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from "react-native"

export default function CerrandoSesion() {
 
  return (
    // 1. Contenedor principal con el fondo verde
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="light-content" />

      {/* 2. El "spinner" o indicador de carga */}
      <ActivityIndicator size="large" color="#FFFFFF" />

      {/* 3. El texto que ve el usuario */}
      <Text style={styles.text}>Cerrando sesión...</Text>
    </SafeAreaView>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#33604E", // Fondo verde de Ahorra App
    justifyContent: "center", // Centra todo verticalmente
    alignItems: "center", // Centra todo horizontalmente
    gap: 20, // Espacio entre el spinner y el texto
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
})