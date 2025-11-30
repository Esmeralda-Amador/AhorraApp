import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EditarPerfil({ navigation }) {
  const [nombre, setNombre] = useState('Danna Amador');
  const [correo, setCorreo] = useState('dannaamadore@gmail.com');
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

    // Aquí iría tu lógica para guardar en base de datos
    Alert.alert("¡Éxito!", "Perfil actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() } // Cierra el modal al guardar
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En modales, a veces queremos el status bar oscuro o claro dependiendo del diseño */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>
        
        {/* HEADER DEL MODAL */}
        <View style={styles.header}>
          {/* Botón para cerrar el modal */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Feather name="arrow-left" size={24} color="#33604E" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          
          {/* View vacía para equilibrar el título al centro */}
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
        
        {/* Espacio extra abajo */}
        <View style={{height: 40}} />
        
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,
    // En modales, a veces no necesitamos tanto padding top si no cubre toda la pantalla,
    // pero lo dejamos seguro.
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  closeButton: {
    padding: 5, // Área de toque más fácil
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  profilePicContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: -8,
    marginLeft: 4,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14, // Un poco más compacto que el original
    borderWidth: 1,
    borderColor: '#EAEAEA',
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
    height: 80,
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
    shadowColor: "#33604E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});