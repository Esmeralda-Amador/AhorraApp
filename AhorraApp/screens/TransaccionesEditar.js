// TransaccionesEditar.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatabaseService from '../database/DatabaseService';

export default function TransaccionesEditar({ route, navigation }) {
  const { id } = route.params;
  const [loaded, setLoaded] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    (async () => {
      const all = await DatabaseService.getAll();
      const item = all.find(t => Number(t.id) === Number(id));
      if (!item) {
        Alert.alert("Error", "Transacción no encontrada");
        navigation.goBack();
        return;
      }
      setCategoria(item.categoria);
      setMonto(String(item.monto));
      setDescripcion(item.descripcion || "");
      setDia(String(item.dia));
      setMes(String(item.mes));
      setYear(String(item.year));
      setLoaded(true);
    })();
  }, [id]);

  const guardar = async () => {
    const m = Number(monto);
    if (isNaN(m)) { Alert.alert("Error", "Monto inválido"); return; }

    try {
      const ok = await DatabaseService.update(id, {
        categoria,
        monto: m,
        descripcion,
        dia: Number(dia),
        mes: Number(mes),
        year: Number(year),
        tipo: m >= 0 ? 'Ingreso' : 'Gasto'
      });
      if (ok) navigation.goBack();
      else Alert.alert("Error", "No se pudo actualizar");
    } catch (e) {
      console.log("Error al actualizar:", e);
      Alert.alert("Error", "No se pudo actualizar la transacción.");
    }
  };

  if (!loaded) return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><Text>Cargando...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoría</Text>
      <TextInput value={categoria} onChangeText={setCategoria} style={styles.input} />

      <Text style={styles.label}>Monto</Text>
      <TextInput value={monto} onChangeText={setMonto} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput value={descripcion} onChangeText={setDescripcion} style={styles.input} />

      <Text style={styles.label}>Fecha (día / mes / año)</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput value={dia} onChangeText={setDia} style={[styles.input, { flex: 1 }]} keyboardType="numeric" />
        <TextInput value={mes} onChangeText={setMes} style={[styles.input, { flex: 1 }]} keyboardType="numeric" />
        <TextInput value={year} onChangeText={setYear} style={[styles.input, { flex: 1 }]} keyboardType="numeric" />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={guardar}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 16, backgroundColor: '#F4F7F6' },
  label: { marginTop: 12, color: '#333', fontWeight: '600' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#e6e6e6' },
  saveBtn: { marginTop: 20, backgroundColor: '#33604e', padding: 12, borderRadius: 10, alignItems: 'center' },
});
