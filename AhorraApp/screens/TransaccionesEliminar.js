// TransaccionesEliminar.js
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DatabaseService from '../database/DatabaseService';

export default function TransaccionesEliminar({ route, navigation }) {
  const { id } = route.params || {};

  useEffect(() => {
    if (!id) {
      navigation.goBack();
      return;
    }
    Alert.alert("Eliminar", "¿Eliminar transacción?", [
      { text: "Cancelar", onPress: () => navigation.goBack(), style: 'cancel' },
      { text: "Eliminar", style: 'destructive', onPress: async () => {
          await DatabaseService.remove(id);
          navigation.goBack();
        }}
    ]);
  }, [id]);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Eliminando...</Text>
    </View>
  );
}
