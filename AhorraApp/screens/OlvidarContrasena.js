import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { usuarioController } from '../controllers/UsuarioController'; 

export default function OlvidarContrasena({navigation}) {
  const [email, setEmail] = useState("");
  const [respuesta, setRespuesta] = useState(""); // Nuevo estado
  const [isChecking, setIsChecking] = useState(false);

  const handleVerificar = async () => {
    if (!email.trim() || !respuesta.trim()) {
      Alert.alert("Campos vacíos", "Ingresa tu correo y la respuesta de seguridad.");
      return;
    }

    setIsChecking(true);
    try {
        await usuarioController.initialize();
        // Verificamos. Si es correcto, nos devuelve el ID del usuario.
        const userId = await usuarioController.verificarSeguridad(email, respuesta);
        
        Alert.alert("¡Correcto!", "Tu identidad ha sido verificada.");
        
        // Navegamos a la pantalla de cambio de contraseña enviando el ID
        navigation.navigate("RestablecerPassword", { userId: userId });

    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsChecking(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recuperar Cuenta</Text>
          <Text style={styles.cardSubtitle}>Responde tu pregunta de seguridad para restablecer tu contraseña.</Text>

          {/* Input Correo */}
          <View style={styles.inputCard}>
            <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Tu correo registrado"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input Respuesta Seguridad */}
          <Text style={styles.securityQuestion}>¿Nombre de tu primera mascota?</Text>
          <View style={styles.inputCard}>
            <Feather name="shield" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta secreta"
              placeholderTextColor="#999"
              value={respuesta}
              onChangeText={setRespuesta}
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleVerificar}>
            <Text style={styles.sendButtonText}>{isChecking ? 'Verificando...' : 'Verificar'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 15}}>
             <Text style={{color: '#33604E'}}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // ... Usa los mismos estilos que tenías, agrega este:
  container: { flex: 1, backgroundColor: "#33604E" },
  innerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { width: "100%", backgroundColor: "#FFFFFF", borderRadius: 16, padding: 24, alignItems: "center", gap: 16, elevation: 10 },
  cardTitle: { fontSize: 22, fontWeight: "700", color: "#333" },
  cardSubtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 10 },
  inputCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 12, paddingHorizontal: 16, height: 50, width: "100%" },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: "#333" },
  securityQuestion: { alignSelf: 'flex-start', marginLeft: 5, fontWeight: '600', color: '#33604E', marginBottom: -10, marginTop: 5 },
  sendButton: { backgroundColor: "#33604E", paddingVertical: 15, borderRadius: 12, width: "100%", marginTop: 10, alignItems: 'center' },
  sendButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});