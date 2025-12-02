import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform, Modal, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { presupuestoController } from '../controllers/PresupuestoController';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;
const PRIMARY_GREEN = '#33604E';
const RED_ALERT = '#D32F2F';     
const LIGHT_GREY = '#F5F5F5';

const formatCurrency = (number) => {
    return number.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace('MX$', '$');
};

const getIconName = (categoria) => {
    const cat = categoria.toLowerCase();
    if (cat.includes('despensa')) return 'shopping-bag';
    if (cat.includes('gustos')) return 'heart';
    if (cat.includes('salidas')) return 'coffee';
    if (cat.includes('servicios')) return 'zap';
    return 'tag';
};


export default function Presupuestos_Mensuales({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [presupuestosData, setPresupuestosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [presupuestoAEliminar, setPresupuestoAEliminar] = useState(null);


  const cargarPresupuestos = async () => {
      setLoading(true);
      try {
          await presupuestoController.inicializar();
          const data = await presupuestoController.obtenerPresupuestosConGasto();
          setPresupuestosData(data);
          
          const excedido = data.find(p => p.excedido);
          if (excedido) {
               Alert.alert("¡Alerta de Gasto!", `Has excedido el presupuesto para la categoría: ${excedido.categoria}.`, [{text: "Entendido"}]);
          }

      } catch (error) {
          console.error("Error cargando presupuestos:", error);
      } finally {
          setLoading(false);
      }
  };

  useFocusEffect(useCallback(() => { cargarPresupuestos(); }, []));
  
  const presupuestosFiltrados = presupuestosData.filter(p => p.categoria.toLowerCase().includes(searchText.toLowerCase()));

  const handleEditarPresupuesto = (presupuesto) => {
      navigation.navigate('PresupuestosEditar', { presupuesto: presupuesto });
  };

  const handleEliminarPresupuesto = (presupuestoId) => {
      setPresupuestoAEliminar(presupuestoId);
      setModalVisible(true);
  };

  const confirmarEliminar = async () => {
      if (presupuestoAEliminar !== null) {
          await presupuestoController.eliminar(presupuestoAEliminar);
          cargarPresupuestos(); 
      }
      setModalVisible(false);
      setPresupuestoAEliminar(null);
  };


  if (loading) {
      return <View style={styles.center}><ActivityIndicator size="large" color="#33604E"/></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* --- HEADER COMPLETO DE PANEL --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={28} color={PRIMARY_GREEN} />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#999" style={{marginRight: 8}} />
            <TextInput
              placeholder="Buscar categoría..."
              style={styles.searchInput}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Feather name="bell" size={26} color={PRIMARY_GREEN} />
          </TouchableOpacity>
        </View>
        {/* --- TÍTULO CENTRADO --- */}
        <Text style={styles.titleCenter}>Mis Presupuestos</Text>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('PresupuestosAgregar')}>
          <Feather name="plus-circle" size={22} color="#fff" />
          <Text style={styles.createText}>Crear Nuevo Presupuesto</Text>
        </TouchableOpacity>

        {presupuestosFiltrados.length === 0 && (
            <Text style={styles.emptyText}>No hay presupuestos registrados o activos para este mes.</Text>
        )}

        {/* --- LISTA DE PRESUPUESTOS (REDSEÑO) --- */}
        {presupuestosFiltrados.map((p) => {
          const excedido = p.excedido;
          const progresoColor = excedido ? RED_ALERT : PRIMARY_GREEN;
          
          return (
            <View key={p.id} style={styles.card}>
              
              {/* Notificación Excedido */}
              {excedido && (
                  <View style={styles.alertBanner}>
                      <Feather name="alert-triangle" size={18} color="#FFFFFF" />
                      <Text style={styles.alertText}>¡PRESUPUESTO EXCEDIDO!</Text>
                  </View>
              )}
              
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, {backgroundColor: excedido ? '#FFEBEE' : '#E8F5E9'}]}>
                    <Feather name={getIconName(p.categoria)} size={22} color={progresoColor} />
                </View>

                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{p.categoria}</Text>
                    <Text style={[styles.amountText, { color: excedido ? RED_ALERT : '#666' }]}>
                        Gastado: {formatCurrency(p.gastado)}
                    </Text>
                </View>
                
                {/* Porcentaje y Acciones */}
                <View style={styles.cardActions}>
                    <Text style={[styles.percentText, { color: progresoColor, marginRight: 15 }]}>
                        {p.porcentaje.toFixed(0)}%
                    </Text>
                    <TouchableOpacity onPress={() => handleEditarPresupuesto(p)}>
                        <Feather name="edit-2" size={20} color="#666" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEliminarPresupuesto(p.id)}>
                        <Feather name="trash-2" size={20} color={RED_ALERT} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
              </View>

              {/* BARRA DE PROGRESO */}
              <View style={styles.progressBar}>
                <View style={[
                    styles.progress, 
                    { 
                        width: `${p.porcentaje}%`, 
                        backgroundColor: progresoColor 
                    }
                ]} />
              </View>
              <Text style={styles.totalLimitText}>
                Límite: {formatCurrency(p.montoLimite)}
              </Text>
            </View>
          );
        })}

        <View style={{ height: 50 }} />
      </ScrollView>

        {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN (Estilos sin cambios) */}
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
                    <Text style={styles.modalText}>¿Eliminar este presupuesto?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={confirmarEliminar}>
                            <Text style={styles.modalButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { paddingBottom: 50, paddingTop: 10 },
  
  // HEADER INTEGRADO
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: STATUS_BAR_HEIGHT + 20, paddingBottom: 15, backgroundColor: '#FFFFFF', elevation: 2, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, height: 45, marginHorizontal: 15 },
  searchInput: { flex: 1, fontSize: 14, color: '#333', height: '100%' },
  
  // TÍTULO CENTRADO
  titleCenter: { fontSize: 24, fontWeight: '800', color: '#333', marginVertical: 20, paddingHorizontal: 20, textAlign: 'center' }, 
  
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20, paddingHorizontal: 20 },
  createButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: PRIMARY_GREEN, padding: 15, borderRadius: 12, marginHorizontal: 20, justifyContent: 'center', marginBottom: 20, gap: 8, elevation: 3 },
  createText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  
  // ESTILOS DE LA TARJETA (Rediseño)
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 20, padding: 18, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 2}, shadowRadius: 5 },
  
  alertBanner: { backgroundColor: RED_ALERT, flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 10, marginBottom: 10, alignSelf: 'flex-start' },
  alertText: { color: '#FFFFFF', fontWeight: 'bold', marginLeft: 8, fontSize: 13 },
  
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' },
  
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardInfo: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  
  percentText: { fontSize: 16, fontWeight: '700' },
  amountText: { fontSize: 14, fontWeight: '500' }, // Gastado
  
  cardActions: { flexDirection: 'row', alignItems: 'center' },

  // PROGRESS BAR
  progressBar: { backgroundColor: '#EAEAEA', borderRadius: 10, height: 8, overflow: 'hidden', marginBottom: 5 },
  progress: { height: '100%', borderRadius: 10 },
  totalLimitText: { fontSize: 14, color: '#999', textAlign: 'right', marginTop: 4 },
    
  // MODALES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', maxWidth: 400, backgroundColor: '#FFFFFF', borderRadius: 15, padding: 25, alignItems: 'center', elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#333' },
  modalText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { paddingVertical: 12, borderRadius: 10, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#6C757D' },
  deleteButton: { backgroundColor: '#DC3545' },
  modalButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});