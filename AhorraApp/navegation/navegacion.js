// Navegacion.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pantallas principales
import PanelPrincipal from '../screens/PanelPrincipal';
import Graficas from '../screens/Graficas';
import Metas from '../screens/metas';

// Pantallas del sistema
import Gestion_de_transacciones from '../screens/Gestion_de_transacciones';
import TransaccionesAgregar from '../screens/TransaccionesAgregar';
import TransaccionesEditar from '../screens/TransaccionesEditar';
import TransaccionesEliminar from '../screens/TransaccionesEliminar';
import Configuracion from '../screens/Configuracion';
import Notificaciones from '../screens/Notificaciones';
import MenuDespegable from '../screens/MenuDespegable';

const Stack = createStackNavigator();

// Stack general para navegar entre cualquier pantalla
export default function Navegacion({ initialScreen }) {
  return (
    <Stack.Navigator initialRouteName={initialScreen}>
      
      {/* PANTALLAS PRINCIPALES */}
      <Stack.Screen 
        name="PanelPrincipal" 
        component={PanelPrincipal} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Graficas" 
        component={Graficas} 
        options={{ title: "Gráficas" }}
      />
      <Stack.Screen 
        name="Metas" 
        component={Metas} 
        options={{ title: "Metas" }}
      />

      {/* PANTALLAS SECUNDARIAS */}
      <Stack.Screen 
        name="Gestion_de_transacciones"
        component={Gestion_de_transacciones}
        options={{ title: "Transacciones" }}
      />
      <Stack.Screen 
        name="TransaccionesAgregar"
        component={TransaccionesAgregar}
        options={{ title: "Agregar Transacción" }}
      />
      <Stack.Screen 
        name="TransaccionesEditar"
        component={TransaccionesEditar}
        options={{ title: "Editar Transacción" }}
      />
      <Stack.Screen 
        name="TransaccionesEliminar"
        component={TransaccionesEliminar}
        options={{ title: "Eliminar Transacción" }}
      />
      <Stack.Screen 
        name="Configuracion"
        component={Configuracion}
        options={{ title: "Configuración" }}
      />
      <Stack.Screen 
        name="Notificaciones"
        component={Notificaciones}
        options={{ title: "Notificaciones" }}
      />
      <Stack.Screen 
        name="MenuDespegable"
        component={MenuDespegable}
        options={{ title: "Menú" }}
      />
    </Stack.Navigator>
  );
}
