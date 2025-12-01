import React, { useState, useCallback } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform, TextInput 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Importamos los controladores para los datos reales
import { usuarioController } from '../controllers/UsuarioController';
import { transaccionController } from '../controllers/TransaccionController';

export default function PanelPrincipal({ navigation }) {
    
    // Estados para datos dinámicos
    const [saldo, setSaldo] = useState('0.00');
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    const [transaccionesRecientes, setTransaccionesRecientes] = useState([]);
    
    // Metas (Estáticas por ahora)
    const metas = [
        { id: 1, nombre: 'Ahorro viaje', progreso: 21, total: 5000, actual: 1200 },
        { id: 2, nombre: 'Fondo de Emergencia', progreso: 40, total: 5000, actual: 2000 },
    ];

    // Cargar datos reales de la BD al enfocar la pantalla
    useFocusEffect(
        useCallback(() => {
            const cargarDatos = async () => {
                // 1. Nombre del Usuario
                if (usuarioController.usuarioLogueado) {
                    setNombreUsuario(usuarioController.usuarioLogueado.nombre);
                }
                
                // 2. Saldo y Transacciones
                try {
                    await transaccionController.inicializar();
                    const saldoCalculado = await transaccionController.obtenerSaldoTotal();
                    const recientes = await transaccionController.obtenerRecientes();
                    
                    setSaldo(saldoCalculado);
                    setTransaccionesRecientes(recientes);
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

                {/* --- HEADER ORIGINAL (CON BARRA DE BÚSQUEDA) --- */}
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

                {/* --- SALUDO DINÁMICO (SIN ÍCONO) --- */}
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hola,</Text>
                    <Text style={styles.nameText}>{nombreUsuario}.</Text>
                </View>

                {/* --- TARJETA DE SALDO PREMIUM (VERDE) --- */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceRow}>
                        <View>
                            <Text style={styles.balanceLabel}>Saldo Disponible</Text>
                            <Text style={styles.balanceAmount}>${saldo}</Text>
                        </View>
                        <View style={styles.iconCircle}>
                             <Feather name="trending-up" size={24} color="#33604E" />
                        </View>
                    </View>
                </View>

                {/* --- SECCIÓN TRANSACCIONES RECIENTES --- */}
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

                {/* --- SECCIÓN METAS --- */}
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
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    scrollView: { flex: 1 },

    // HEADER ORIGINAL RESTAURADO
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: STATUS_BAR_HEIGHT + 20,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            web: { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' },
            default: { elevation: 2, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
        }),
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

    // SALUDO LIMPIO (Sin ícono)
    greetingContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
        marginBottom: 15,
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

    // TARJETA DE SALDO PREMIUM
    balanceCard: {
        backgroundColor: '#425c51ff', // Verde Corporativo
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

    // SECCIONES
    section: { 
        marginHorizontal: 20, 
        marginBottom: 25 
    },
    sectionHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#333' 
    },
    linkText: { 
        color: '#fafafaa9', 
        fontWeight: '600', 
        fontSize: 14 
    },

    // TARJETAS DE TRANSACCIÓN
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
    transName: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: '#333' 
    },
    transDate: { 
        fontSize: 12, 
        color: '#999',
        marginTop: 2
    },
    transAmount: { 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    emptyState: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
    },
    emptyText: {
        color: '#999',
        marginTop: 10
    },

    // METAS
    metaCard: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 16, 
        marginBottom: 12,
        elevation: 1,
    },
    metaInfo: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10 
    },
    metaName: { fontSize: 14, fontWeight: '600', color: '#555' },
    metaProgress: { fontSize: 13, color: '#888', fontWeight: '500' },
    progressBar: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 8 },
    progressFill: { height: '100%', backgroundColor: '#33604E', borderRadius: 8 },
});