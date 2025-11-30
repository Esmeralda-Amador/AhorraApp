import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Notificaciones({ navigation }) {

  const [notificaciones, setNotificaciones] = useState([
    { id: '1', icon: 'log-in', title: 'Has ingresado a Ahorra+ App.', subtitle: 'Ayer, 8:21 PM', color: '#33604E' },
    { id: '2', icon: 'settings', title: 'Termina de configurar tu perfil.', subtitle: 'Lunes, 9:00 AM', color: '#33604E' },
    { id: '3', icon: 'alert-triangle', title: 'Has alcanzado el limite de presupuesto de salidas.', subtitle: 'Domingo, 1:15 PM', color: '#D9534F' },
    { id: '4', icon: 'log-out', title: 'Has salido de Ahorra+ App.', subtitle: 'Lunes, 10:17 AM', color: '#33604E' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* --- HEADER CENTRADO --- */}
      <View style={styles.header}>
        {/* 1. Izquierda: Botón Atrás */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Feather name="arrow-left" size={26} color="#33604E" />
        </TouchableOpacity>

        {/* 2. Centro: Título */}
        <Text style={styles.headerTitle}>Notificaciones</Text>
        
        {/* 3. Derecha: Espacio vacío invisible (del mismo tamaño que la flecha) para equilibrar */}
        <View style={{ width: 26 }} /> 
      </View>
      {/* ----------------------- */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.listContainer}>
          {notificaciones.map((notif) => (
            <TouchableOpacity key={notif.id} style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: notif.color === '#D9534F' ? '#FEE2E2' : '#E8F5E9' }]}>
                <Feather 
                  name={notif.icon} 
                  size={24} 
                  color={notif.color}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{notif.title}</Text>
                {notif.subtitle && (
                  <Text style={styles.cardSubtitle}>{notif.subtitle}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{height: 40}} />

      </ScrollView>
    </SafeAreaView>
  );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", 
  },
  scrollView: {
    flex: 1,
  },

  // --- HEADER CENTRADO ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Esto separa los 3 elementos (Izq - Centro - Der)
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20, 
    paddingBottom: 20, 
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4, 
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    // No necesitamos textAlign center porque justifyContent ya lo ubica al medio del espacio disponible
  },
  
  listContainer: {
    padding: 20,
    gap: 15,
    paddingTop: 20, 
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});