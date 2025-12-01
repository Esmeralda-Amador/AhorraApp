// Gestion_de_transacciones.js
import React, { useState, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, SectionList, StyleSheet, TextInput, 
  SafeAreaView, StatusBar, Platform, Alert, Button
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

export default function Gestion_de_transacciones({ navigation }) {
  const [filtro, setFiltro] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const [transacciones, setTransacciones] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Inicializar DB y cargar transacciones
  const cargarTransacciones = async () => {
    try {
      await DatabaseService.initialize();
      let data = [];

      // Si hay rango de fechas, usar getByDateRange
      if (fechaInicio && fechaFin) {
        const startParts = fechaInicio.split('-').map(Number);
        const endParts = fechaFin.split('-').map(Number);
        data = await DatabaseService.getByDateRange({
          startDate: { year: startParts[0], mes: startParts[1], dia: startParts[2] },
          endDate: { year: endParts[0], mes: endParts[1], dia: endParts[2] }
        });
      } else {
        data = await DatabaseService.getALL();
      }

      setTransacciones(data);
    } catch (error) {
      console.log("Error al cargar datos:", error);
      Alert.alert("Error", "No se pudieron cargar las transacciones.");
    }
  };

  // ===== Cargar transacciones cada vez que la pantalla se enfoque =====
  useFocusEffect(
    useCallback(() => {
      cargarTransacciones();
    }, [fechaInicio, fechaFin])
  );

  // Transformar datos de DB → formato SectionList
  const datos = transacciones.map(t => ({
    id: t.id.toString(),
    categoria: t.categoria,
    monto: t.monto,
    tipo: t.tipo,
    descripcion: t.descripcion || '',
    fecha: `${t.dia} / ${t.mes} / ${t.year}`,
  }));

  const prepararDatos = () => {
    let datosFiltrados = filtro === 'Todos' 
      ? datos 
      : datos.filter(item => item.tipo === filtro);

    const busquedaLimpia = searchText.trim().toLowerCase();
    if (busquedaLimpia.length > 0) {
      datosFiltrados = datosFiltrados.filter(item => 
        item.categoria.toLowerCase().includes(busquedaLimpia) ||
        item.descripcion.toLowerCase().includes(busquedaLimpia)
      );
    }

    const grupos = {};
    datosFiltrados.forEach(item => {
      const claveFecha = item.fecha;
      if (!grupos[claveFecha]) grupos[claveFecha] = [];
      grupos[claveFecha].push(item);
    });

    // Ordenar por fecha descendente
    const fechasOrdenadas = Object.keys(grupos).sort((a, b) => {
      const [dA, mA, yA] = a.split(' / ').map(Number);
      const [dB, mB, yB] = b.split(' / ').map(Number);
      const dateA = new Date(yA, mA - 1, dA);
      const dateB = new Date(yB, mB - 1, dB);
      return dateB - dateA;
    });

    return fechasOrdenadas.map(fecha => ({
      title: fecha,
      data: grupos[fecha],
    }));
  };

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.iconoCategoria}>
      {item.categoria === 'Mascotas' && <Feather name="heart" size={24} color="#36504e"/> }
      {item.categoria === 'Wifi' && <Feather name="wifi" size={24} color="#36504e"/> }
      {item.categoria === 'Alimentos' && <Feather name="coffee" size={24} color="#36504e"/> }
      {item.categoria === 'Compra' && <Feather name="shopping-bag" size={20} color="#36504e"/> }
      {item.categoria === 'Devolución compra' && <Feather name="corner-up-left" size={24} color="#36504e"/> }
    </View>
    
    <View style={styles.descripcionItem}>
      <Text style={styles.categoria}>{item.categoria}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={[styles.monto, { color: item.monto > 0 ? '#09a466ff' : '#bc0f03ff' }]}>{`$${item.monto}`}</Text>
    </View>

    {/* Nuevos botones usando Button en lugar de TouchableOpacity */}
    <View style={styles.contBotonesItem}>
      <Button 
        color='green' 
        title='Edit' 
        onPress={() => navigation.navigate('TransaccionesEditar', { item })} 
      />
      <View style={{ width: 10 }} />
      <Button 
        color='#971108' 
        title='Elim' 
        onPress={() => navigation.navigate('TransaccionesEliminar', { item })} 
      />
    </View>
  </View>
);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.navigate('MenuDespegable')}>
          <Feather name="menu" size={24} color="#33604E"  />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#999" />
          <TextInput 
            placeholder="Buscar por categoría o descripción..." 
            style={styles.searchInput} 
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Notificaciones')} >
          <Feather name="bell" size={24} color="#33604E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Configuracion')}>
          <Feather name="settings" size={24} color="#33604E" />
        </TouchableOpacity>
      </View>

      <View style={styles.fechasContainer}>
        <TextInput
          style={styles.fechaInput}
          placeholder="Fecha inicio (YYYY-MM-DD)"
          value={fechaInicio}
          onChangeText={setFechaInicio}
        />
        <TextInput
          style={styles.fechaInput}
          placeholder="Fecha fin (YYYY-MM-DD)"
          value={fechaFin}
          onChangeText={setFechaFin}
        />
        <TouchableOpacity style={styles.botonFiltrar} onPress={cargarTransacciones}>
          <Text style={{ color: 'white' }}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.tabs}>
          {['Todos', 'Ingreso', 'Gasto'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, filtro === tab && styles.tabActivo]}
              onPress={() => setFiltro(tab)}
            >
              <Text style={[styles.tabTexto, filtro === tab && styles.tabTextoActivo]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionList
          style={styles.lista}
          sections={prepararDatos()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.fechaTitulo}>{title}</Text>
          )}
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={()=> navigation.navigate('TransaccionesAgregar')}>
        <Text style={styles.fabtext}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fechasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  fechaInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 12,
  },
  botonFiltrar: {
    backgroundColor: '#36504e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  fab:{
    position: 'absolute',
    bottom:20,
    right: 20,
    backgroundColor: '#21f364ff',
    width: 60,
    height: 60,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabtext:{
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  contentContainer: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    padding: 16,
  },
  contBotonesItem:{
    flexDirection: 'row',
  },
  iconoCategoria:{
      marginRight: 10,
  },
  descripcionItem: {
    flex: 1,
    marginRight: 10,
  },
  descripcion: {
    fontSize: 13,
    color: '#555',
  },
  fechaTitulo: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#36504e',
      marginVertical: 8,
      backgroundColor: '#e7e7e7',
      paddingTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 5,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabActivo: {
    backgroundColor: '#36504e',
  },
  tabTexto: {
    color: '#333',
    fontWeight: '600',
  },
  tabTextoActivo: {
    color: '#ffffff',
  },
  lista: {
    marginTop: 10,
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoria: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
