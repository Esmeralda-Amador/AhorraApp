import { Text, StyleSheet, View, Button,TouchableOpacity,SafeAreaView,StatusBar,ScrollView,Platform } from 'react-native'
import React, { useState } from 'react'
import Configuracion from './Configuracion';
import InicioSesion from './InicioSesion';
import Registro from './Registro';
import Gestion_de_transacciones from './Gestion_de_transacciones';
import Graficas from './Graficas';
import MenuDespegable from './MenuDespegable';
import Metas from './Metas';
import Notificaciones from './Notificaciones';
import Perfil from './Perfil';
import Soporte from './Soporte';
import PanelPrincipal from './PanelPrincipal';
import Presupuestos_Mensuales from './Presupuestos_mensuales';




export default function MenuScreen() {

    const [screen, setScreen] = useState('menu'); /* desestructuración / / declaración del estado e inicialización del menu */

    switch (screen) {
      case 'Registro':
        return <Registro/>;
      case 'InicioSesion':
        return <InicioSesion/>;
      case 'PanelPrincipal':
        return <PanelPrincipal/>;
      case 'Graficas':
        return <Graficas/>;
      case 'Presupuestos_Mensuales':
        return <Presupuestos_Mensuales/>;
      case 'Metas':
        return <Metas/>;
      case 'Gestion_de_transacciones':
        return <Gestion_de_transacciones/>;
      case 'MenuDespegable':
        return <MenuDespegable/>;
      case 'Configuracion':
        return <Configuracion/>;
      case 'Notificaciones':
        return <Notificaciones/>;
      case 'Perfil':
        return <Perfil/>;
      case 'Soporte':
        return <Soporte/>;
            default:
                return (
                <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
                <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.texto}>Screens</Text>
                <View style={styles.botonesContainer}>
            

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Registro')}>
                <Text style={styles.buttonText}>Registro</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('InicioSesion')}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('PanelPrincipal')}>
                <Text style={styles.buttonText}>Panel Principal</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Graficas')}>
                <Text style={styles.buttonText}>Gráficas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Presupuestos_Mensuales')}>
                <Text style={styles.buttonText}>Presupuestos Mensuales</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Metas')}>
                <Text style={styles.buttonText}>Metas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Gestion_de_transacciones')}>
                <Text style={styles.buttonText}>Transacciones</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('MenuDespegable')}>
                <Text style={styles.buttonText}>Menu Despegable</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Configuracion')}>
                <Text style={styles.buttonText}>Configuración</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Notificaciones')}>
                <Text style={styles.buttonText}>Notificaciones</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Perfil')}>
                <Text style={styles.buttonText}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('Soporte')}>
                <Text style={styles.buttonText}>Soporte</Text>
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
    alignItems: 'center', //posicionamiento sobre x
    justifyContent: 'center', //posicionamiento sobre y-
    paddingTop: 40, // Espacio superior
    paddingBottom: 20,
  },
  texto: {
    color: '#33604E', // Color verde oscuro
    fontSize: 40, // Tamaño ajustado
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto', // Fuentes más seguras
    fontWeight: '700', // Un poco menos grueso que 'bold'
    marginBottom: 20, // Espacio entre el título y los botones
  },
  botonesContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12, // Espacio reducido entre botones
    width: '85%', // Ancho fijo para los botones
  },
  

  button: {
    backgroundColor: '#33604E', 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12, // Bordes redondeados
    width: '100%', // Ocupa todo el ancho del contenedor (85%)
    alignItems: 'center',
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: '600',
  },
});