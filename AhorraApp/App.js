import 'react-native-gesture-handler'; // IMPORTANTE: Debe ser la primera línea
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importamos el Drawer
import { Feather } from '@expo/vector-icons';

// --- TUS PANTALLAS ---
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import OlvidarPassword from './screens/OlvidarContrasena'; // Ajusta si el nombre es diferente
import CerrandoSesion from './screens/CerrandoSesion';

// Pantallas Principales
import PanelPrincipal from './screens/PanelPrincipal';
import Metas from './screens/Metas'; // Asumo que ya tienes el archivo Metas.js
import Perfil from './screens/Perfil';
import Configuracion from './screens/Configuracion';
import Notificaciones from './screens/Notificaciones';
import Soporte from './screens/Soporte';
import MenuDespegable from './screens/MenuDespegable'; // Tu nuevo archivo de menú
import EditarPerfil from './screens/EditarPerfil';
import PerfilTarjetas from './screens/PerfilTarjetas';
import Gestion_de_transacciones from './screens/Gestion_de_transacciones';
import ConfigEditarContrasena from './screens/ConfigEditarContrasena';
import ConfigEditarMoneda from './screens/ConfigEditarMoneda';



// --- CREACIÓN DE NAVEGADORES ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // Creamos la instancia del Drawer

// 1. NAVEGADOR DE PESTAÑAS (TABS - Abajo)
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#33604E',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
          backgroundColor: '#ffffff',
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle';
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Transacciones') iconName = 'dollar-sign';
          else if (route.name === 'Metas') iconName = 'target';
          else if (route.name === 'Perfil') iconName = 'user';
          return <Feather name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={PanelPrincipal} />
      <Tab.Screen name="Transacciones" component={Gestion_de_transacciones} />
      <Tab.Screen name="Metas" component={Metas} />
      <Tab.Screen name="Perfil" component={Perfil} />

    </Tab.Navigator>
  );
}

// 2. NAVEGADOR LATERAL (DRAWER - Izquierda)
// Este envuelve a los Tabs.
function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuDespegable {...props} />} // Usamos tu componente personalizado
      screenOptions={{ 
        headerShown: false, // Ocultamos el header del drawer para usar el tuyo propio en cada pantalla
        drawerStyle: { width: '80%' }, // Ancho del menú lateral
        drawerType: 'front',
      }}
    >
      {/* La pantalla principal del Drawer son los Tabs */}
      <Drawer.Screen name="HomeTabs" component={AppTabs} />
    </Drawer.Navigator>
  );
}

// 3. NAVEGADOR PRINCIPAL (STACK - Global)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        
        {/* Auth */}
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="OlvidarPassword" component={OlvidarPassword} options={{ title: 'Recuperar' }} />
        <Stack.Screen name="CerrandoSesion" component={CerrandoSesion} options={{ headerShown: false }} />
        
        {/* APP PRINCIPAL (Ahora es el Drawer que contiene los Tabs) */}
        <Stack.Screen 
          name="MainApp" 
          component={MainDrawer} 
          options={{ headerShown: false }} 
        />

        {/* Pantallas secundarias (se abren encima de todo) */}
        <Stack.Screen name="Configuracion" component={Configuracion} options={{ headerShown: false }} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} options={{ headerShown: false }} />
        <Stack.Screen name="Soporte" component={Soporte} options={{ headerShown: false }} />
        <Stack.Screen name="ConfigEditarMoneda" component={ConfigEditarMoneda} options={{ headerShown: false }} />
        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfil} 
          options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} 
        />
        <Stack.Screen name="PerfilTarjetas" component={PerfilTarjetas} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}