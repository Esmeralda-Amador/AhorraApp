import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Logo = require('../assets/AhorraApp.jpg');

export default function PanelPrincipal({ navigation }) {
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
          <Image source={Logo} style={styles.logoImage} />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceAmount}>$1,852.00</Text>
        </View>

        <View style={styles.goalsCard}>
          <View style={styles.goalsHeader}>
             <Text style={styles.goalsTitle}>Mis metas</Text>
             <TouchableOpacity onPress={() => navigation.navigate('Metas')}>
                <Text style={styles.linkText}>Ver todas</Text>
             </TouchableOpacity>
          </View>

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

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    height: '100%',
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '300',
    color: '#333',
  },
  nameText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: '#33604E',
  },
  goalsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  linkText: {
    color: '#33604E',
    fontWeight: '600',
    fontSize: 14,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  progressCircle: {
    width: 55,
    height: 55,
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
    fontSize: 12,
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
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
});