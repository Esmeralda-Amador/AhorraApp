import React, { useState, useEffect } from 'react';
import { View, Text,TextInput, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Platform, SectionList,  Button } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import DatabaseService from '../database/DatabaseService';
import { Feather } from '@expo/vector-icons';
import MenuDespegable from './MenuDespegable';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

const screenWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
function botones() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name="GestionTransacciones" 
          component={Gestion_de_transacciones}
          options={{ title: "Transacciones" }}
        />

        <Stack.Screen 
          name="TransaccionesAgregar" 
          component={TransaccionesAgregar}
          options={{ title: "Agregar Transacción" }}
        />

        <Stack.Screen
        name="Configuracion"
        component={Configuracion}
        options={{title: "settings"}}
        />

        <Stack.Screen
        name= "Notificaciones"
        component={Notificaciones}
        options={{title: "bell"}}
        />

        <Stack.Screen
        name="MenuDespegable"
        component={MenuDespegable}
        options={{title: "Menu"}}
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Graficas() {
  const [rango, setRango] = useState('mes'); // semana, mes, 6meses
  const [transacciones, setTransacciones] = useState([]);

  // Cargar transacciones desde la base de datos
  const cargarTransacciones = async () => {
    try {
      await DatabaseService.initialize();
      const data = await DatabaseService.getAll();
      setTransacciones(data);
    } catch (error) {
      console.log("Error cargando transacciones:", error);
    }
  };

  useEffect(() => {
    cargarTransacciones();
  }, []);

  // Filtrar transacciones por rango
  const filtrarPorRango = () => {
    const fechaActual = new Date();
    let inicio;

    if (rango === 'semana') {
      inicio = new Date(fechaActual);
      inicio.setDate(fechaActual.getDate() - 6);
    } else if (rango === 'mes') {
      inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    } else {
      // Últimos 6 meses
      inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 5, 1);
    }

    return transacciones.filter(t => {
      const fechaT = new Date(t.año, t.mes - 1, t.dia);
      return fechaT >= inicio && fechaT <= fechaActual;
    });
  };

  const transaccionesFiltradas = filtrarPorRango();

  // Calcular totales
  const ingresos = transaccionesFiltradas
    .filter(t => t.tipo === 'Ingreso')
    .reduce((acc, t) => acc + t.monto, 0);

  const gastos = transaccionesFiltradas
    .filter(t => t.tipo === 'Gasto')
    .reduce((acc, t) => acc + t.monto, 0);

  const porcentajeAhorro = ingresos ? Math.round(((ingresos - gastos) / ingresos) * 100) : 0;

  // Preparar datos para gráfica de dona
  const data = [
    { name: 'Ingresos', population: ingresos, color: '#07b60f', legendFontColor: '#333333', legendFontSize: 15 },
    { name: 'Gastos', population: gastos, color: '#33604e', legendFontColor: '#333333', legendFontSize: 15 },
  ];

  // Preparar datos para gráfica de barras
  let barras = { labels: [], ingresos: [], egresos: [] };
  if (rango === 'semana') {
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    barras.labels = dias;
    barras.ingresos = dias.map((d, i) =>
      transaccionesFiltradas
        .filter(t => t.tipo === 'Ingreso' && new Date(t.año, t.mes - 1, t.dia).getDay() === i)
        .reduce((a, b) => a + b.monto, 0)
    );
    barras.egresos = dias.map((d, i) =>
      transaccionesFiltradas
        .filter(t => t.tipo === 'Gasto' && new Date(t.año, t.mes - 1, t.dia).getDay() === i)
        .reduce((a, b) => a + b.monto, 0)
    );
  } else if (rango === 'mes') {
    const semanas = ['Sem1', 'Sem2', 'Sem3', 'Sem4'];
    barras.labels = semanas;
    barras.ingresos = semanas.map((s, i) =>
      transaccionesFiltradas
        .filter(t => t.tipo === 'Ingreso' && Math.floor((t.dia - 1) / 7) === i)
        .reduce((a, b) => a + b.monto, 0)
    );
    barras.egresos = semanas.map((s, i) =>
      transaccionesFiltradas
        .filter(t => t.tipo === 'Gasto' && Math.floor((t.dia - 1) / 7) === i)
        .reduce((a, b) => a + b.monto, 0)
    );
  } else {
    // Últimos 6 meses
    const meses = Array.from({ length: 6 }, (_, i) => {
      const fecha = new Date();
      fecha.setMonth(fecha.getMonth() - 5 + i);
      return fecha.toLocaleString('es-MX', { month: 'short' });
    });
    barras.labels = meses;
    barras.ingresos = meses.map((m, i) => {
      const mesNum = new Date().getMonth() - 5 + i;
      return transaccionesFiltradas
        .filter(t => t.tipo === 'Ingreso' && t.mes - 1 === mesNum)
        .reduce((a, b) => a + b.monto, 0);
    });
    barras.egresos = meses.map((m, i) => {
      const mesNum = new Date().getMonth() - 5 + i;
      return transaccionesFiltradas
        .filter(t => t.tipo === 'Gasto' && t.mes - 1 === mesNum)
        .reduce((a, b) => a + b.monto, 0);
    });
  }

  const chartSize = 220;
  const totalIngresos = barras.ingresos.reduce((a, b) => a + b, 0);
  const totalEgresos = barras.egresos.reduce((a, b) => a + b, 0);
  const flujo = barras.ingresos.map((ing, i) => ing - barras.egresos[i]);

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Distribución de Ingresos y Gastos</Text>
          <View style={styles.selectorContainer}>
            {['semana', 'mes', '6meses'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setRango(item)}
                activeOpacity={0.7}
                style={[styles.selectorBtn, rango === item && styles.selectorBtnActivo]}
              >
                <Text style={[styles.selectorTexto, rango === item && styles.selectorTextoActivo]}>
                  {item === 'semana' ? 'Semana' : item === 'mes' ? 'Mes' : 'Últimos 6 meses'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartWrapper} pointerEvents="none">
            <View style={styles.chartContainer}>
              <View style={styles.pieWrapper}>
                <PieChart
                  data={data}
                  width={chartSize}
                  height={chartSize}
                  center={[50, 0]}
                  chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  hasLegend={false}
                />
              </View>
              <View style={styles.centerHole}>
                <Text style={styles.centerValue}>{porcentajeAhorro}%</Text>
                <Text style={styles.centerLabel}>Ahorro Neto</Text>
              </View>
            </View>
          </View>

          <View style={styles.legend}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>
                  {item.name}: ${item.population}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.barContainer}>
          <Text style={styles.subtitle}>
            Flujo {rango === 'semana' ? 'semanal' : rango === 'mes' ? 'mensual' : 'semestral'}
          </Text>

          <BarChart
            data={{
              labels: barras.labels,
              datasets: [
                {
                  data: flujo,
                  colors: flujo.map(() => () => '#36504e'),
                },
              ],
              legend: ['Flujo Neto'],
            }}
            width={screenWidth * 0.8}
            height={220}
            yAxisLabel="$"
            fromZero
            showValuesOnTopOfBars={true}
            withCustomBarColorFromData={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            style={styles.barChart}
          />

          <View>
            <Text style={styles.totalTexto}>Total ingresos: ${totalIngresos}</Text>
            <Text style={styles.totalTexto}>Total gastos: ${totalEgresos}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    {/* Navegación inferior */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="home" size={24} color="#33604E" />
              <Text style={styles.navLabel}>Inicio</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.navItem}>
              <Feather name="bar-chart-2" size={24} color="#999" />
              <Text style={[styles.navLabel, styles.navLabelInactive]}>Estadísticas</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.navItem}>
              <Feather name="dollar-sign" size={24} color="#999" />
              <Text style={[styles.navLabel, styles.navLabelInactive]}>Metas</Text>
            </TouchableOpacity>
          </View>
  </SafeAreaView>
  );
}

// Mantener los estilos originales
const styles = StyleSheet.create({
  card: { backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0,
    height: 2 } },

  container: { flex: 1,
    padding: 16,
    backgroundColor: '#e7e7e7',
    alignItems: 'center' },

  title: { fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 20,
    color: '#33604e' },

  selectorContainer: { flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16 },

  selectorBtn: { paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#33604e',
    marginHorizontal: 4 },

  selectorBtnActivo: { backgroundColor: '#33604e' },

    selectorTexto: { color: '#33604e',
  fontSize: 14 },

  selectorTextoActivo: { color: '#ffffff',
    fontWeight: '600' },

  chartWrapper: { width: '100%',
    alignItems: 'center',
    justifyContent: 'center' },

  chartContainer: { width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center' },

  pieWrapper: { transform: [{ translateX: 50 }] },

  centerHole: { position: 'absolute',
    width: 120,
    height: 120,
    transform: [{ translateX: 45 }],
    borderRadius: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0,
    height: 2 },
    shadowOpacity: 0.2,
    elevation: 3 },

  centerValue: { fontSize: 26,
    fontWeight: 'bold',
    color: '#33604e' },

  centerLabel: { fontSize: 14,
      color: '#777' },

  legend: { marginTop: 20,
    alignItems: 'center' },

  legendItem: { flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6 },

  legendColor: { width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8 },

  legendText: { fontSize: 15 },

  barContainer: { backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0,
    height: 3 },
    shadowOpacity: 0.1,
    elevation: 4 },

  barChart: { borderRadius: 16 },

  totalTexto: { fontSize: 16,
    fontWeight: '600',
    color: '#33604e',
    marginVertical: 2,
    textAlign: 'center' },

  scrollContainer: { paddingBottom: 40,
    alignItems: 'center' },

  // Navegación inferior
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#33604E',
    fontWeight: '600',
  },
  navLabelInactive: {
    color: '#999',
    fontWeight: '400',
  },
});
