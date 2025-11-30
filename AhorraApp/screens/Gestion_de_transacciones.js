
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SectionList, StyleSheet, Button, TextInput, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Feather } from "@expo/vector-icons"
import MenuDespegable from './MenuDespegable';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

//
import TransaccionesAgregar from './TransaccionesAgregar';
import TransaccionesEditar from './TransaccionesEditar';
import TransaccionesEliminar from './TransaccionesEliminar';
import Configuracion from './Configuracion';
import Notificaciones from './Notificaciones';


const Stack = createStackNavigator();
function botones() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name="GestionTransacciones" 
          component={Gestion_de_transacciones}
          options={{ title: "Transacciones" }}
        />

        <Stack.Screen 
          name="TransaccionesAgregar" 
          component={TransaccionesAgregar}
          options={{ title: "Agregar Transacción" }}
        />

        <Stack.Screen
        name="Configuracion"
        component={Configuracion}
        options={{title: "settings"}}
        />

        <Stack.Screen
        name= "Notificaciones"
        component={Notificaciones}
        options={{title: "bell"}}
        />

        <Stack.Screen
        name="MenuDespegable"
        component={MenuDespegable}
        options={{title: "Menu"}}
        />

        <Stack.Screen 
          name="TransaccionesEditar" 
          component={TransaccionesEditar}
          options={{ title: "Editar Transacción" }}
        />

        <Stack.Screen 
          name="TransaccionesEliminar" 
          component={TransaccionesEliminar}
          options={{ title: "Eliminar Transacción" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* //Función para leer desde DatabaseService
const cargarTransacciones = async () => {
  try {
    const data = await DatabaseService.getAll();
    setTransacciones(data);
  } catch (error) {
    console.log("Error al cargar datos:", error);
  }
};
 */
export function Gestion_de_transacciones ({ navigation }) {
  const [filtro, setFiltro] = useState('Todos');
  const [searchText, setSearchText] = useState('');
const[transacciones, setTransacciones] = useState([]);



  const cargarTransacciones = async () => {
    try {
      const data = await DatabaseService.getAll();
      setTransacciones(data);
    } catch (error) {
      console.log("Error al cargar datos:", error);
    }

  };

    
     // ===== Cargar transacciones cada vez que la pantalla se enfoque =====
  useFocusEffect(
    useCallback(() => {
      cargarTransacciones();
    }, [])
  );

  // Transformar datos de DB → formato del SectionList
  const datos = transacciones.map(t => ({
    id: t.id.toString(),
    categoria: t.categoria,
    monto: t.monto,
    tipo: t.tipo,
    fecha: `${t.dia} / ${t.mes} / ${t.año}`,
  }));


  /* 
  const datos = [
    { id: '1', categoria: 'Mascotas', monto: -500, fecha: '27 / Sept / 2025', tipo: 'Gasto' },
    { id: '2', categoria: 'Wifi', monto: -380, fecha: '27 / Sept / 2025', tipo: 'Gasto' },
    { id: '3', categoria: 'Devolución compra', monto: 580, fecha: '27 / Sept / 2025', tipo: 'Ingreso' },
    { id: '4', categoria: 'Compra', monto: -180, fecha: '25 / Sept / 2025', tipo: 'Gasto' },
    { id: '5', categoria: 'Alimentos', monto: -180, fecha: '25 / Sept / 2025', tipo: 'Gasto' },
  ];
 */





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
        <Button color='green' title='Edit' onPress={() => navigation.navigate('TransaccionesEditar', {item})} />
        <View style={{width: 10}}/>
        <Button color='#971108' title='Elim' onPress={() => navigation.navigate('TransaccionesEliminar', {item})} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity  onPress={()=> navigation.navigate('MenuDespegable')}>
          <Feather name="menu" size={24} color="#33604E"  />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#999" />
          <TextInput 
            placeholder="Buscar por categoría..." 
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
      <View>
        <TouchableOpacity style={styles.fab} onPress={()=> navigation.navigate('TransaccionesAgregar')}>
        <Text style={styles.fabtext} >+</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 70,
    lineHeight: 38,
    fontweight: 'bold',
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



export default botones;