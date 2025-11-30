import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Metas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* --- HEADER IDÉNTICO AL PANEL --- */}
      <View style={styles.header}>
        {/* 1. Menú a la izquierda */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
           <Feather name="menu" size={28} color="#33604E" />
        </TouchableOpacity>

        {/* 2. Barra de Búsqueda (Con Lupa y Micrófono) */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999"  style={{marginRight: 8}} />
          <TextInput
            placeholder="Buscar por categoría..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          {/* AQUÍ ESTÁ EL MICRÓFONO QUE FALTABA */}
          <Feather name="mic" size={20} color="#999"  />
        </View>

        {/* 3. Solo Campana a la derecha (Igual que en Panel) */}
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Feather name="bell" size={26} color="#33604E" />
        </TouchableOpacity>
      </View>
      {/* -------------------------------- */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Mis Metas</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
            <Feather name="plus-circle" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Crear una nueva meta</Text>
        </TouchableOpacity>

        {/* --- TARJETAS --- */}
        <View style={styles.card}>
            <View style={styles.cardRow}>
                <View style={styles.iconBox}>
                    <Feather name="smartphone" size={24} color="#33604E" />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>Celular nuevo</Text>
                    <Text style={styles.cardSubtitle}>6,000/9,000</Text>
                </View>
                <Text style={styles.percentText}>80% logrado</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity><Feather name="edit-2" size={20} color="#666" /></TouchableOpacity>
                <TouchableOpacity><Feather name="minus-circle" size={20} color="#666" /></TouchableOpacity>
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardRow}>
                <View style={styles.iconBox}>
                    <Feather name="monitor" size={24} color="#33604E" />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>Pc nueva</Text>
                    <Text style={styles.cardSubtitle}>15,000/30,000</Text>
                </View>
                <Text style={styles.percentText}>50% logrado</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity><Feather name="edit-2" size={20} color="#666" /></TouchableOpacity>
                <TouchableOpacity><Feather name="minus-circle" size={20} color="#666" /></TouchableOpacity>
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardRow}>
                <View style={styles.iconBox}>
                    <Text style={{fontSize:20, color:'#33604E', fontWeight:'bold'}}>$</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>Carro</Text>
                    <Text style={styles.cardSubtitle}>300,000/300,000</Text>
                </View>
                <Text style={[styles.percentText, {color: '#28a745'}]}>100% logrado</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity><Feather name="edit-2" size={20} color="#666" /></TouchableOpacity>
                <TouchableOpacity><Feather name="minus-circle" size={20} color="#666" /></TouchableOpacity>
            </View>
        </View>

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
    color: '#17a2b8', 
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
});