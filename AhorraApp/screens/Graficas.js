// Graficas.js
import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import DatabaseService from '../database/DatabaseService';
import { Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function Graficas({ navigation }) {
  const [rango, setRango] = useState('mes');
  const [transacciones, setTransacciones] = useState([]);

  const cargar = async () => {
    try {
      const raw = await DatabaseService.getAll();
      setTransacciones(raw);
    } catch (e) {
      console.log("Error al cargar datos:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  // filtrar
  const filtrarPorRango = () => {
    const fechaActual = new Date();
    let inicio;
    if (rango === 'semana') {
      inicio = new Date(fechaActual);
      inicio.setDate(fechaActual.getDate() - 6);
    } else if (rango === 'mes') {
      inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    } else {
      inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 5, 1);
    }

    return transacciones.filter(t => {
      if (!t || t.year == null || t.mes == null || t.dia == null) return false;
      const fechaT = new Date(Number(t.year), Number(t.mes) - 1, Number(t.dia));
      if (isNaN(fechaT.getTime())) return false;
      return fechaT >= inicio && fechaT <= fechaActual;
    });
  };

  const transaccionesFiltradas = filtrarPorRango();

  // totales
  const ingresos = transaccionesFiltradas.filter(t => t.tipo === 'Ingreso').reduce((a,b)=> a + Number(b.monto), 0);
  const gastos = transaccionesFiltradas.filter(t => t.tipo === 'Gasto').reduce((a,b)=> a + Math.abs(Number(b.monto)), 0);
  const porcentajeAhorro = ingresos ? Math.round(((ingresos - gastos) / ingresos) * 100) : 0;

  const dataPie = [
    { name: 'Ingresos', population: ingresos, color: '#07b60f', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Gastos', population: gastos, color: '#d9534f', legendFontColor: '#333', legendFontSize: 14 },
  ];

  // barras (semestral/mes/semanal)
  let barras = { labels: [], ingresos: [], egresos: [] };

  if (rango === 'semana') {
    const dias = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    barras.labels = dias;
    barras.ingresos = dias.map((_, i) =>
      transaccionesFiltradas.filter(t => t.tipo === 'Ingreso' && new Date(t.year, t.mes - 1, t.dia).getDay() === i).reduce((a,b)=>a+Number(b.monto),0)
    );
    barras.egresos = dias.map((_, i) =>
      transaccionesFiltradas.filter(t => t.tipo === 'Gasto' && new Date(t.year, t.mes - 1, t.dia).getDay() === i).reduce((a,b)=>a+Math.abs(Number(b.monto)),0)
    );
  } else if (rango === 'mes') {
    const semanas = ['Sem1','Sem2','Sem3','Sem4'];
    barras.labels = semanas;
    barras.ingresos = semanas.map((_, i) =>
      transaccionesFiltradas.filter(t => t.tipo === 'Ingreso' && Math.floor((Number(t.dia)-1)/7) === i).reduce((a,b)=>a+Number(b.monto),0)
    );
    barras.egresos = semanas.map((_, i) =>
      transaccionesFiltradas.filter(t => t.tipo === 'Gasto' && Math.floor((Number(t.dia)-1)/7) === i).reduce((a,b)=>a+Math.abs(Number(b.monto)),0)
    );
} else {
  const hoy = new Date();

  // Crear 6 meses hacia atrás incluyendo el actual
  const mesesInfo = Array.from({ length: 6 }, (_, i) => {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - (5 - i), 1);
    return {
      label: fecha.toLocaleString("es-MX", { month: "short" }),
      month: fecha.getMonth(),
      year: fecha.getFullYear()
    };
  });

  barras.labels = mesesInfo.map(m => m.label);

  barras.ingresos = mesesInfo.map(m =>
    transaccionesFiltradas
      .filter(t =>
        t.tipo === "Ingreso" &&
        Number(t.mes) - 1 === m.month &&
        Number(t.year) === m.year
      )
      .reduce((a, b) => a + Number(b.monto), 0)
  );

  barras.egresos = mesesInfo.map(m =>
    transaccionesFiltradas
      .filter(t =>
        t.tipo === "Gasto" &&
        Number(t.mes) - 1 === m.month &&
        Number(t.year) === m.year
      )
      .reduce((a, b) => a + Math.abs(Number(b.monto)), 0)
  );
}


  const flujo = barras.ingresos.map((v,i)=> v - (barras.egresos[i]||0));
  const totalIngresos = barras.ingresos.reduce((a,b)=>a+b,0);
  const totalEgresos = barras.egresos.reduce((a,b)=>a+b,0);

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("MenuDespegable")}>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>

          <View style={{ flexDirection:'row', marginLeft:'auto' }}>
            <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
              <Feather name="bell" size={24} color="#33604E" />
            </TouchableOpacity>
            <View style={{ width: 12 }} />
            <TouchableOpacity onPress={() => navigation.navigate("Configuracion")}>
              <Feather name="settings" size={24} color="#33604E" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Distribución de Ingresos y Gastos</Text>

            <View style={styles.selectorContainer}>
              {['semana','mes','6meses'].map(item => (
                <TouchableOpacity key={item} onPress={() => setRango(item)} style={[styles.selectorBtn, rango===item && styles.selectorBtnActivo]}>
                  <Text style={[styles.selectorTexto, rango===item && styles.selectorTextoActivo]}>
                    { item==='semana' ? 'Semana' : item==='mes' ? 'Mes' : 'Últimos 6 meses' }
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {isWeb ? (
              <Text style={{ textAlign:'center', marginVertical:20 }}>Las gráficas no están disponibles en la versión web (usa Android/iOS).</Text>
            ) : (
              <>
                <View style={styles.chartWrapper}>
                  <PieChart
                    data={dataPie}
                    width={240}
                    height={240}
                    center={[55, 0]}
                    accessor="population"
                    backgroundColor="transparent"
                    chartConfig={{ color: ()=>'black' }}
                    hasLegend={false}
                  />
                  <View style={styles.centerHole}>
                    <Text style={styles.centerValue}>{porcentajeAhorro}%</Text>
                    <Text style={styles.centerLabel}>Ahorro Neto</Text>
                  </View>
                </View>

                <View style={styles.legend}>
                  {dataPie.map((it, idx) => (
                    <View key={idx} style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: it.color }]} />
                      <Text style={styles.legendText}>{it.name}: ${it.population}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.barContainer}>
                  <Text style={styles.subtitle}>
                    Flujo {rango==='semana' ? 'semanal' : rango==='mes' ? 'mensual' : 'semestral'}
                  </Text>

                  <BarChart
                    data={{ labels: barras.labels, datasets: [{ data: flujo }], legend: ['Flujo Neto'] }}
                    width={screenWidth * 0.9}
                    height={220}
                    fromZero
                    yAxisLabel="$"
                    chartConfig={{
                      backgroundColor:'#fff',
                      backgroundGradientFrom:'#fff',
                      backgroundGradientTo:'#fff',
                      decimalPlaces:0,
                      color: ()=>'#36504e',
                      labelColor: ()=>'black'
                    }}
                    style={styles.barChart}
                  />

                  <View>
                    <Text style={styles.totalTexto}>Total ingresos: ${totalIngresos}</Text>
                    <Text style={styles.totalTexto}>Total gastos: ${totalEgresos}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { 
    flexDirection:'row',
 alignItems:'center',
 padding:16,
 backgroundColor:'#fff',
 gap:12 



},

  container: {
     padding:16,
 backgroundColor:'#e7e7e7',
 flexGrow:1 },

  card: {
     backgroundColor:'#fff',
 padding:16,
 borderRadius:10,
 elevation:3 },

  title: {
     fontSize:20,
 fontWeight:'700',
 color:'#33604e',
 marginBottom:10 
},

  selectorContainer:{ 
    flexDirection:'row',
 justifyContent:'center',
 marginBottom:16 
},

  selectorBtn:{
     paddingVertical:6,
 paddingHorizontal:12,
 borderRadius:20,
 borderWidth:1,
 borderColor:'#33604e',
 marginHorizontal:4 
},

  selectorBtnActivo:{ 
    backgroundColor:'#33604e'

   },

  selectorTexto:{ 
    color:'#33604e'
   },

 selectorTextoActivo:{ 
  color:'#fff' 
},

  chartWrapper:{ 
    width: 240,
    height: 240,
    alignSelf: 'center',
    alignItems:'center',
 justifyContent:'center',
 marginVertical:16,
 },

  centerHole:{
     position:'absolute',
 width:120,
 height:120,
 borderRadius:60,
 backgroundColor:'#fff',
 alignItems:'center',
 justifyContent:'center'
 },

  centerValue:{ 
    fontSize:22,
 fontWeight:'700',
 color:'#33604e'
 },

  centerLabel:{
     color:'#777' },

  legend:{ 
    marginTop:12

   },
 legendItem:{ 
  flexDirection:'row',
 alignItems:'center',
 marginBottom:6 },
 legendColor:{ width:14,
 height:14,
 borderRadius:4,
 marginRight:8 
},
 legendText:{
   fontSize:14
   },

  barContainer:{
     marginTop:16,
 backgroundColor:'#fff',
 padding:12,
 borderRadius:12
 },

  barChart:{ 
    borderRadius:12 
  },

  totalTexto:{ 
    textAlign:'center',
 color:'#33604e',
 fontWeight:'700',
 marginTop:8
 },

  subtitle:{
     textAlign:'center',
 fontWeight:'700',
 marginBottom:8 },
  scrollContainer:{ paddingBottom:140

   }
});
