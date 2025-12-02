// Gestion_de_transacciones.js
import React, { useState, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, SectionList, StyleSheet, TextInput, 
  SafeAreaView, StatusBar, Platform, Alert,Button,
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';

export default function Gestion_de_transacciones({ navigation }) {

  const [filtro, setFiltro] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const [transacciones, setTransacciones] = useState([]);

  // === CARGAR TRANSACCIONES ===
  const load = async () => {
    try {
      const data = await DatabaseService.getAll();
      setTransacciones(data);
    } catch (e) {
      console.log("Error al cargar transacciones:", e);
    }
  };

  useFocusEffect(
    useCallback(() => { load(); }, [])
  );

  // === ELIMINAR TRANSACCIÓN ===
  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar",
      "¿Deseas eliminar esta transacción?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const ok = await DatabaseService.remove(id);
            if (ok) load();
          }
        }
      ]
    );
  };

  // === CONVERTIR DATOS A FORMATO DEL SECTIONLIST ===
  const datosPreparados = () => {
    let lista = transacciones.map(t => ({
      id: t.id,
      categoria: t.categoria,
      descripcion: t.descripcion,
      monto: t.monto,
      tipo: t.tipo,
      fecha: `${t.dia}/${t.mes}/${t.year}`
    }));

    // Filtro por tipo
    if (filtro !== 'Todos') {
      lista = lista.filter(item => item.tipo === filtro);
    }

    // Búsqueda por categoría
    if (searchText.trim().length > 0) {
      const b = searchText.toLowerCase();
      lista = lista.filter(item =>
        item.categoria.toLowerCase().includes(b)
      );
    }

    // Agrupar por fecha
    const grupos = {};
    lista.forEach(item => {
      if (!grupos[item.fecha]) grupos[item.fecha] = [];
      grupos[item.fecha].push(item);
    });

    return Object.keys(grupos).map(fecha => ({
      title: fecha,
      data: grupos[fecha]
    }));
  };

  // === ITEM DEL LISTADO ===
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
        <Text style={styles.desc}>{item.descripcion}</Text>
        <Text style={styles.monto(item.monto)}>${item.monto}</Text>
      </View>

    {/* Aquí van tus botones personalizados */}
    <View style={styles.contBotonesItem}>
      <Button 
        color='green' 
        title='Edit' 
        onPress={() => navigation.navigate('TransaccionesEditar', { id: item.id })}
      />

      <View style={{ width: 10 }} />

      <Button 
        color='#971108' 
        title='Elim' 
        onPress={() => navigation.navigate('TransaccionesEliminar', { id: item.id })}
      />
    </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ------------------ HEADER ------------------ */}
      <View style={styles.header}>
        
        <TouchableOpacity onPress={() => navigation.navigate('MenuDespegable')}>
          <Feather name="menu" size={24} color="#33604E" />
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

        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <Feather name="bell" size={24} color="#33604E" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Configuracion')}>
          <Feather name="settings" size={24} color="#33604E" />
        </TouchableOpacity>

      </View>

      {/* ------------------ TABS ------------------ */}
      <View style={styles.tabs}>
        {['Todos', 'Ingreso', 'Gasto'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, filtro === tab && styles.tabActivo]}
            onPress={() => setFiltro(tab)}
          >
            <Text style={[styles.tabTexto, filtro === tab && styles.tabTextoActivo]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ------------------ LISTA ------------------ */}
      <SectionList
        sections={datosPreparados()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.fechaTitulo}>{title}</Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* BOTÓN FLOTANTE */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('TransaccionesAgregar')}
      >
        <Text style={styles.fabtext}>+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// ===================== ESTILOS =====================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

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

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 5,
    margin: 16,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabActivo: { backgroundColor: '#36504e' },
  tabTexto: { color: '#333', fontWeight: '600' },
  tabTextoActivo: { color: '#ffffff' },

  fechaTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#36504e',
    marginTop: 20,
    marginBottom: 5,
  },

  lista: { flex: 1 },

  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2
  },

  iconoCategoria: { marginRight: 10 },

  descripcionItem: { flex: 1 },

  categoria: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  desc: { color: '#666', fontSize: 13, marginTop: 4 },

  monto: (value) => ({
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: value >= 0 ? '#07b60f' : '#d9534f'
  }),

  contBotonesItem: { flexDirection: 'row', alignItems: 'center' },

  iconBtn: { marginLeft: 10, padding: 6 },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#21f364ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabtext: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    lineHeight: 46,
  }
});
