import React from 'react';
import {View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Logo = require('../assets/AhorraApp.jpg');

// Recibimos { navigation } para poder ir a otras pantallas
export default function PanelPrincipal({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView style={styles.scrollView}>
        {/* Encabezado */}
        <View style={styles.header}>
            {/* Botón MENU: Lo conectamos para ir a 'MenuDespegable' o 'Perfil' */}
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
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

          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* Saludo */}
        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.greetingText}>Hola,</Text>
            <Text style={styles.nameText}>Danna.</Text>
          </View>
          <Image source={Logo} style={styles.logoImage} />
        </View>

        {/* Tarjeta del saldo */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceAmount}>$1,852.00</Text>
        </View>

        {/* Tarjeta de metas */}
        <View style={styles.goalsCard}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
             <Text style={styles.goalsTitle}>Mis metas</Text>
             {/* Enlace para ir a la pantalla completa de Metas */}
             <TouchableOpacity onPress={() => navigation.navigate('Metas')}>
                <Text style={{color:'#33604E', fontWeight:'600'}}>Ver todas</Text>
             </TouchableOpacity>
          </View>

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

        {/* Espacio extra abajo para que no se corte con el TabBar */}
        <View style={{height: 100}} /> 
      </ScrollView>

      {/* --- AQUÍ ELIMINÉ EL MENÚ INFERIOR MANUAL --- 
          Porque el Tab.Navigator de App.js pondrá uno funcional automáticamente.
      */}
      
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: STATUS_BAR_HEIGHT + 7,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
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
  logoImage: {
    width: 55,
    height: 55,
    borderRadius: 45,
  },
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
  // Elimine los estilos de navItem, navLabel, bottomNav porque ya no se usan
});