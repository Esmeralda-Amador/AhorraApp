import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Configuracion({ navigation }) {

  const [notificaciones, setNotificaciones] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* --- HEADER (IGUAL A PANEL, METAS Y PERFIL) --- */}
      <View style={styles.header}>
        {/* Usamos flecha para volver porque es una sub-pantalla */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Feather name="arrow-left" size={26} color="#33604E" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" style={{marginLeft: 5}} />
          <TextInput 
            placeholder="Buscar ajuste..." 
            style={styles.searchInput} 
            placeholderTextColor="#999" 
          />
          {/* Mantenemos el micrófono para consistencia con el Panel */}
          <Feather name="mic" size={20} color="#999" style={{marginRight: 5}} />
        </View>

        {/* Solo dejamos la campana, quitamos el engranaje porque YA ESTAMOS en configuración */}
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
           <Feather name="bell" size={26} color="#33604E" />
        </TouchableOpacity>
      </View>
      {/* ----------------------------------------------- */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Configuración</Text>
        </View>

        <View style={styles.listContainer}>
          
          {/* Tarjeta 1: Ajustes Generales */}
          <View style={styles.card}>
            {/* Notificaciones (Switch) */}
            <View style={styles.cardRow}>
              <Feather name="bell" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Notificaciones Push</Text>
              <View style={styles.cardActionWrapper}>
                <Switch
                  value={notificaciones}
                  onValueChange={setNotificaciones}
                  trackColor={{ false: "#E0E0E0", true: "#33604E" }}
                  thumbColor={"#FFFFFF"}
                />
              </View>
            </View>

            <View style={styles.separator} />
            
            {/* Editar Moneda */}
            <TouchableOpacity 
                style={styles.cardRow}
                onPress={() => navigation.navigate('ConfigEditarMoneda')} // Asegúrate de tener esta ruta o borra el onPress
            >
              <Feather name="dollar-sign" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Tipo de Moneda (MXN)</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#ccc" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Editar Contraseña */}
            <TouchableOpacity 
                style={styles.cardRow}
                onPress={() => navigation.navigate('ConfigEditarContrasena')} // Asegúrate de tener esta ruta
            >
              <Feather name="lock" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Cambiar contraseña</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#ccc" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Tarjeta 2: Ayuda */}
          <View style={styles.card}>
            <TouchableOpacity 
                style={styles.cardRow}
                onPress={() => navigation.navigate('Soporte')}
            >
              <Feather name="help-circle" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Centro de Ayuda</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#ccc" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Botón Cerrar Sesión (Estilo Perfil) */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => navigation.replace('InicioSesion')}
          >
            <Feather name="log-out" size={20} color="#FF4444" style={{marginRight: 10}} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        </View>

        {/* Espacio final */}
        <View style={{height: 40}} />

      </ScrollView>
      
      {/* SE ELIMINÓ EL BOTTOM NAV MANUAL */}
    </SafeAreaView>
  );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Fondo gris suave (Igual a Perfil/Metas)
  },
  scrollView: {
    flex: 1,
  },

  // --- HEADER ESTÁNDAR (COPIA EXACTA DE PANEL/METAS) ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // Altura ajustada: +45 px extra sobre el status bar
    paddingTop: STATUS_BAR_HEIGHT + 45, 
    paddingBottom: 20, 
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4, 
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 8, // Bordes cuadrados suaves
    paddingHorizontal: 10,
    height: 50, 
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
    height: '100%',
  },
  // -----------------------------------------------------

  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
  },
  
  listContainer: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardActionWrapper: {
    paddingLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
  },

  // Botón Cerrar Sesión (Estilo Rojo del Perfil)
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF0F0', // Rojo muy claro
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFCDCD',
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "700",
  },
});