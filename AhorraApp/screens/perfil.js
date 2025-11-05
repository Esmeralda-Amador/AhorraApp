// Importación de componentes principales y librería de íconos
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function Perfil() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de estado transparente */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Scroll para desplazar todo el contenido */}
      <ScrollView style={styles.scrollView}>
        
        {/* Encabezado con menú, buscador, campana y ajustes */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>

          {/* Barra de búsqueda */}
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput
              placeholder="Buscar"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="settings" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* Título principal de la pantalla */}
        <Text style={styles.pageTitle}>Mi Perfil</Text>

        {/* Cuadro con información del usuario */}
        <View style={styles.cuadro}>
          <View style={styles.profileIconContainer}>
            <Feather name="user" size={40} color="#33604E" />
          </View>
          <Text style={styles.texto}>Danna Amador</Text>
          <Text style={styles.emailText}>dannaamadore@gmail.com</Text>
        </View>

        {/* Opciones principales del perfil */}
        <View style={styles.cuadro}>
          <TouchableOpacity style={styles.botones}>
            <Feather name="user" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botones}>
            <Feather name="shield" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Seguridad y privacidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botones}>
            <Feather name="credit-card" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Tarjetas y Bancos</Text>
          </TouchableOpacity>
        </View>

        {/* Más configuraciones */}
        <View style={styles.cuadro}>
          <TouchableOpacity style={styles.botones}>
            <Feather name="settings" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Configuración de App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botones}>
            <Feather name="bell" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botones}>
            <Feather name="help-circle" size={24} color="#33604E" style={styles.icon} />
            <Text style={styles.botones_texto}>Soporte y Ayuda</Text>
          </TouchableOpacity>
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

// Estilos visuales del perfil
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
    marginTop: StatusBar.currentHeight || 0, // Ajuste para el StatusBar translúcido
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#33604E",
    marginBottom: 12,
  },
  emailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cuadro: {
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  botones_texto: {
    color: "#333",
    fontWeight: "600",
    fontSize: 15,
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  icon: {
    marginRight: 16,
    width: 24,
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
