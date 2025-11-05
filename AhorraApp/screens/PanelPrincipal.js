import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Se importa el logo de la aplicación
const Logo = require('../assets/AhorraApp.jpg');

export default function PanelPrincipal() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* Encabezado con menú, buscador, notificación y logo */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>

          {/* Barra de búsqueda */}
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput
              placeholder="Buscar"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            <Feather name="mic" size={18} color="#999" />
          </View>

          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* Saludo principal con logo */}
        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.greetingText}>Hola,</Text>
            <Text style={styles.nameText}>Danna.</Text>
          </View>

          {/* Logo en lugar del icono */}
          <Image source={Logo} style={styles.logoImage} />
        </View>

        {/* Tarjeta con el saldo actual */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceAmount}>$1,852.00</Text>
        </View>

        {/* Sección de metas de ahorro */}
        <View style={styles.goalsCard}>
          <Text style={styles.goalsTitle}>Mis metas</Text>

          {/* Meta 1 */}
          <View style={styles.goalItem}>
            <View style={styles.progressCircle}>
              <View style={styles.progressInner}>
                <Text style={styles.progressText}>21%</Text>
              </View>
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalName}>Ahorro viaje a la Playa</Text>
              <Text style={styles.goalProgress}>$1,200 / $5,000</Text>
            </View>
          </View>

          {/* Meta 2 */}
          <View style={styles.goalItem}>
            <View style={styles.progressCircle}>
              <View style={styles.progressInner}>
                <Text style={styles.progressText}>40%</Text>
              </View>
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalName}>Fondo de Emergencia</Text>
              <Text style={styles.goalProgress}>$2,000 / $5,000</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navegación inferior */}
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
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Metas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Fondo general
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollView: {
    flex: 1,
  },

  // Parte superior (menú, buscador, notificación)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },

  // Estilo de la barra de búsqueda
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  // Sección de saludo
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },

  // Logo 
  logoImage: {
    width: 55,
    height: 55,
    borderRadius: 45,
  },

  // Tarjeta del saldo
  balanceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#33604E',
  },

  // Tarjeta de metas
  goalsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },

  // Cada meta
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#33604E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33604E',
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 14,
    color: '#666',
  },

  // Navegación inferior
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#33604E',
    fontWeight: '600',
  },
  navLabelInactive: {
    color: '#999',
    fontWeight: '400',
  },
});
