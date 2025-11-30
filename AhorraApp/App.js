import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import OlvidarPassword from './screens/OlvidarContrasena';
import CerrandoSesion from './screens/CerrandoSesion';

import PanelPrincipal from './screens/PanelPrincipal';
import Metas from './screens/Metas';
import Perfil from './screens/Perfil';
import Configuracion from './screens/Configuracion';
import Notificaciones from './screens/Notificaciones';
import Soporte from './screens/Soporte';
import MenuDespegable from './screens/MenuDespegable';
import EditarPerfil from './screens/EditarPerfil';
import PerfilTarjetas from './screens/PerfilTarjetas';
import Gestion_de_transacciones from './screens/Gestion_de_transacciones';
import ConfigEditarContrasena from './screens/ConfigEditarContrasena';
import ConfigEditarMoneda from './screens/ConfigEditarMoneda';
import Presupuestos_Mensuales from './screens/Presupuestos_Mensuales';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
          backgroundColor: '#ffffff'
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5
        },
        tabBarIcon: ({ color }) => {
          let iconName = 'circle';
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Transacciones') iconName = 'dollar-sign';
          else if (route.name === 'Metas') iconName = 'target';
          else if (route.name === 'Perfil') iconName = 'user';
          return <Feather name={iconName} size={24} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Inicio" component={PanelPrincipal} />
      <Tab.Screen name="Transacciones" component={Gestion_de_transacciones} />
      <Tab.Screen name="Metas" component={Metas} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuDespegable {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '80%' },
        drawerType: 'front'
      }}
    >
      <Drawer.Screen name="Panel" component={PanelPrincipal} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Transacciones" component={Gestion_de_transacciones} />
      <Drawer.Screen name="Metas" component={Metas} />
      <Drawer.Screen name="Configuracion" component={Configuracion} />
      <Drawer.Screen name="Soporte" component={Soporte} />
      <Drawer.Screen name="Presupuestos" component={Presupuestos_Mensuales} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="OlvidarPassword" component={OlvidarPassword} />
        <Stack.Screen name="CerrandoSesion" component={CerrandoSesion} options={{ headerShown: false }} />

        <Stack.Screen name="MainApp" component={MainDrawer} options={{ headerShown: false }} />

        <Stack.Screen name="Configuracion" component={Configuracion} options={{ headerShown: false }} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} options={{ headerShown: false }} />
        <Stack.Screen name="Soporte" component={Soporte} options={{ headerShown: false }} />
        <Stack.Screen name="ConfigEditarMoneda" component={ConfigEditarMoneda} options={{ headerShown: false }} />
        <Stack.Screen name="ConfigEditarContrasena" component={ConfigEditarContrasena} options={{ headerShown: false }} />
        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfil} 
          options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} 
        />
        <Stack.Screen name="PerfilTarjetas" component={PerfilTarjetas} options={{ headerShown: false }} />
        <Stack.Screen name="Presupuestos_Mensuales" component={Presupuestos_Mensuales} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
