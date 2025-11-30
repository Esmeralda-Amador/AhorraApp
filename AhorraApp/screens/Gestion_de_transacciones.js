import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, StyleSheet, Button, TextInput, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { Feather } from "@expo/vector-icons";

export default function Gestion_de_transaccioness({ navigation }) {
  const [filtro, setFiltro] = useState('Todos');
  const [searchText, setSearchText] = useState('');

  const datos = [
    { id: '1', categoria: 'Mascotas', monto: -500, fecha: '27 / Sept / 2025', tipo: 'Gasto' },
    { id: '2', categoria: 'Wifi', monto: -380, fecha: '27 / Sept / 2025', tipo: 'Gasto' },
    { id: '3', categoria: 'Devolución compra', monto: 580, fecha: '27 / Sept / 2025', tipo: 'Ingreso' },
    { id: '4', categoria: 'Compra', monto: -180, fecha: '25 / Sept / 2025', tipo: 'Gasto' },
    { id: '5', categoria: 'Alimentos', monto: -180, fecha: '25 / Sept / 2025', tipo: 'Gasto' },
  ];

  const prepararDatos = () => {
    let datosFiltrados = filtro === 'Todos' 
      ? datos 
      : datos.filter(item => item.tipo === filtro);

    const busquedaLimpia = searchText.trim().toLowerCase();
    if (busquedaLimpia.length > 0) {
      datosFiltrados = datosFiltrados.filter(item => 
        item.categoria.toLowerCase().includes(busquedaLimpia)
      );
    }

    const grupos = {};
    datosFiltrados.forEach(item => {
      const claveFecha = item.fecha;
      if (!grupos[claveFecha]) {
        grupos[claveFecha] = [];
      }
      grupos[claveFecha].push(item);
    });

    return Object.keys(grupos).map(fecha => ({
      title: fecha,
      data: grupos[fecha],
    }));
  };

  const handleEditar = (categoria) => {
    Alert.alert("Editar", `Editar transacción de: ${categoria}`);
  };

  const handleEliminar = (categoria) => {
    Alert.alert("Eliminar", `¿Eliminar transacción de: ${categoria}?`);
  };

  const handleAgregar = () => {
    Alert.alert("Agregar", "Ir a la pantalla de añadir nueva transacción.");
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
        <Text style={[styles.monto, { color: item.monto > 0 ? '#09a466ff' : '#bc0f03ff' }]}>
          ${item.monto}
        </Text>
      </View>

      <View style={styles.contBotonesItem}>
        <Button color='green' title='Edit' onPress={() => handleEditar(item.categoria)} />
        <View style={{width: 10}}/>
        <Button color='#971108' title='Elim' onPress={() => handleEliminar(item.categoria)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
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
            value={searchText}
            onChangeText={setSearchText}
          />
          <Feather name="mic" size={20} color="#999" />
        </View>

        {/* AQUÍ ESTÁ EL CAMBIO: Borré el View con 'gap' y dejé solo la campana */}
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <Feather name="bell" size={26} color="#33604E" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.tabs}>
          {['Todos', 'Ingreso', 'Gasto'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, filtro === tab && styles.tabActivo]}
              onPress={() => setFiltro(tab)}>
              <Text style={[styles.tabTexto, filtro === tab && styles.tabTextoActivo]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
            <Feather name="plus-circle" size={18} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Agregar Transacción</Text>
        </TouchableOpacity>
        
        <SectionList
          style={styles.lista}
          sections={prepararDatos()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.fechaTitulo}>{title}</Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    height: '100%',
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33604E', 
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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