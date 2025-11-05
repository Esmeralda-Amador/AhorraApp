
// Importacion de hooks y componentes de React Native
import {
  useState,
} from "react"
import {View,Text,TextInput,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,StatusBar,Alert,Platform} from "react-native"
import { Feather } from "@expo/vector-icons"

// Componente principal
export default function CrearMeta() {
  // Estados para los campos del formulario
  const [nombreMeta, setNombreMeta] = useState("")
  const [montoObjetivo, setMontoObjetivo] = useState("")

  // Función para manejar el guardado de la meta y mostrar una alerta
  const handleGuardarMeta = () => {
    if (nombreMeta.trim() && montoObjetivo.trim()) {
      // --- 1. ALERTA DE ÉXITO ---
      // Esta es la alerta que solicitaste. ¡Ya estaba aquí!
      Alert.alert("¡Éxito!", "Meta creada correctamente", [ // <--- ¡AQUÍ ESTÁ!
        {
          text: "OK",
          onPress: () => {
            // Limpia los campos después de presionar OK
            setNombreMeta("")
            setMontoObjetivo("")
          },
        },
      ])
    } else {
      Alert.alert("Error", "Por favor completa todos los campos", [{ text: "OK" }])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header con navegacion */}
        <View style={styles.header}>
          {/* ... (El contenido del header sigue igual) ... */}
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#33604E" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#999" />
            <TextInput
              placeholder="Buscar"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            <Feather name="mic" size={18} color="#999" />
          </View>

          <TouchableOpacity>
            <Feather name="bell" size={24} color="#33604E" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="settings" size={24} color="#33604E" />
          </TouchableOpacity>
        </View>

        {/* ... (El resto de tu JSX sigue igual) ... */}

        {/* Formulario de inputs */}
        <View style={styles.formContainer}>
          {/* Input nombre de meta */}
          <View style={styles.inputCard}>
            <Feather name="edit-2" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre de meta (ej. Viaje a Japán)"
              placeholderTextColor="#999"
              value={nombreMeta}
              onChangeText={setNombreMeta}
            />
          </View>

          {/* Input monto objetivo */}
          <View style={styles.inputCard}>
            <Feather name="dollar-sign" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Monto objetivo (ej. 5,000 USD)"
              placeholderTextColor="#999"
              value={montoObjetivo}
              onChangeText={setMontoObjetivo}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Boton guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleGuardarMeta}>
          <Feather name="plus-circle" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Guardar nueva meta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de navegacion inferior */}
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
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },

  // Estilos del header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    gap: 12,
    // <--- 2. AJUSTAMOS EL PADDING DEL HEADER ---
    // paddingVertical: 15, // <--- ELIMINAMOS ESTA LÍNEA
    paddingBottom: 15, // <--- Mantenemos el padding inferior
    // Añadimos el padding superior + la altura de la barra de estado (solo en Android)
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
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

  // ... (Todos los demás estilos de titleContainer, createButton, etc., siguen igual) ...
  titleContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  formContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 30,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33604E",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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