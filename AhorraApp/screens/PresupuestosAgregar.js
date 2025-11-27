// screens/PresupuestosAgregar.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PresupuestoController } from '../controllers/PresupuestoController';

export default function PresupuestosAgregar({ navigation }) {
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [guardando, setGuardando] = useState(false);

  // CONTROLADOR CREADO DENTRO DEL COMPONENTE (así nunca falla)
  const controller = new PresupuestoController();

  // Inicializar la base de datos al montar el componente
  useEffect(() => {
    controller.initialize();
  }, []);

  const guardarPresupuesto = async () => {
    if (guardando) return;

    const cat = categoria.trim();
    const m = monto.trim();
    const d = dia.trim();
    const mesStr = mes.trim();
    const a = ano.trim();

    // Validaciones
    if (!cat || !m || !d || !mesStr || !a) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const montoNum = parseFloat(m);
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido mayor a 0');
      return;
    }

    const diaNum = parseInt(d, 10);
    const anoNum = parseInt(a, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
      Alert.alert('Error', 'Día inválido (1-31)');
      return;
    }
    if (isNaN(anoNum) || anoNum < 2020 || anoNum > 2030) {
      Alert.alert('Error', 'Año inválido (2020-2030)');
      return;
    }

    // Validar mes (acepta número o nombre)
    const mesesValidos = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    if (!mesesValidos.includes(mesStr.toLowerCase())) {
      Alert.alert('Error', 'Mes inválido. Usa número (1-12) o nombre');
      return;
    }

    const fechaFormateada = `${diaNum.toString().padStart(2, '0')}/${mesStr.padStart(2, '0')}/${anoNum}`;

    try {
      setGuardando(true);

      await controller.crearPresupuesto({
        categoria: cat,
        monto: montoNum,
        fecha: fechaFormateada,
      });

      Alert.alert(
        '¡Presupuesto Guardado!',
        `$${montoNum} en "${cat}" para el ${fechaFormateada}`
      );

      // Limpiar formulario
      setCategoria('');
      setMonto('');
      setDia('');
      setMes('');
      setAno('');

      // Opcional: volver atrás
      // navigation?.goBack();

    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo guardar el presupuesto');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E7E7E7" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Nuevo Presupuesto</Text>

        {/* Categoría */}
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.inputCard}>
          <Feather name="tag" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ej: Alimentos, Gustos, Despensa"
            placeholderTextColor="#999"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        {/* Monto */}
        <Text style={styles.label}>Monto</Text>
        <View style={styles.inputCard}>
          <Feather name="dollar-sign" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ej: 300"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
        </View>

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.inputCard}>
          <View style={styles.fila}>
            <TextInput
              style={styles.inputFecha}
              placeholder="Día"
              keyboardType="numeric"
              value={dia}
              onChangeText={setDia}
              maxLength={2}
            />
            <TextInput
              style={styles.inputFecha}
              placeholder="Mes"
              value={mes}
              onChangeText={setMes}
              maxLength={12}
            />
            <TextInput
              style={styles.inputFecha}
              placeholder="Año"
              keyboardType="numeric"
              value={ano}
              onChangeText={setAno}
              maxLength={4}
            />
          </View>
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity
          style={[styles.saveButton, guardando && { opacity: 0.7 }]}
          onPress={guardarPresupuesto}
          disabled={guardando}
        >
          <Feather name="plus-circle" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>
            {guardando ? 'Guardando...' : 'Guardar Presupuesto'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollView: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#33604E',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
  },
  inputFecha: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33604E',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});