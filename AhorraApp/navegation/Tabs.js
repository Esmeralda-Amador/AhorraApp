// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Navegacion from './navegacion';

const Tab = createBottomTabNavigator();

// Cada tab tendrá su propio stack interno con Navegacion
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#33604E",
        tabBarInactiveTintColor: "#999",
      }}
    >
      {/* TAB 1: INICIO */}
      <Tab.Screen 
        name="InicioTab" 
        children={() => <Navegacion initialScreen="Gestion_de_transacciones" />}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      {/* TAB 2: GRAFICAS */}
      <Tab.Screen 
        name="GraficasTab"
        children={() => <Navegacion initialScreen="Graficas" />}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />

      {/* TAB 3: METAS */}
      <Tab.Screen 
        name="MetasTab"
        children={() => <Navegacion initialScreen="Metas" />}
        options={{
          tabBarLabel: 'Metas',
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
