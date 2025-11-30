import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colores = ['#FFC0CB', '#FFEB3B', '#A5D6A7', '#90CAF9', '#CE93D8', '#FFAB91'];

export default function SeleccionarColor({ navigation }) {
  const [seleccionado, setSeleccionado] = useState(null);

  const guardarColor = async () => {
    try {
      await AsyncStorage.setItem('colorUsuario', seleccionado);
      navigation.goBack(); // volver a Perfil
    } catch (error) {
      console.log("Error al guardar color:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Selecciona un color</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
        {colores.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSeleccionado(color)}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: color,
              borderWidth: seleccionado === color ? 3 : 0,
            }}
          />
        ))}
      </View>

      {seleccionado && (
        <TouchableOpacity
          onPress={guardarColor}
          style={{
            backgroundColor: seleccionado,
            padding: 15,
            marginTop: 40,
            borderRadius: 10
          }}>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#000' }}>
            Guardar color
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
