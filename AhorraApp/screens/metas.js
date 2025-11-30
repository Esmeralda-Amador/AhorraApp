import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Metas({ navigation }) {
    
    // Funciones de acción
    const handleEditarMeta = (metaId) => {
        console.log(`Editando meta con ID: ${metaId}`);
        // Redirigir a la pantalla de edición, pasando el ID de la meta
        navigation.navigate('MetasEditar', { metaId });
    };

    const handleEliminarMeta = (metaId) => {
        console.log(`Eliminando meta con ID: ${metaId}`);
        // Implementar aquí la lógica de confirmación (usando un Modal personalizado, no Alert)
        // Por ahora, solo simularé la acción con console.log.
    };
    
    // Datos de Metas (para simular y poder mapear)
    const metasData = [
        { id: 1, nombre: 'Celular nuevo', actual: 6000, total: 9000, progreso: 67, icon: 'smartphone' },
        { id: 2, nombre: 'Pc nueva', actual: 15000, total: 30000, progreso: 50, icon: 'monitor' },
        { id: 3, nombre: 'Carro', actual: 300000, total: 300000, progreso: 100, icon: 'dollar-sign', achieved: true },
    ];


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* --- HEADER IDÉNTICO AL PANEL --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
           <Feather name="menu" size={28} color="#33604E" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999"  style={{marginRight: 8}} />
          <TextInput
            placeholder="Buscar por categoría..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <Feather name="mic" size={20} color="#999"  />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Feather name="bell" size={26} color="#33604E" />
        </TouchableOpacity>
      </View>
      {/* -------------------------------- */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Mis Metas</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Navegar a Agregar Meta')}>
            <Feather name="plus-circle" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Crear una nueva meta</Text>
        </TouchableOpacity>

        {/* --- Mapeo de Tarjetas de Metas (Dinámico) --- */}
        {metasData.map(meta => (
            <View key={meta.id} style={styles.card}>
                <View style={styles.cardRow}>
                    <View style={styles.iconBox}>
                        {meta.icon === 'dollar-sign' ? (
                            <Text style={{fontSize:20, color:'#33604E', fontWeight:'bold'}}>$</Text>
                        ) : (
                            <Feather name={meta.icon} size={24} color="#33604E" />
                        )}
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{meta.nombre}</Text>
                        <Text style={styles.cardSubtitle}>
                            {meta.actual.toLocaleString('es-MX')}/{meta.total.toLocaleString('es-MX')}
                        </Text>
                    </View>
                    <Text style={[
                            styles.percentText, 
                            { color: meta.achieved ? '#28a745' : '#17a2b8' }
                        ]}>
                            {meta.progreso}% logrado
                        </Text>
                </View>

                {/* BARRA DE PROGRESO */}
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${meta.progreso}%`, backgroundColor: meta.achieved ? '#28a745' : '#33604E' }]} />
                </View>

                <View style={styles.actionRow}>
                    
                    {/* BOTÓN EDITAR: Lápiz Verde (Funcional) */}
                    <TouchableOpacity onPress={() => handleEditarMeta(meta.id)}>
                        <Feather name="edit-2" size={20} color="#33604E" /> 
                    </TouchableOpacity>

                    {/* BOTÓN ELIMINAR: Bote de Basura Rojo (Funcional) */}
                    <TouchableOpacity onPress={() => handleEliminarMeta(meta.id)}>
                        <Feather name="trash-2" size={20} color="#DC3545" />
                    </TouchableOpacity>
                </View>
            </View>
        ))}


        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

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
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#33604E',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    gap: 8,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: '#F5F9F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  percentText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#17a2b8', // Color original, se ajusta dinámicamente
  },
  // NUEVOS ESTILOS PARA LA BARRA DE PROGRESO
  progressBar: {
    height: 8, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 8, 
    marginBottom: 10,
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginTop: 10, // Un poco de espacio entre la barra y los botones
  },
});