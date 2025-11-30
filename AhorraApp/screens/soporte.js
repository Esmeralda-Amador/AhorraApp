import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Soporte({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

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
              <Text style={styles.faqAnswer}>Ve a la pestaña "Transacciones" y toca el botón de "+".</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>¿Es segura mi información?</Text>
              <Text style={styles.faqAnswer}>Sí, toda tu información está encriptada y segura.</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>¿Necesitas más ayuda?</Text>

            <Text style={styles.faqAnswer}>
              Si necesitas asistencia personalizada, puedes contactar a nuestro equipo.
            </Text>

            <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(true)}>
              <Feather name="mail" size={22} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Contactar Soporte</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <Text style={styles.modalTitle}>Soporte</Text>

            <View style={styles.modalRow}>
              <Feather name="mail" size={20} color="#33604E" />
              <Text style={styles.modalText}>soporte@ahorraapp.com</Text>
            </View>

            <View style={styles.modalRow}>
              <Feather name="phone" size={20} color="#33604E" />
              <Text style={styles.modalText}>+52 442 000 0000</Text>
            </View>

            <View style={styles.modalRow}>
              <Feather name="clock" size={20} color="#33604E" />
              <Text style={styles.modalText}>Lunes a Viernes, 9:00 AM - 6:00 PM</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#E7E7E7" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  headerTitle: { fontSize: 20, fontWeight: "600", color: "#333" },

  formContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  cardTitle: { fontSize: 18, fontWeight: '600', color: '#333' },

  faqItem: { gap: 4 },
  faqQuestion: { fontSize: 15, fontWeight: '500', color: '#33604E' },
  faqAnswer: { fontSize: 14, color: '#555', lineHeight: 20 },

  separator: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 5 },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
  },

  saveButtonText: { fontSize: 16, color: "#FFFFFF", fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 25,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 14,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  modalTitle: { fontSize: 18, fontWeight: "700", color: "#33604E", textAlign: "center" },

  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  modalText: { fontSize: 15, color: "#333" },

  closeButton: {
    backgroundColor: "#33604E",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  closeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
