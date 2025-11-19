import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Presupuestos_mensuales({ navigation }) {
  const budgets = [
    { id: 1, title: 'Despensa', percent: 70, used: 210, limit: 300, icon: '🛒' },
    { id: 2, title: 'Gustos', percent: 50, used: 150, limit: 300, icon: '🎁' },
    { id: 3, title: 'Salidas', percent: 100, used: 300, limit: 300, icon: '🍻' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis presupuestos</Text>

      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.createText}>+ Crear nuevo presupuesto</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {budgets.map((b) => (
          <View key={b.id} style={styles.card}>
            <Text style={styles.icon}>{b.icon}</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{b.title}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${b.percent}%` }]} />
              </View>
              <Text style={styles.percent}>{b.percent}% gastado</Text>
              <Text style={styles.amount}>{b.used}/{b.limit}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
        style={styles.bottomNav}>
        <Text style={styles.bottomText}>Ir a Notificaciones →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  createBtn: {
    backgroundColor: '#2b6b56',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  createText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { fontSize: 28 },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: { height: '100%', backgroundColor: '#2b6b56' },
  percent: { fontSize: 13, color: '#2b6b56', fontWeight: '600', marginTop: 4 },
  amount: { fontSize: 12, color: '#777' },
  bottomNav: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  bottomText: { color: '#2b6b56', fontWeight: '700' },
});
