import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, Modal, Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Ya no necesitamos importar los navegadores aquí, solo el componente Image si lo usas.
const Logo = require('../assets/AhorraApp.jpg'); 


export default function PanelPrincipal({ navigation }) {
  const [saldo, setSaldo] = useState('1852.00');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoSaldo, setNuevoSaldo] = useState(saldo);

  const metas = [
    { id: 1, nombre: 'Ahorro viaje a la Playa', progreso: 21, total: 5000, actual: 1200 },
    { id: 2, nombre: 'Fondo de Emergencia', progreso: 40, total: 5000, actual: 2000 },
  ];

  const transacciones = [
    { id: 1, nombre: 'Supermercado', monto: 120, fecha: '28 Nov' },
    { id: 2, nombre: 'Café', monto: 50, fecha: '27 Nov' },
  ];

  const guardarNuevoSaldo = () => {
    setSaldo(nuevoSaldo);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={28} color="#33604E" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#999" style={{marginRight: 8}} />
            <TextInput
              placeholder="Buscar por categoría..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            <Feather name="mic" size={20} color="#999" />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Feather name="bell" size={26} color="#33604E" />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.greetingText}>Hola,</Text>
            <Text style={styles.nameText}>Danna.</Text>
          </View>
          <View style={styles.logoPlaceholder}>
            <Feather name="user" size={30} color="#33604E" />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceLabel}>Saldo Actual</Text>
              <Text style={styles.balanceAmount}>${saldo}</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Feather name="edit-2" size={22} color="#33604E" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis metas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Metas')}>
              <Text style={styles.linkText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {metas.map(meta => (
            <View key={meta.id} style={styles.metaCard}>
              <View style={styles.metaInfo}>
                <Text style={styles.metaName}>{meta.nombre}</Text>
                <Text style={styles.metaProgress}>${meta.actual} / ${meta.total}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${meta.progreso}%` }]} />
              </View>
              <Text style={styles.metaPercent}>{meta.progreso}% completado</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transacciones recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Gestion_de_transacciones')}>
              <Text style={styles.linkText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {transacciones.map(tr => (
            <View key={tr.id} style={styles.transCard}>
              <Text style={styles.transName}>{tr.nombre}</Text>
              <Text style={styles.transAmount}>${tr.monto}</Text>
              <Text style={styles.transDate}>{tr.fecha}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modificar saldo</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={nuevoSaldo}
              onChangeText={setNuevoSaldo}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={guardarNuevoSaldo}>
                <Text style={styles.modalBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    marginHorizontal: 15,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333', height: '100%' },

  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  greetingText: { fontSize: 26, fontWeight: '300', color: '#333' },
  nameText: { fontSize: 26, fontWeight: '800', color: '#222' },
  logoPlaceholder: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center'
  },

  balanceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 14, color: '#666', marginBottom: 8, fontWeight: '500' },
  balanceAmount: { fontSize: 38, fontWeight: '800', color: '#33604E' },

  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  linkText: { color: '#33604E', fontWeight: '600', fontSize: 14 },

  metaCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 12 },
  metaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  metaName: { fontSize: 14, fontWeight: '600', color: '#333' },
  metaProgress: { fontSize: 13, color: '#888', fontWeight: '500' },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 8 },
  progressFill: { height: '100%', backgroundColor: '#33604E', borderRadius: 8 },
  metaPercent: { fontSize: 12, color: '#33604E', marginTop: 4, fontWeight: '600' },

  transCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  transName: { fontSize: 14, fontWeight: '600', color: '#333' },
  transAmount: { fontSize: 14, fontWeight: '700', color: '#33604E' },
  transDate: { fontSize: 12, color: '#888' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: '#333' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtnCancel: { backgroundColor: '#ccc', padding: 10, borderRadius: 10, flex: 1, marginRight: 5, alignItems: 'center' },
  modalBtnSave: { backgroundColor: '#33604E', padding: 10, borderRadius: 10, flex: 1, marginLeft: 5, alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: '600' },
});