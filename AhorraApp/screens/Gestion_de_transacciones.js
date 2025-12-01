import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SectionList, StyleSheet, TextInput, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { transaccionController } from '../controllers/TransaccionController';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default function Gestion_de_transacciones({ navigation }) {
  const [filtro, setFiltro] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState(new Date());
  const [datos, setDatos] = useState([]);

  const formatMonthYear = (date) => {
      return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long' });
  };

  const goToPreviousMonth = () => {
      setFechaFiltro(prevDate => {
          const newDate = new Date(prevDate.getTime());
          newDate.setMonth(prevDate.getMonth() - 1);
          return newDate;
      });
  };

  const goToNextMonth = () => {
      setFechaFiltro(prevDate => {
          const newDate = new Date(prevDate.getTime());
          newDate.setMonth(prevDate.getMonth() + 1);
          return newDate;
      });
  };

  const parseFecha = (fechaStr) => {
      if (!fechaStr) return new Date(0);
      const parts = fechaStr.split(' / ');
      if (parts.length < 3) return new Date(0);
      const dia = parseInt(parts[0], 10);
      const anio = parseInt(parts[2], 10);
      let mes = -1;
      if (!isNaN(parts[1])) {
          mes = parseInt(parts[1], 10) - 1; 
      } else {
          const mesTexto = parts[1].toLowerCase().trim();
          const meses = { 'enero': 0, 'ene': 0, 'febrero': 1, 'feb': 1, 'marzo': 2, 'mar': 2, 'abril': 3, 'abr': 3, 'mayo': 4, 'may': 4, 'junio': 5, 'jun': 5, 'julio': 6, 'jul': 6, 'agosto': 7, 'ago': 7, 'septiembre': 8, 'sept': 8, 'sep': 8, 'octubre': 9, 'oct': 9, 'noviembre': 10, 'nov': 10, 'diciembre': 11, 'dic': 11 };
          mes = meses[mesTexto] !== undefined ? meses[mesTexto] : -1;
      }
      if (mes === -1) return new Date(0);
      return new Date(anio, mes, dia);
  };

  useFocusEffect(
    useCallback(() => {
      cargarTransacciones();
    }, [])
  );

  const cargarTransacciones = async () => {
    try {
      await transaccionController.inicializar();
      const lista = await transaccionController.obtenerTodas();
      setDatos(lista);
    } catch (error) {
      console.error(error);
    }
  };

  const prepararDatos = () => {
    let datosFiltrados = filtro === 'Todos' ? datos : datos.filter(item => item.tipo === filtro);
    const busquedaLimpia = searchText.trim().toLowerCase();
    
    if (busquedaLimpia.length > 0) {
      datosFiltrados = datosFiltrados.filter(item => item.categoria.toLowerCase().includes(busquedaLimpia));
    }
    
    const mesFiltro = fechaFiltro.getMonth();
    const anioFiltro = fechaFiltro.getFullYear();

    datosFiltrados = datosFiltrados.filter(item => {
        const fechaItem = parseFecha(item.fecha);
        return fechaItem.getMonth() === mesFiltro && fechaItem.getFullYear() === anioFiltro;
    });

    datosFiltrados.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));

    const grupos = {};
    datosFiltrados.forEach(item => {
      const claveFecha = item.fecha;
      if (!grupos[claveFecha]) grupos[claveFecha] = [];
      grupos[claveFecha].push(item);
    });

    const clavesOrdenadas = Object.keys(grupos).sort((a, b) => parseFecha(b) - parseFecha(a));

    return clavesOrdenadas.map(fecha => ({
      title: fecha,
      data: grupos[fecha],
    }));
  };

  const handleEditar = (item) => navigation.navigate('TransaccionesEditar', { transaction: item });

  const handleEliminar = (id, categoria) => {
    Alert.alert("Confirmar", `¿Eliminar ${categoria}?`, [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: async () => { await transaccionController.eliminar(id); cargarTransacciones(); } }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.iconoBox}>
        <Feather name={item.tipo === 'Ingreso' ? 'arrow-up-right' : 'arrow-down-left'} size={22} color={item.tipo === 'Ingreso' ? '#33604E' : '#D32F2F'} />
      </View>
      <View style={styles.descripcionItem}>
        <Text style={styles.categoria}>{item.categoria}</Text>
        {item.descripcion ? <Text style={styles.descripcion}>{item.descripcion}</Text> : null}
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Text style={[styles.monto, { color: item.tipo === 'Ingreso' ? '#33604E' : '#D32F2F' }]}>
          {item.tipo === 'Gasto' ? '-' : '+'}${Math.abs(item.monto)}
        </Text>
      </View>
      <View style={styles.contBotonesItem}>
        <TouchableOpacity onPress={() => handleEditar(item)} style={styles.actionBtn}>
          <Feather name="edit-2" size={18} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminar(item.id, item.categoria)} style={styles.actionBtn}>
          <Feather name="trash-2" size={18} color="#D32F2F" />
        </TouchableOpacity>
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
          <Feather name="search" size={20} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Buscar..."
            style={styles.searchInput}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <Feather name="bell" size={26} color="#33604E" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* --- SELECTOR DE MES INTUITIVO --- */}
        <View style={styles.monthSelectorContainer}>
            <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthSelectorBtn}>
                <Feather name="chevron-left" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.monthSelectorText}>
                {formatMonthYear(fechaFiltro)}
            </Text>
            
            <TouchableOpacity onPress={goToNextMonth} style={styles.monthSelectorBtn}>
                <Feather name="chevron-right" size={24} color="#333" />
            </TouchableOpacity>
        </View>
        {/* --------------------------------- */}

        <View style={styles.tabs}>
          {['Todos', 'Ingreso', 'Gasto'].map(tab => (
            <TouchableOpacity key={tab} style={[styles.tab, filtro === tab && styles.tabActivo]} onPress={() => setFiltro(tab)}>
              <Text style={[styles.tabTexto, filtro === tab && styles.tabTextoActivo]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TransaccionesAgregar')}>
          <Feather name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nueva Transacción</Text>
        </TouchableOpacity>

        <SectionList
          style={styles.lista}
          sections={prepararDatos()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerFecha}>
                <Feather name="calendar" size={14} color="#666" style={{marginRight:5}} />
                <Text style={styles.fechaTitulo}>{title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
              <View style={{alignItems:'center', marginTop: 50}}>
                  <Feather name="list" size={40} color="#ccc" />
                  <Text style={{textAlign:'center', marginTop: 10, color:'#999'}}>
                      No hay movimientos para {formatMonthYear(fechaFiltro)}.
                  </Text>
              </View>
          }
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: STATUS_BAR_HEIGHT + 20, paddingBottom: 15, backgroundColor: "#FFFFFF", elevation: 2 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 12, height: 45, marginHorizontal: 10, borderWidth: 1, borderColor: '#F0F0F0' },
  searchInput: { flex: 1, fontSize: 14, color: "#333", height: '100%' },
  
  contentContainer: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },

  // SELECTOR DE MES
  monthSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5
  },
  monthSelectorBtn: {
    padding: 10,
  },
  monthSelectorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  
  tabs: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ffffff', borderRadius: 16, padding: 5, marginBottom: 15, elevation: 1 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12 },
  tabActivo: { backgroundColor: '#33604E' },
  tabTexto: { color: '#666', fontWeight: '600' },
  tabTextoActivo: { color: '#ffffff' },

  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#33604E', borderRadius: 16, paddingVertical: 14, marginBottom: 20, elevation: 4, gap: 8 },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  
  lista: { flex: 1 },
  headerFecha: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingLeft: 5 },
  fechaTitulo: { fontSize: 14, fontWeight: 'bold', color: '#666' },

  item: { backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 16, marginBottom: 10, elevation: 2 },
  iconoBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  descripcionItem: { flex: 1, marginRight: 5 },
  categoria: { fontSize: 16, fontWeight: '600', color: '#333' },
  descripcion: { fontSize: 12, color: '#888', marginTop: 2 },
  monto: { fontSize: 16, fontWeight: 'bold' },
  contBotonesItem: { flexDirection: 'row', gap: 10 },
  actionBtn: { padding: 5, backgroundColor: '#F9F9F9', borderRadius: 8 },
});

