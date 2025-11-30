import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function EditarContrasena() {

  const navigation = useNavigation();

  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleGuardar = () => {
    const passActual = actual.trim();
    const passNueva = nueva.trim();
    const passConfirmar = confirmar.trim();

    if (!passActual || !passNueva || !passConfirmar) {
      Alert.alert("Campos vacíos", "Por favor, rellena todos los campos.");
      return;
    }

    if (passNueva.length < 6) {
      Alert.alert("Contraseña Débil", "La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (passNueva !== passConfirmar) {
      Alert.alert("Error", "La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    if (passNueva === passActual) {
      Alert.alert("Contraseña Inválida", "La nueva contraseña no puede ser igual a la actual.");
      return;
    }

    Alert.alert("¡Éxito!", "Tu contraseña ha sido actualizada.");

    setActual('');
    setNueva('');
    setConfirmar('');

    navigation.navigate("Configuracion"); // ✔ redirige correctamente
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Contraseña</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* CONTENIDO */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>Contraseña actual</Text>
          <View style={styles.inputCard}>
            <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu contraseña actual"
              secureTextEntry
              value={actual}
              onChangeText={setActual}
            />
          </View>
          
          <Text style={styles.label}>Nueva contraseña</Text>
          <View style={styles.inputCard}>
            <Feather name="key" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={nueva}
              onChangeText={setNueva}
            />
          </View>

          <Text style={styles.label}>Confirmar nueva contraseña</Text>
          <View style={styles.inputCard}>
            <Feather name="key" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Vuelve a escribirla"
              secureTextEntry
              value={confirmar}
              onChangeText={setConfirmar}
            />
          </View>

          {/* BOTÓN GUARDAR */}
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
            <Feather name="check-circle" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },

  // HEADER SIN BARRA BLANCA ARRIBA
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

  formContainer: { padding: 20, gap: 16, paddingBottom: 50 },

  label: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: -5 
  },

  // CUADRO BLANCO MANTENIDO
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },

  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: "#333" },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 22,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
