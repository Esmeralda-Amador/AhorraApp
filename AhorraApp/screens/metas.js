// Importacion de hooks y componentes
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"

// Componente principal de la pantalla
export default function Metas() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de estado transparente */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10 }}
      >
        {/* Header con menú, búsqueda y notificaciones */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#999" />
            <Feather name="mic" size={18} color="#999" />
          </View>

          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="settings" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* Título de la pantalla */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mis Metas</Text>
        </View>

        {/* Botón para crear una nueva meta */}
        <TouchableOpacity style={styles.createButton}>
          <Feather name="plus-circle" size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Crear una nueva meta</Text>
        </TouchableOpacity>

        {/* Lista de metas del usuario */}
        <View style={styles.goalsContainer}>
          {/* Meta 1: Celular nuevo */}
          <View style={styles.goalCard}>
            <View style={styles.goalContent}>
              <View style={styles.goalIconContainer}>
                <Feather name="smartphone" size={24} color="#33604E" />
              </View>

              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>Celular nuevo</Text>
                <Text style={styles.goalAmount}>6,000/9,000</Text>
              </View>

              <View style={styles.goalProgress}>
                <Text style={styles.progressText}>80% logrado</Text>
              </View>
            </View>

            <View style={styles.goalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="minus-circle" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Meta 2: Pc nueva */}
          <View style={styles.goalCard}>
            <View style={styles.goalContent}>
              <View style={styles.goalIconContainer}>
                <Feather name="monitor" size={24} color="#33604E" />
              </View>

              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>Pc nueva</Text>
                <Text style={styles.goalAmount}>15,000/30,000</Text>
              </View>

              <View style={styles.goalProgress}>
                <Text style={styles.progressText}>50% logrado</Text>
              </View>
            </View>

            <View style={styles.goalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="minus-circle" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Meta 3: Carro */}
          <View style={styles.goalCard}>
            <View style={styles.goalContent}>
              <View style={styles.goalIconContainer}>
                <Feather name="dollar-sign" size={24} color="#33604E" />
              </View>

              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>Carro</Text>
                <Text style={styles.goalAmount}>300,000/300,000</Text>
              </View>

              <View style={styles.goalProgress}>
                <Text style={[styles.progressText, styles.progressComplete]}>100% logrado</Text>
              </View>
            </View>

            <View style={styles.goalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="minus-circle" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="bar-chart-2" size={24} color="#999" />
          <Text style={[styles.navLabel, styles.navLabelInactive]}>Estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="dollar-sign" size={24} color="#33604E" />
          <Text style={styles.navLabel}>Ahorros</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  goalsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 20,
  },
  goalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  goalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  goalAmount: {
    fontSize: 12,
    color: "#666",
  },
  goalProgress: {
    marginLeft: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00BFA5",
  },
  progressComplete: {
    color: "#00C853",
  },
  goalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E7E7E7",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#33604E",
    fontWeight: "600",
  },
  navLabelInactive: {
    color: "#999",
    fontWeight: "400",
  },
})
