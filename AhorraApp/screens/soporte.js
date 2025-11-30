import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Soporte({navigation}) {

  const handleContacto = () => {
    Alert.alert("Contactar a Soporte", "Aquí se abriría el cliente de correo o un chat.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#33604E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Soporte y Ayuda</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Preguntas Frecuentes (FAQ)</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>¿Cómo agrego una transacción?</Text>
              <Text style={styles.faqAnswer}>Ve a la pestaña "Transacciones" y pulsa el botón de "+".</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>¿Es segura mi información?</Text>
              <Text style={styles.faqAnswer}>Sí, toda tu información está encriptada y segura.</Text>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>¿Necesitas más ayuda?</Text>
            <Text style={styles.faqAnswer}>Si no encuentras una respuesta, contáctanos.</Text>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleContacto}>
              <Feather name="mail" size={24} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Contactar a Soporte</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, backgroundColor: "#FFFFFF", paddingBottom: 15,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    borderBottomWidth: 1, borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  formContainer: { padding: 20, gap: 20, paddingBottom: 40 },
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 12, padding: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
    gap: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  faqItem: {
    gap: 4,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '500',
    color: '#33604E',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 5 },
  saveButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#33604E", paddingVertical: 16, borderRadius: 12,
    gap: 10, marginTop: 10,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});