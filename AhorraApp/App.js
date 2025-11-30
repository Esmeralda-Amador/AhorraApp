import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

// Importaciones de Pantallas
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
import TransaccionesEditar from './screens/TransaccionesEditar';
import TransaccionesEliminar from './screens/TransaccionesEliminar';
import TransaccionesAgregar from './screens/TransaccionesAgregar';  



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TransaccionesStack = createNativeStackNavigator();

function TransaccionesStackScreen() {
  return (
    <TransaccionesStack.Navigator>
      <TransaccionesStack.Screen
        name="Gestion_de_transacciones"
        component={Gestion_de_transacciones}
        options={{ headerShown: false }}
      />
      <TransaccionesStack.Screen
        name="TransaccionesEditar"
        component={TransaccionesEditar}
        options={{ title: 'Editar transacción', headerShown: false }}
      
      />
      <TransaccionesStack.Screen
        name="TransaccionesAgregar"
        component={TransaccionesAgregar}
         options={{ title: 'Agregar transacción' , headerShown: false }}
      />
       <TransaccionesStack.Screen
        name="TransaccionesEliminar"
        component={TransaccionesEliminar}
          options={{ title: 'Eliminar transacción' , headerShown: false }}
      />
    
    </TransaccionesStack.Navigator>


  );
}

// 1. AppTabs: Define el Navegador de Pestañas Inferiores
function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({

        headerShown: false, 
        tabBarActiveTintColor: '#33604E',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
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
      <Tab.Screen name="Inicio" component={PanelPrincipal} options={{ headerShown: false }} />
      <Tab.Screen name="Transacciones" component={TransaccionesStackScreen} />
      <Tab.Screen name="Metas" component={Metas} />
      <Tab.Screen name="Perfil" component={Perfil} /> 
    </Tab.Navigator>
  );
}

// 2. MainDrawer: Define el Navegador de Menú Lateral
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
      {/* RUTA PRINCIPAL: El AppTabs contiene Inicio, Perfil, Metas, Transacciones */}
      <Drawer.Screen 
        name="TabStack" 
        component={AppTabs} 
        // Ocultamos el título del Drawer para esta ruta principal
        options={{ title: 'Inicio', headerShown: false }}
      />

      {/* RUTAS ADICIONALES DEL DRAWER (que no están en las Tabs) */}
      <Drawer.Screen name="Panel" component={PanelPrincipal} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Transacciones" component={Gestion_de_transacciones} />
      <Drawer.Screen name="Metas" component={Metas} />
      <Drawer.Screen name="Presupuestos" component={Presupuestos_Mensuales} />
      <Drawer.Screen name="Configuracion" component={Configuracion} />
      <Drawer.Screen name="Soporte" component={Soporte} />
      
      {/* NOTA: Eliminamos las rutas duplicadas (Panel, PerfilDrawer, etc.) que causaban conflicto.
          Si quieres acceder a ellas desde el Drawer, DEBES navegar a 'TabStack' y luego a la pantalla interna.
      */}
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion" screenOptions={{ headerShown: false }}>
        {/* Rutas de Autenticación */}
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="OlvidarPassword" component={OlvidarPassword} />
        <Stack.Screen name="CerrandoSesion" component={CerrandoSesion} />

        {/* Ruta principal de la aplicación: el Drawer que contiene las Tabs */}
        <Stack.Screen name="MainApp" component={MainDrawer} />

        {/* Rutas Modales y de Detalle (sin Tabs ni Drawer) */}
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="ConfigEditarMoneda" component={ConfigEditarMoneda} />
        <Stack.Screen name="ConfigEditarContrasena" component={ConfigEditarContrasena} />
        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfil} 
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
        />
        <Stack.Screen name="PerfilTarjetas" component={PerfilTarjetas} />
        
        {/* Agregando una ruta adicional que eliminaste por error, si es necesaria */}
        <Stack.Screen name="Presupuestos_Mensuales" component={Presupuestos_Mensuales} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}