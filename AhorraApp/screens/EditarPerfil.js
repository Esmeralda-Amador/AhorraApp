import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EditarPerfil({ navigation, route }) {
  
  // Recibimos los datos actuales
  const [nombre, setNombre] = useState(route.params?.nombreActual || 'Danna Garduño');
  const [correo, setCorreo] = useState(route.params?.correoActual || 'danna.garduno@email.com');
  const [descripcion, setDescripcion] = useState('Usuario de Ahorra App.');

  const handleGuardarCambios = () => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) { Alert.alert("Error", "Falta el nombre"); return; }

    Alert.alert("¡Guardado!", "Perfil actualizado.", [
      { 
        text: "OK", 
        onPress: () => {
          // Navegamos directo al Perfil con los nuevos datos de texto
 navigation.navigate('MainApp', {
  screen: 'HomeTabs',
  params: {
    screen: 'Perfil',
    params: {
      nombreNuevo: nombreLimpio,
      correoNuevo: correo,
      timestamp: Date.now()
    }
  }
});


        } 
      } 
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Feather name="arrow-left" size={26} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={styles.headerButton} /> 
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Espacio superior (ya que quitamos la foto) */}
        <View style={{ height: 20 }} />

        {/* FORMULARIO */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre Completo</Text>
          <View style={styles.inputCard}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Nombre" 
              value={nombre} 
              onChangeText={setNombre} 
            />
          </View>

          <Text style={styles.label}>Correo Electrónico</Text>
          <View style={styles.inputCard}>
            <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Correo" 
              value={correo} 
              onChangeText={setCorreo} 
              keyboardType="email-address" 
            />
          </View>

          <Text style={styles.label}>Descripción / Bio</Text>
          <View style={[styles.inputCard, styles.inputCardMultiline]}>
            <Feather name="file-text" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={[styles.input, styles.inputMultiline]} 
              placeholder="Escribe algo sobre ti..." 
              value={descripcion} 
              onChangeText={setDescripcion} 
              multiline={true} 
              numberOfLines={3} 
            />
          </View>
        </View>

        {/* BOTÓN GUARDAR */}
        <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F5F5" 
  },
  scrollView: { 
    flex: 1 
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingTop: STATUS_BAR_HEIGHT + 20, 
    paddingBottom: 20, 
    backgroundColor: '#F5F5F5',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center', 
    flex: 1 
  },
  headerButton: { 
    width: 40, 
    alignItems: 'flex-start' 
  },
  formContainer: { 
    paddingHorizontal: 20, 
    gap: 15, 
    marginBottom: 30 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#333', 
    marginBottom: -8, 
    marginLeft: 5 
  },
  inputCard: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF",
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 50, 
    elevation: 1,
  },
  inputCardMultiline: { 
    height: 'auto', 
    paddingVertical: 12, 
    alignItems: 'flex-start' 
  },
  inputIcon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    fontSize: 15, 
    color: "#333", 
    height: '100%' 
  },
  inputMultiline: { 
    minHeight: 80, 
    textAlignVertical: 'top' 
  },
  saveButton: {
    backgroundColor: "#33604E", 
    marginHorizontal: 20, 
    paddingVertical: 16,
    borderRadius: 12, 
    alignItems: "center", 
    elevation: 5, 
    marginBottom: 20,
  },
  saveButtonText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "700" 
  },
});