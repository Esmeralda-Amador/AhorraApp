
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EditarPerfil() {
  const [nombre, setNombre] = useState('Tu Nombre');
  const [correo, setCorreo] = useState('tu@correo.com');
  const [descripcion, setDescripcion] = useState('Usuario de Ahorra App.');

  const handleGuardarCambios = () => {
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombreLimpio || !correoLimpio) {
      Alert.alert("Campos vacíos", "El nombre y el correo no pueden estar vacíos.");
      return;
    }

    if (!emailRegex.test(correoLimpio)) {
      Alert.alert("Correo inválido", "Por favor, ingresa un correo electrónico válido.");
      return;
    }

    Alert.alert("¡Éxito!", "Perfil actualizado correctamente.");
    console.log("Guardando:", nombreLimpio, correoLimpio);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log("Volver")}>
            <Feather name="arrow-left" size={24} color="#33604E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.profilePicContainer}>
          <View style={styles.profilePicPlaceholder}>
            <Feather name="user" size={60} color="#33604E" />
          </View>
          <TouchableOpacity>
            <Text style={styles.changePicText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputCard}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nombre"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <Text style={styles.label}>Correo Electrónico</Text>
          <View style={styles.inputCard}>
            <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#999"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Descripción</Text>
          <View style={[styles.inputCard, styles.inputCardMultiline]}>
            <Feather name="clipboard" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Escribe algo sobre ti..."
              placeholderTextColor="#999"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios}>
          <Feather name="check-circle" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
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
  profilePicContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profilePicPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  changePicText: {
    color: '#33604E',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 15,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: -8,
  },
  inputCard: {
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
  inputCardMultiline: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
