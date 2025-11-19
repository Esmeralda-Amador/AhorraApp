import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Notificaciones () {

  const [notificaciones, setNotificaciones] = useState([
    { id: '1', icon: 'log-in', title: 'Has ingresado a Ahorra+ App.', subtitle: 'Ayer, 8:21 PM', color: '#33604E' },
    { id: '2', icon: 'settings', title: 'Termina de configurar tu perfil.', subtitle: 'Lunes, 9:00 AM', color: '#33604E' },
    { id: '3', icon: 'alert-triangle', title: 'Has alcanzado el limite de presupuesto de salidas.', subtitle: 'Domingo, 1:15 PM', color: '#D9534F' },
    { id: '4', icon: 'log-out', title: 'Has salido de Ahorra+ App.', subtitle: 'Lunes, 10:17 AM', color: '#33604E' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput placeholder="Buscar en notificaciones..." style={styles.searchInput} placeholderTextColor="#999" />
            <Feather name="mic" size={18} color="#999" />
          </View>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notificaciones</Text>
        </View>

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

      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#33604E" />
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bar-chart-2" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Estadísticas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="dollar-sign" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Ahorros</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    gap: 12,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  listContainer: {
    padding: 20,
    gap: 15,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E7E7E7",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#33604E",
    fontWeight: "600",
  },
  navLabelInactive: {
    color: "#999",
    fontWeight: "400",
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Notificaciones({ navigation }) {
  const notifications = [
    { id: 1, icon: '➡️', text: 'Has ingresado a Ahorra+ App.', meta: 'Xiaomi X3 · 27/09/2025' },
    { id: 2, icon: '🛠️', text: 'Termina de configurar tu perfil.' },
    { id: 3, icon: '⚠️', text: 'Has alcanzado el límite de presupuesto de salidas.' },
    { id: 4, icon: '➡️', text: 'Has salido de Ahorra+ App.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>

      <ScrollView style={{ flex: 1 }}>
        {notifications.map((n) => (
          <View key={n.id} style={styles.card}>
            <Text style={styles.icon}>{n.icon}</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{n.text}</Text>
              {n.meta && <Text style={styles.meta}>{n.meta}</Text>}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Budgets')}
        style={styles.bottomNav}>
        <Text style={styles.bottomText}>← Volver a Presupuestos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { fontSize: 24 },
  cardTitle: { fontWeight: '700', fontSize: 15, marginBottom: 3 },
  meta: { color: '#777', fontSize: 12 },
  bottomNav: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  bottomText: { color: '#2b6b56', fontWeight: '700' },
});

