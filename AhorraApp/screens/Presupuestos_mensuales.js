import React from 'react';
import { 
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Presupuestos_Mensuales() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');

  const abrirMenu = () => navigation.openDrawer();
  const irNotificaciones = () => navigation.navigate('Notificaciones');
  const crearPresupuesto = () => navigation.navigate('PresupuestosAgregar');

  const presupuestos = [
    { id: 1, nombre: 'Despensa', icon: 'shopping-cart', gastado: 270, total: 300, color: '#4CAF50' },
    { id: 2, nombre: 'Gustos', icon: 'heart', gastado: 150, total: 300, color: '#FF9800' },
    { id: 3, nombre: 'Salidas', icon: 'coffee', gastado: 300, total: 300, color: '#D32F2F' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={abrirMenu}>
            <Feather name="menu" size={28} color="#33604E" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#999" style={{marginRight: 8}} />
            <TextInput
              placeholder="Buscar por categoría..."
              style={styles.searchInput}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Feather name="mic" size={20} color="#999" />
          </View>

          <TouchableOpacity onPress={irNotificaciones}>
            <Feather name="bell" size={26} color="#33604E" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Mis Presupuestos</Text>

        <TouchableOpacity style={styles.createButton} onPress={crearPresupuesto}>
          <Feather name="plus-circle" size={22} color="#fff" />
          <Text style={styles.createText}>Crear Presupuesto</Text>
        </TouchableOpacity>

        {presupuestos.map((p) => {
          const porcentaje = Math.min((p.gastado / p.total) * 100, 100);
          return (
            <View key={p.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Feather name={p.icon} size={22} color={p.color} />
                <Text style={styles.cardTitle}>{p.nombre}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${porcentaje}%`, backgroundColor: p.color }]} />
              </View>
              <Text style={[styles.percentText, { color: p.gastado >= p.total ? '#D32F2F' : p.color }]}>
                {porcentaje.toFixed(0)}% gastado
              </Text>
              <Text style={styles.amountText}>{p.gastado}/{p.total}</Text>
            </View>
          );
        })}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { paddingBottom: 50 },
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
  searchInput: { flex: 1, fontSize: 14, color: '#333', height: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#33604E', marginVertical: 20, paddingHorizontal: 20 },
  createButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#33604E', padding: 15,
    borderRadius: 12, marginHorizontal: 20, justifyContent: 'center', marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, shadowRadius: 4, elevation: 3
  },
  createText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 20, padding: 15, marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
  progressBar: { backgroundColor: '#E0E0E0', borderRadius: 10, height: 6, overflow: 'hidden', marginBottom: 5 },
  progress: { height: '100%', borderRadius: 10 },
  percentText: { fontSize: 12 },
  amountText: { fontSize: 12, color: '#555', textAlign: 'right' },
});
