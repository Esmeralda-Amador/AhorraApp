


import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function OlvidarPassword() {
  const [email, setEmail] = useState("")

  // Función para manejar el envío del código
  const handleEnviarCodigo = () => {
    // 1. Validación RegEx (Expresión Regular) para un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailLimpio = email.trim()

    if (!emailLimpio) {
      Alert.alert("Campo vacío", "Por favor, ingresa tu correo electrónico.")
      return
    }

    if (!emailRegex.test(emailLimpio)) {
      Alert.alert(
        "Correo inválido",
        "Por favor, ingresa un formato de correo válido."
      )
      return
    }

    // 2. Alerta de éxito (como pediste)
    Alert.alert(
      "¡Revisa tu correo!",
      "Se ha enviado un código de recuperación a tu bandeja de entrada.",
      [{ text: "OK", onPress: () => setEmail("") }]
    )
  }

  return (
    // 1. Contenedor principal con fondo verde
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Contenedor para centrar la tarjeta */}
      <View style={styles.innerContainer}>
        {/* 2. Tarjeta blanca */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.cardSubtitle}>
            Ingresa tu correo y te enviaremos un código.
          </Text>

          {/* 3. El TextInput para el correo */}
          <View style={styles.inputCard}>
            <Feather
              name="mail"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Tu correo electrónico"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Botón para enviar */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleEnviarCodigo}
          >
            <Text style={styles.sendButtonText}>Enviar Código</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#33604E", // <-- 1. FONDO VERDE
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center", // Centra la tarjeta verticalmente
    alignItems: "center", // Centra la tarjeta horizontalmente
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF", // <-- 2. TARJETA BLANCA
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    alignItems: "center",
    gap: 16, // Añadido 'gap' para espaciar todo dentro de la tarjeta
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%", // Ocupa todo el ancho de la tarjeta
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#33604E", // Botón verde
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    marginTop: 8, // Pequeño margen superior
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})