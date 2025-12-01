import React, { useState, useCallback, useRef } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, TextInput, Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { usuarioController } from '../controllers/UsuarioController';
import { transaccionController } from '../controllers/TransaccionController';

export default function PanelPrincipal({ navigation }) {
    
    const [saldo, setSaldo] = useState('0.00');
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    const [transaccionesRecientes, setTransaccionesRecientes] = useState([]);
    
    // USEREF: Memoria para saber si ya mostramos la alerta
    const alertaMostrada = useRef(false);

    const metas = [
        { id: 1, nombre: 'Ahorro viaje', progreso: 21, total: 5000, actual: 1200 },
        { id: 2, nombre: 'Fondo de Emergencia', progreso: 40, total: 5000, actual: 2000 },
    ];

    // --- FUNCIÓN PARA ORDENAR FECHAS (Igual que en Transacciones) ---
    const parseFecha = (fechaStr) => {
        if (!fechaStr) return new Date(0);
        const parts = fechaStr.split(' / ');
        
        if (parts.length < 3) return new Date(0);
  
        const dia = parseInt(parts[0], 10);
        const anio = parseInt(parts[2], 10);
        let mes = -1;
  
        // Intenta leer el mes si es número o texto
        if (!isNaN(parts[1])) {
            mes = parseInt(parts[1], 10) - 1; 
        } else {
            const mesTexto = parts[1].toLowerCase().trim();
            const meses = {
                'enero': 0, 'ene': 0, 'febrero': 1, 'feb': 1, 'marzo': 2, 'mar': 2,
                'abril': 3, 'abr': 3, 'mayo': 4, 'may': 4, 'junio': 5, 'jun': 5,
                'julio': 6, 'jul': 6, 'agosto': 7, 'ago': 7, 'septiembre': 8, 'sept': 8, 'sep': 8,
                'octubre': 9, 'oct': 9, 'noviembre': 10, 'nov': 10, 'diciembre': 11, 'dic': 11
            };
            mes = meses[mesTexto] !== undefined ? meses[mesTexto] : -1;
        }
  
        if (mes === -1) return new Date(0);
        return new Date(anio, mes, dia);
    };

    useFocusEffect(
        useCallback(() => {
            const cargarDatos = async () => {
                // 1. Cargar Nombre
                if (usuarioController.usuarioLogueado) {
                    setNombreUsuario(usuarioController.usuarioLogueado.nombre);
                }
                
                // 2. Cargar Saldo y Transacciones
                try {
                    await transaccionController.inicializar();
                    const saldoCalculado = await transaccionController.obtenerSaldoTotal();
                    
                    // OBTENEMOS TODAS, ORDENAMOS POR FECHA Y TOMAMOS LAS 3 PRIMERAS
                    const todas = await transaccionController.obtenerTodas();
                    todas.sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));
                    const recientes = todas.slice(0, 3);
                    
                    setSaldo(saldoCalculado);
                    setTransaccionesRecientes(recientes);

                    // --- ALERTA INTELIGENTE ---
                    if (parseFloat(saldoCalculado) < 0) {
                        if (!alertaMostrada.current) {
                            Alert.alert(
                                "⚠️ ¡Cuidado con tus finanzas!",
                                "Tus gastos han superado a tus ingresos.",
                                [
                                    { text: "Entendido", onPress: () => { alertaMostrada.current = true; } },
                                    { text: "Ver detalles", onPress: () => {
                                            alertaMostrada.current = true;
                                            navigation.navigate('Transacciones');
                                        }
                                    }
                                ]
                            );
                        }
                    } else {
                        alertaMostrada.current = false;
                    }
                    // --------------------------

                } catch (error) {
                    console.error("Error cargando panel:", error);
                }
            };
            cargarDatos();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather name="menu" size={28} color="#33604E" />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#999" style={{marginRight: 8}} />
                        <TextInput
                            placeholder="Buscar..."
                            style={styles.searchInput}
                            placeholderTextColor="#999"
                        />
                        <Feather name="mic" size={20} color="#999" />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
                        <Feather name="bell" size={26} color="#33604E" />
                    </TouchableOpacity>
                </View>

                {/* SALUDO */}
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hola,</Text>
                    <Text style={styles.nameText}>{nombreUsuario}.</Text>
                </View>

                {/* TARJETA DE SALDO */}
                <View style={[styles.balanceCard, parseFloat(saldo) < 0 && styles.balanceCardNegative]}>
                    <View style={styles.balanceRow}>
                        <View>
                            <Text style={styles.balanceLabel}>Saldo Disponible</Text>
                            <Text style={styles.balanceAmount}>${saldo}</Text>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.iconCircle}
                            onPress={() => navigation.navigate('Transacciones', {
                                screen: 'TransaccionesAgregar',
                                params: { tipoInicial: 'Ingreso' }
                            })}
                        >
                             <Feather name="plus" size={24} color={parseFloat(saldo) < 0 ? "#C62828" : "#33604E"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* MOVIMIENTOS RECIENTES */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Movimientos recientes</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Transacciones')}>
                            <Text style={styles.linkText}>Ver todos</Text>
                        </TouchableOpacity>
                    </View>

                    {transaccionesRecientes.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Feather name="activity" size={24} color="#CCC" />
                            <Text style={styles.emptyText}>Aún no tienes movimientos.</Text>
                        </View>
                    ) : (
                        transaccionesRecientes.map(tr => (
                            <View key={tr.id} style={styles.transCard}>
                                <View style={styles.transIconBox}>
                                    <Feather 
                                        name={tr.tipo === 'Gasto' ? 'arrow-down-right' : 'arrow-up-right'} 
                                        size={20} 
                                        color={tr.tipo === 'Gasto' ? '#D32F2F' : '#33604E'} 
                                    />
                                </View>
                                <View style={{flex: 1, paddingHorizontal: 10}}>
                                    <Text style={styles.transName}>{tr.categoria}</Text>
                                    <Text style={styles.transDate}>{tr.fecha}</Text>
                                </View>
                                <Text style={[
                                    styles.transAmount, 
                                    { color: tr.tipo === 'Ingreso' ? '#33604E' : '#D32F2F' }
                                ]}>
                                    {tr.tipo === 'Gasto' ? '-' : '+'}${Math.abs(tr.monto)}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                {/* METAS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mis Metas</Text>
                    {metas.map(meta => (
                        <View key={meta.id} style={styles.metaCard}>
                            <View style={styles.metaInfo}>
                                <Text style={styles.metaName}>{meta.nombre}</Text>
                                <Text style={styles.metaProgress}>${meta.actual} / ${meta.total}</Text>
                            </View>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: `${meta.progreso}%` }]} />
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollView: { flex: 1 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: STATUS_BAR_HEIGHT + 20,
        paddingBottom: 10,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    searchInput: { flex: 1, fontSize: 14, color: '#333', height: '100%' },

    greetingContainer: {
        paddingHorizontal: 25,
        paddingTop: 10,
        marginBottom: 20,
    },
    greetingText: { 
        fontSize: 18, 
        color: '#666', 
        fontWeight: '400' 
    },
    nameText: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#222',
        marginTop: -5, 
    },

    balanceCard: {
        backgroundColor: '#33604E',
        marginHorizontal: 20,
        marginBottom: 25,
        padding: 25,
        borderRadius: 24,
        shadowColor: '#33604E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    balanceCardNegative: {
        backgroundColor: '#C62828', // Rojo si hay deuda
        shadowColor: '#C62828',
    },
    balanceRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    balanceLabel: { 
        fontSize: 14, 
        color: 'rgba(255,255,255,0.8)', 
        marginBottom: 5, 
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    balanceAmount: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#FFFFFF' 
    },
    iconCircle: {
        backgroundColor: '#FFFFFF',
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    section: { marginHorizontal: 20, marginBottom: 25 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
    linkText: { color: '#33604E', fontWeight: '600', fontSize: 14 },

    transCard: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 16, 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    transIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transName: { fontSize: 16, fontWeight: '600', color: '#333' },
    transDate: { fontSize: 12, color: '#999', marginTop: 2 },
    transAmount: { fontSize: 16, fontWeight: 'bold' },
    
    emptyState: { alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderRadius: 16 },
    emptyText: { color: '#999', marginTop: 10 },

    metaCard: { 
        backgroundColor: '#fff', padding: 15, borderRadius: 16, marginBottom: 12, elevation: 1 
    },
    metaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    metaName: { fontSize: 14, fontWeight: '600', color: '#555' },
    metaProgress: { fontSize: 13, color: '#888', fontWeight: '500' },
    progressBar: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 8 },
    progressFill: { height: '100%', backgroundColor: '#33604E', borderRadius: 8 },
});