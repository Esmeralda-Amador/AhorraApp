// Importación de dependencias necesarias
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

// Obtenemos el ancho de la pantalla para adaptar las gráficas
const screenWidth = Dimensions.get('window').width;

// Componente principal de la pantalla de gráficas
export default function Graficas() {
  const [rango, setRango] = useState('mes'); // Estado para cambiar entre semana, mes y 6 meses

  // Datos simulados para los diferentes rangos de tiempo
  const datosRango = {
    semana: {
      ingresos: 3500,
      gastos: 2100,
      barras: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        ingresos: [500, 600, 550, 650, 700, 500],
        egresos: [300, 400, 350, 450, 350, 250],
      },
    },
    mes: {
      ingresos: 12500,
      gastos: 8200,
      barras: {
        labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
        ingresos: [3000, 3200, 3400, 2900],
        egresos: [2000, 2100, 2300, 1800],
      },
    },
    '6meses': {
      ingresos: 50800,
      gastos: 30900,
      barras: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        ingresos: [1500, 1000, 1200, 1300, 1800, 2000],
        egresos: [900, 700, 850, 1000, 950, 1200],
      },
    },
  };

  // Extraemos los datos del rango actual
  const { ingresos, gastos, barras } = datosRango[rango];
  const porcentajeAhorro = Math.round(((ingresos - gastos) / ingresos) * 100);

  // Datos para la gráfica de dona
  const data = [
    { name: 'Ingresos', population: ingresos, color: '#07b60f', legendFontColor: '#333333', legendFontSize: 15 },
    { name: 'Gastos', population: gastos, color: '#33604e', legendFontColor: '#333333', legendFontSize: 15 },
  ];

  // Datos para la gráfica de barras
  const barData = {
    labels: barras.labels,
    datasets: [
      {
        data: barras.ingresos,
        color: (opacity = 1) => `rgba(46,125,50,${opacity})`, // Color de ingresos
      },
      {
        data: barras.egresos,
        color: (opacity = 1) => `rgba(198,40,40,${opacity})`, // Color de egresos
      },
    ],
    legend: ['Ingresos', 'Egresos'],
  };

  const chartSize = 220;
  const totalIngresos = barras.ingresos.reduce((a, b) => a + b, 0);
  const totalEgresos = barras.egresos.reduce((a, b) => a + b, 0);
  const flujo = barras.ingresos.map((ing, i) => ing - barras.egresos[i]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Tarjeta principal con la gráfica de dona */}
        <View style={styles.card}>
          <Text style={styles.title}>Distribución de Ingresos y Gastos</Text>

          {/* Botones para cambiar de rango */}
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

          {/* Gráfica de dona */}
          <View style={styles.chartWrapper} pointerEvents="none">
            <View style={styles.chartContainer}>
              <View style={styles.pieWrapper}>
                <PieChart
                  data={data}
                  width={chartSize}
                  height={chartSize}
                  center={[50, 0]}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  hasLegend={false}
                />
              </View>

              {/* Centro de la dona con el porcentaje */}
              <View style={styles.centerHole}>
                <Text style={styles.centerValue}>{porcentajeAhorro}%</Text>
                <Text style={styles.centerLabel}>Ahorro Neto</Text>
              </View>
            </View>
          </View>

          {/* Leyenda debajo de la dona */}
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

        {/* Gráfica de barras del flujo neto */}
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

          {/* Totales */}
          <View>
            <Text style={styles.totalTexto}>Total ingresos: ${totalIngresos}</Text>
            <Text style={styles.totalTexto}>Total gastos: ${totalEgresos}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Estilos generales del componente
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e7e7e7',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 20,
    color: '#33604e',
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  selectorBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#33604e',
    marginHorizontal: 4,
  },
  selectorBtnActivo: {
    backgroundColor: '#33604e',
  },
  selectorTexto: {
    color: '#33604e',
    fontSize: 14,
  },
  selectorTextoActivo: {
    color: '#ffffff',
    fontWeight: '600',
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
  },
  pieWrapper: {
    transform: [{ translateX: 50 }],
  },
  centerHole: {
    position: 'absolute',
    width: 120,
    height: 120,
    transform: [{ translateX: 45 }],
    borderRadius: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  centerValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#33604e',
  },
  centerLabel: {
    fontSize: 14,
    color: '#777',
  },
  legend: {
    marginTop: 20,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 15,
  },
  barContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  barChart: {
    borderRadius: 16,
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#33604e',
    marginVertical: 2,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
});
