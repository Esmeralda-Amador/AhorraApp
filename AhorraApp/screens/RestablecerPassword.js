// screens/RestablecerPassword.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usuarioController } from '../controllers/UsuarioController'; 

export default function RestablecerPassword({ navigation, route }) {
  const { userId } = route.params; // Obtenemos el ID del usuario verificado
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const handleRestablecer = async () => {
    if (pass1.length < 6) {
        Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
        return;
    }
    if (pass1 !== pass2) {
        Alert.alert("Error", "Las contraseñas no coinciden.");
        return;
    }

    try {
        await usuarioController.restablecerContrasena(userId, pass1);
        Alert.alert("¡Éxito!", "Contraseña actualizada correctamente.", [
            { text: "Iniciar Sesión", onPress: () => navigation.navigate('InicioSesion') }
        ]);
    } catch (error) {
        Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nueva Contraseña</Text>
        
        <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#666" style={{marginRight: 10}}/>
            <TextInput 
                placeholder="Nueva contraseña" 
                secureTextEntry 
                value={pass1} 
                onChangeText={setPass1} 
                style={{flex:1}}
            />
        </View>

        <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#666" style={{marginRight: 10}}/>
            <TextInput 
                placeholder="Confirmar contraseña" 
                secureTextEntry 
                value={pass2} 
                onChangeText={setPass2} 
                style={{flex:1}}
            />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleRestablecer}>
            <Text style={styles.btnText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#33604E', justifyContent: 'center', padding: 20 },
    card: { backgroundColor: 'white', borderRadius: 20, padding: 30, alignItems: 'center', gap: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    inputContainer: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, width: '100%', alignItems: 'center' },
    btn: { backgroundColor: '#33604E', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});