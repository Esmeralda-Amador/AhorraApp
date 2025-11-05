import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Configuracion () {

  const [notificaciones, setNotificaciones] = useState(true);
  const [biometricos, setBiometricos] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

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
            <TextInput placeholder="Buscar" style={styles.searchInput} placeholderTextColor="#999" />
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
          <Text style={styles.title}>Configuración</Text>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Feather name="bell" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Notificaciones</Text>
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
            
            <TouchableOpacity style={styles.cardRow}>
              <Feather name="dollar-sign" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Editar moneda</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.cardRow}>
              <Feather name="lock" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Editar contraseña</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardRow}>
              <Feather name="help-circle" size={20} color="#33604E" style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Soporte y Ayuda</Text>
              <View style={styles.cardActionWrapper}>
                <Feather name="chevron-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>

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

const styles = StyleSheet.create({
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
    gap: 20,
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
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  cardActionWrapper: {
    paddingLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: "#33604E",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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