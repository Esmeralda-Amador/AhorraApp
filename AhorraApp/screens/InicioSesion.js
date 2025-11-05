// Importacion de hooks y componentes
import { useState } from "react"
import {View,Text,TextInput,SafeAreaView,StyleSheet,StatusBar,TouchableOpacity,Platform,Alert,Image} from "react-native"
import { Feather } from "@expo/vector-icons"

// Cargamos la imagen
const Logo = require("../assets/AhorraApp.jpg")

// Componente principal de la pantalla
export default function InicioSesion() {
  const [contraseña, setContraseña] = useState("")
  const [usuario, setUsuario] = useState("")

  // Muestra una alerta según la plataforma
  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      alert(`${titulo}\n\n${mensaje}`)
    } else {
      Alert.alert(titulo, mensaje)
    }
  }

  // Verifica los datos ingresados antes de continuar
  const enviarDatos = () => {
    console.log("Enviaste Datos")

    // Validar que ambos campos estén completos
    if (!usuario.trim() || !contraseña.trim()) {
      mostrarAlerta("Error", "Completa todos los campos para continuar")
      return
    }

    // Si todo está correcto, muestra mensaje de éxito
    mostrarAlerta("Inicio de sesión exitoso", "Bienvenido...")
    console.log("Usuario:", usuario)
    console.log("Contraseña:", contraseña)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33604E" />

      <View style={styles.phoneContainer}>
        {/* Logo y nombre de la app */}
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logoSplashImagen} resizeMode="contain" />
          <Text style={styles.appName}>Ahorra App</Text>
        </View>

        {/* Título de la pantalla */}
        <Text style={styles.title}>Inicia Sesión</Text>

        {/* Campo de usuario */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor="#999"
            value={usuario}
            onChangeText={setUsuario}
          />
        </View>

        {/* Campo de contraseña */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#999"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />
        </View>

        {/* Botón principal */}
        <TouchableOpacity style={styles.button} onPress={enviarDatos}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {/* Enlace para registro */}
        <View style={styles.registerContainer}>
          <Text style={styles.text}>¿No tienes cuenta? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>

        {/* Enlace para recuperar contraseña */}
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Olvidé contraseña</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#33604E",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  phoneContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  appName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#33604E",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#33604E",
    marginBottom: 25,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  button: {
    width: "100%",
    backgroundColor: "#33604E",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  text: {
    color: "#666",
    fontSize: 14,
  },

  link: {
    color: "#33604E",
    fontWeight: "700",
    fontSize: 14,
  },

  forgotContainer: {
    marginTop: 5,
  },

  forgotText: {
    fontSize: 15,
    color: "#33604E",
    textDecorationLine: "underline",
  },

  logoSplashImagen: {
    width: 130,
    height: 130,
    marginBottom: 20,
    borderRadius: 75,
  },
})
