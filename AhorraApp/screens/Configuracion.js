import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, Switch, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Configuracion({ navigation }) {

  const [notificaciones, setNotificaciones] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el Modal

  // Componente de Fila de Configuración
  const ConfigOption = ({ icon, label, onPress, value, onValueChange, isSwitch, isDestructive }) => (
    <TouchableOpacity 
      style={styles.optionRow} 
      onPress={onPress} 
      disabled={isSwitch}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isDestructive && { backgroundColor: '#FFF0F0' }]}>
        <Feather name={icon} size={20} color={isDestructive ? "#FF4D4D" : "#33604E"} />
      </View>
      <Text style={[styles.optionLabel, isDestructive && { color: '#FF4D4D', fontWeight: '600' }]}>{label}</Text>
      
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E0E0E0", true: "#33604E" }}
          thumbColor={"#FFFFFF"}
        />
      ) : (
        <Feather name="chevron-right" size={20} color={isDestructive ? "#FF4D4D" : "#CCC"} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* --- MODAL DE TÉRMINOS Y CONDICIONES --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Términos y Condiciones</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Feather name="x" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
                <Text style={styles.modalText}>
                    1. Uso de la Aplicación: Al usar Ahorra App, aceptas gestionar tus finanzas de manera responsable...
                    {'\n\n'}
                    2. Privacidad: Tus datos están encriptados y no se comparten con terceros sin tu consentimiento.
                    {'\n\n'}
                    3. Responsabilidad: La aplicación es una herramienta de ayuda y no garantiza resultados financieros específicos.
                    {'\n\n'}
                    (Este es un texto de ejemplo para mostrar el funcionamiento del modal).
                </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- HEADER FUNCIONAL --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Feather name="arrow-left" size={26} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.headerButton} /> 
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* SECCIÓN 1: GENERAL */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>General</Text>
            <View style={styles.card}>
                <ConfigOption 
                    icon="bell" 
                    label="Notificaciones Push" 
                    isSwitch={true}
                    value={notificaciones}
                    onValueChange={setNotificaciones}
                />
                 <View style={styles.separator} />
                 <ConfigOption 
                    icon="dollar-sign" 
                    label="Moneda Principal (MXN)" 
                    onPress={() => navigation.navigate('ConfigEditarMoneda')}
                />
            </View>
        </View>

        {/* SECCIÓN 2: SEGURIDAD */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Seguridad</Text>
            <View style={styles.card}>
                 <ConfigOption 
                    icon="lock" 
                    label="Cambiar Contraseña" 
                    onPress={() => navigation.navigate('ConfigEditarContrasena')}
                />
            </View>
        </View>

        {/* SECCIÓN 3: LEGAL E INFO */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Información</Text>
            <View style={styles.card}>
                 <ConfigOption 
                    icon="help-circle" 
                    label="Ayuda y Soporte" 
                    onPress={() => navigation.navigate('Soporte')}
                />
                <View style={styles.separator} />
                <ConfigOption 
                    icon="file-text" 
                    label="Términos y Condiciones" 
                    onPress={() => setModalVisible(true)} // ABRE EL MODAL
                />
            </View>
        </View>

        {/* --- NUEVO DISEÑO DE CERRAR SESIÓN --- */}
        <View style={styles.logoutContainer}>
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={() => navigation.replace('InicioSesion')}
            >
                <Feather name="log-out" size={20} color="#FF4D4D" style={{marginRight: 8}} />
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Versión 1.0.2</Text>
        </View>

        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

const styles = StyleSheet.create({
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#33604E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // MAIN STYLES
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
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
  
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#F0F9F4', // Fondo verde muy suave para los iconos
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 60, 
    marginRight: 20,
  },
  
  // LOGOUT STYLES MEJORADOS
  logoutContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE5E5',
    elevation: 1,
  },
  logoutButtonText: {
    color: "#FF4D4D",
    fontSize: 16,
    fontWeight: "600",
  },
  versionText: {
    marginTop: 15,
    color: '#999',
    fontSize: 12,
  },
});