import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Para los iconos de abajo

// 1. IMPORTA TUS PANTALLAS
import InicioSesion from './screens/InicioSesion'; 
import Registro from './screens/Registro';
import OlvidarPassword from './screens/OlvidarContrasena'; // 
//import OlvidarPassword from './screens/OlvidarPassword'; // 
import PanelPrincipal from './screens/PanelPrincipal';
import Gestion_de_transacciones from './screens/Gestion_de_transacciones';
import Perfil from './screens/Perfil';  

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- NAVEGADOR DE PESTAÑAS (TABS) ---
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Panel') iconName = 'home';
          else if (route.name === 'Transacciones') iconName = 'dollar-sign';
          else if (route.name === 'Perfil') iconName = 'user';
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#33604E', // 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,       // 1. Hacemos la barra más alta para que quepan bien
          paddingBottom: 10,// 2. Separamos el texto del borde inferior del celular
          paddingTop: 10,   // 3. Separamos el icono del borde superior de la barra
        },
        tabBarLabelStyle: {
          fontSize: 12,     // Tamaño del texto
          fontWeight: '600',
          marginTop: 5,     // 4. Espacio entre el icono y el texto
        },
        // -------------------------------------

        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Panel') iconName = 'home';
          else if (route.name === 'Transacciones') iconName = 'dollar-sign';
          else if (route.name === 'Perfil') iconName = 'user';
          
          return <Feather name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Panel" component={PanelPrincipal} />
       <Tab.Screen name="Transacciones" component={Gestion_de_transacciones} /> 
      {/* <Tab.Screen name="Perfil" component={Perfil} /> */} 
    </Tab.Navigator>
  );
}

// --- NAVEGADOR PRINCIPAL (STACK) ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        
        {/* GRUPO 1: AUTENTICACIÓN */}
        <Stack.Screen 
          name="InicioSesion" 
          component={InicioSesion} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Registro" 
          component={Registro} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="OlvidarPassword" 
          component={OlvidarPassword} 
          options={{ title: 'Recuperar', headerTintColor: '#33604E' }} // Aquí sí dejamos header para poder volver atrás
        />

        {/* GRUPO 2: APLICACIÓN PRINCIPAL (CONTIENE LOS TABS) */}
        <Stack.Screen 
          name="MainApp" 
          component={AppTabs} 
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}