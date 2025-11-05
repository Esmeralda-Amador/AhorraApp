
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MenuDespegable() {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo y nombre de la app */}
        <View style={styles.logoContainer}>
          <Image
            // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
            source={require('../assets/AhorraApp.jpg')} 
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Ahorra+ App</Text>
        </View>

        {/* Botones de menú */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton}>
            <Feather name="home" size={22} color="#33604E" />
            <Text style={styles.menuText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="user" size={22} color="#33604E" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="list" size={22} color="#33604E" />
            <Text style={styles.menuText}>Transacciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="bar-chart-2" size={22} color="#33604E" />
            <Text style={styles.menuText}>Gráficas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="target" size={22} color="#33604E" />
            <Text style={styles.menuText}>Metas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="settings" size={22} color="#33604E" />
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="log-out" size={22} color="#33604E" />
            <Text style={styles.menuText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="help-circle" size={22} color="#33604E" />
            <Text style={styles.menuText}>Soporte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E7E7E7', 
  },
  container: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',
     borderRadius:65, 
  },
  logoText: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333', 
    marginTop: 10,
    
  },
  menuContainer: {
    width: '85%',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#33604E', 
    marginLeft: 10,
  },
});