//Importacion de hooks y componentes
import { Text, StyleSheet, View, Button, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';


import Configuracion from './Configuracion';
import InicioSesion from './InicioSesion';
import Registro from './Registro';
import Gestion_de_transacciones from './Gestion_de_transacciones';
import Graficas from './Graficas';
import MenuDespegable from './MenuDespegable';
import Metas from './metas';
import Notificaciones from './Notificaciones';
import Perfil from './Perfil';
import Soporte from './soporte';
import PanelPrincipal from './PanelPrincipal';
import Presupuestos_Mensuales from './Presupuestos_Mensuales';
import EditarPerfil from './EditarPerfil';

// Autenticación
import OlvidarContrasena from './OlvidarContrasena';
import CerrandoSesion from './CerrandoSesion';

// Transacciones
import TransaccionesEditar from './TransaccionesEditar';
import TransaccionesAgregar from './TransaccionesAgregar';
import TransaccionesEliminar from './TransaccionesEliminar';
import TransaccionesTodos from './TransaccionesTodos';
import TransaccionesIngresos from './TransaccionesIngresos';
import TransaccionesGastos from './TransaccionesGastos';

// Graficas
import GraficasSemana from './GraficasSemana';
import GraficasMes from './GraficasMes';
import GraficasSeisMeses from './GraficasSeisMeses';

// Presupuestos
import PresupuestosEditar from './PresupuestosEditar';
import PresupuestosAgregar from './PresupuestosAgregar';
import PresupuestosEliminar from './PresupuestosEliminar';

// Metas
import MetasEditar from './MetasEditar';
import MetasAgregar from './MetasAgregar';
import MetasEliminar from './MetasEliminar';

// Perfil
import PerfilTarjetas from './PerfilTarjetas';
import PerfilSeguridad from './PerfilSeguridad';

// Configuracion
import ConfigEditarMoneda from './ConfigEditarMoneda';
import ConfigEditarContrasena from './ConfigEditarContrasena';
import ConfigAccesosBiometricos from './ConfigAccesosBiometricos';
import ConfigModoOscuro from './ConfigModoOscuro';


export default function MenuScreen() {

    const [screen, setScreen] = useState('menu');

    switch (screen) {

        case 'Registro':
            return <Registro />;
        case 'InicioSesion':
            return <InicioSesion />;
        case 'PanelPrincipal':
            return <PanelPrincipal />;
        case 'Graficas':
            return <Graficas />;
        case 'Presupuestos_Mensuales':
            return <Presupuestos_Mensuales />;
        case 'Metas':
            return <Metas />;
        case 'Gestion_de_transacciones':
            return <Gestion_de_transacciones />;
        case 'MenuDespegable':
            return <MenuDespegable />;
        case 'Configuracion':
            return <Configuracion />;
        case 'Notificaciones':
            return <Notificaciones />;
        case 'Perfil':
            return <Perfil />;
        case 'Soporte':
            return <Soporte />;
        case 'EditarPerfil':
            return <EditarPerfil />;

        // Autenticación
        case 'OlvidarContrasena':
            return <OlvidarContrasena />;
        case 'CerrandoSesion':
            return <Cerrando Sesion />;

        // Transacciones
        case 'TransaccionesEditar':
            return <TransaccionesEditar />;
        case 'TransaccionesAgregar':
            return <TransaccionesAgregar />;
        case 'TransaccionesEliminar':
            return <TransaccionesEliminar />;
        case 'TransaccionesTodos':
            return <TransaccionesTodos />;
        case 'TransaccionesIngresos':
            return <TransaccionesIngresos />;
        case 'TransaccionesGastos':
            return <TransaccionesGastos />;

        // Graficas
      //  case 'GraficasSemana':
            //return <GraficasSemana />;
       // case 'GraficasMes':
           // return <GraficasMes />;
        //case 'GraficasSeisMeses':
          //  return <GraficasSeisMeses />;

        // Presupuestos
        case 'PresupuestosEditar':
            return <PresupuestosEditar />;
        case 'PresupuestosAgregar':
            return <PresupuestosAgregar />;
        case 'PresupuestosEliminar':
            return <PresupuestosEliminar />;

        // Metas
        case 'MetasEditar':
            return <MetasEditar />;
        case 'MetasAgregar':
            return <MetasAgregar />;
        case 'MetasEliminar':
            return <MetasEliminar />;

        // Perfil
        case 'PerfilTarjetas':
            return <PerfilTarjetas />;
        case 'PerfilSeguridad':
            return <PerfilSeguridad />;

        // Configuración
        case 'ConfigEditarMoneda':
            return <ConfigEditarMoneda />;
        case 'ConfigEditarContrasena':
            return <ConfigEditarContrasena />;
        case 'ConfigAccesosBiometricos':
            return <ConfigAccesosBiometricos />;
        case 'ConfigModoOscuro':
            return <ConfigModoOscuro />;

        default:
            return (
                <SafeAreaView style={styles.safeArea}>
                    <StatusBar barStyle="dark-content" backgroundColor="#F4F7F6" />
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.texto}>Screens Principales</Text>
                        <View style={styles.botonesContainer}>

                            {/* --- BOTONES PRINCIPALES --- */}
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Registro')}>
                                <Text style={styles.buttonText}>1. Registro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('InicioSesion')}>
                                <Text style={styles.buttonText}>2. Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PanelPrincipal')}>
                                <Text style={styles.buttonText}>3. Panel Principal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Graficas')}>
                                <Text style={styles.buttonText}>4. Gráficas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Presupuestos_Mensuales')}>
                                <Text style={styles.buttonText}>5. Presupuestos Mensuales</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Metas')}>
                                <Text style={styles.buttonText}>6. Metas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Gestion_de_transacciones')}>
                                <Text style={styles.buttonText}>7. Transacciones</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('MenuDespegable')}>
                                <Text style={styles.buttonText}>8. Menú Despegable</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Configuracion')}>
                                <Text style={styles.buttonText}>9. Configuración</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Notificaciones')}>
                                <Text style={styles.buttonText}>10. Notificaciones</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Perfil')}>
                                <Text style={styles.buttonText}>11. Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Soporte')}>
                                <Text style={styles.buttonText}>12. Soporte</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('EditarPerfil')}>
                                <Text style={styles.buttonText}>13. Editar Perfil</Text>
                            </TouchableOpacity>

                            {/* --- NUEVAS PANTALLAS --- */}
                            <View style={styles.separator} />
                            <Text style={styles.subTitulo}>Screens Extras (Agregadas)</Text>

                            <Text style={styles.grupoTitulo}>Autenticación</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('OlvidarContrasena')}>
                                <Text style={styles.buttonText}>Olvidar Contraseña</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('Cerrando Sesion')}>
                                <Text style={styles.buttonText}>Cerrar Sesión</Text>
                            </TouchableOpacity>

                            <Text style={styles.grupoTitulo}>Transacciones</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesAgregar')}>
                                <Text style={styles.buttonText}>Transacciones (Agregar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesEditar')}>
                                <Text style={styles.buttonText}>Transacciones (Editar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesEliminar')}>
                                <Text style={styles.buttonText}>Transacciones (Eliminar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesTodos')}>
                                <Text style={styles.buttonText}>Transacciones (Todos)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesIngresos')}>
                                <Text style={styles.buttonText}>Transacciones (Ingresos)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('TransaccionesGastos')}>
                                <Text style={styles.buttonText}>Transacciones (Gastos)</Text>
                            </TouchableOpacity>
{/*
                            <Text style={styles.grupoTitulo}>Gráficas</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('GraficasSemana')}>
                                <Text style={styles.buttonText}>Gráficas (Semana)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('GraficasMes')}>
                                <Text style={styles.buttonText}>Gráficas (Mes)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('GraficasSeisMeses')}>
                                <Text style={styles.buttonText}>Gráficas (6 Meses)</Text>
                            </TouchableOpacity>
*/}
                            <Text style={styles.grupoTitulo}>Presupuestos</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PresupuestosAgregar')}>
                                <Text style={styles.buttonText}>Presupuestos (Agregar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PresupuestosEditar')}>
                                <Text style={styles.buttonText}>Presupuestos (Editar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PresupuestosEliminar')}>
                                <Text style={styles.buttonText}>Presupuestos (Eliminar)</Text>
                            </TouchableOpacity>

                            <Text style={styles.grupoTitulo}>Metas</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('MetasAgregar')}>
                                <Text style={styles.buttonText}>Metas (Agregar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('MetasEditar')}>
                                <Text style={styles.buttonText}>Metas (Editar)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('MetasEliminar')}>
                                <Text style={styles.buttonText}>Metas (Eliminar)</Text>
                            </TouchableOpacity>

                            <Text style={styles.grupoTitulo}>Perfil</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PerfilTarjetas')}>
                                <Text style={styles.buttonText}>Perfil (Tarjetas y Bancos)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('PerfilSeguridad')}>
                                <Text style={styles.buttonText}>Perfil (Seguridad)</Text>
                            </TouchableOpacity>

                            <Text style={styles.grupoTitulo}>Configuración</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('ConfigEditarMoneda')}>
                                <Text style={styles.buttonText}>Config (Editar Moneda)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('ConfigEditarContrasena')}>
                                <Text style={styles.buttonText}>Config (Editar Contraseña)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('ConfigAccesosBiometricos')}>
                                <Text style={styles.buttonText}>Config (Accesos Biométricos)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setScreen('ConfigModoOscuro')}>
                                <Text style={styles.buttonText}>Config (Modo Oscuro)</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
    }
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F7F6',
    },
    container: {
        backgroundColor: '#F4F7F6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    texto: {
        color: '#33604E',
        fontSize: 40,
        fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto',
        fontWeight: '700',
        marginBottom: 20,
    },
    subTitulo: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
    separator: {
        height: 2,
        width: '90%',
        backgroundColor: '#ffffff',
        marginVertical: 20,
    },
    grupoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#33604E',
        marginTop: 15,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    botonesContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '85%',
    },
    button: {
        backgroundColor: '#33604E',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
