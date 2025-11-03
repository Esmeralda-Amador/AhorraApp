// Importa React y los hooks que se van a usar: useEffect (para manejar efectos) y useState (para manejar estados)
import React, { useEffect, useState } from 'react';

// Se importan los componentes básicos de React Native que se usarán en la interfaz
import { View, Text, TextInput, SafeAreaView, StyleSheet, StatusBar, Image, ActivityIndicator, ImageBackground, Switch, TouchableOpacity, Platform, Alert } from 'react-native';

// Se carga la imagen del logo desde la carpeta de assets
const Logo = require('../assets/AhorraApp.jpg');

// Se define el componente principal de la pantalla
export default function Registro() {

  // Se crean los estados que guardan la información del usuario y del estado de carga
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // Este efecto simula una pantalla de carga (splash) por 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Función para mostrar alertas de error o confirmación dependiendo de la plataforma
  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  // Función que valida los campos del formulario antes de enviar los datos
  const enviarDatos = () => {
    console.log('Enviaste Datos');

    // Revisa que ningún campo esté vacío
    if (!nombre.trim() || !correo.trim() || !contraseña.trim() || !confirmarContraseña.trim()) {
      mostrarAlerta('Error', 'Completa todos los campos para continuar.');
      return;
    }

    // Verifica que el correo tenga un formato válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mostrarAlerta('Correo no válido');
      return;
    }

    // La contraseña debe tener mínimo 6 caracteres
    if (contraseña.length < 6) {
      mostrarAlerta('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Comprueba que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
      mostrarAlerta('Las contraseñas no coinciden.');
      return;
    }

    // Valida que el usuario haya aceptado los términos
    if (!aceptaTerminos) {
      mostrarAlerta('Por favor, acepta términos y condiciones');
      return;
    }

    // Si todo está bien, muestra el mensaje de éxito
    mostrarAlerta('Registro Exitoso',`Nombre: ${nombre}\nEmail: ${correo}`);

    // Limpia el formulario para dejarlo listo para otro registro
    setNombre('');
    setCorreo('');
    setContraseña('');
    setConfirmarContraseña('');
    setAceptaTerminos(false);
  };

  // Si aún está cargando, se muestra la pantalla splash
  if (isLoading) {
    return (
      <View style={[styles.contenedorGeneral, { backgroundColor: '#33604E' }]}>
        <StatusBar barStyle="light-content" />
        <Image source={Logo} style={styles.logoSplashImagen} resizeMode="contain" />
        <ActivityIndicator size="large" color="#FFFFFF" /> {/*ActivityIndicator es un componente que nos ayuda a generar un efecto de carga */}
        <Text style={styles.textoCargando}>Cargando..</Text>
      </View>
    );
  }

  // Si ya terminó de cargar, se muestra el formulario de registro
  return (
    <View style={[styles.contenedorGeneral, { backgroundColor: '#33604E' }]}> {/*Array de estilos que permite combinar estilos(primero el contenedor y despues el otro*/}
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.areaSegura}>
        <View style={styles.cardRegistro}>

          {/* Logo y título de la app */}
          <Image source={Logo} style={styles.logoImagen} resizeMode="contain" />
          <Text style={styles.appNombreCard}>Ahorra+ App</Text>
          <Text style={styles.tituloRegistro} color='#33604E'>Registro</Text>

          {/* Campo para el nombre */}
          <TextInput
            style={styles.inputCard} //tarjeta blanca de el registro
            placeholder="Ingresa tu nombre completo"
            placeholderTextColor="#808080"
            value={nombre}
            onChangeText={setNombre}
          />

          {/* Campo para el correo */}
          <TextInput
            style={styles.inputCard}
            placeholder="Ingresa tu correo"
            placeholderTextColor="#808080"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          {/* Campo para la contraseña */}
          <TextInput
            style={styles.inputCard}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#808080"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />

          {/* Campo para confirmar la contraseña */}
          <TextInput
            style={styles.inputCard}
            placeholder="Confirma tu contraseña"
            placeholderTextColor="#808080"
            value={confirmarContraseña}
            onChangeText={setConfirmarContraseña}
            secureTextEntry
          />

          {/* Switch para aceptar términos y condiciones */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchTexto}>Acepto términos y condiciones</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#33604E' }}//Define el color de la pista del switch (el fondo detrás del círculo).
              thumbColor={aceptaTerminos ? '#33604E' : '#f4f3f4'}//Define el color del “círculo” que se desliza.
              value={aceptaTerminos}//Estado del switch
              onValueChange={setAceptaTerminos}
            />
          </View>

          {/* Botón de registro */}
          <TouchableOpacity style={styles.botonCard} onPress={enviarDatos}>
            <Text style={styles.botonTextoCard}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Estilos de toda la interfaz
const styles = StyleSheet.create({
  contenedorGeneral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  areaSegura: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSplashImagen: {
    width: 130,
    height: 130,
    marginBottom: 20,
    borderRadius: 75,
  },
  textoCargando: {
    marginTop: 20,
    fontSize: 18,
    textAlign:'center',
    color: '#FFFFFF',
  },
  cardRegistro: { //tarjeta de fondo blanco
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#ffffffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  logoImagen: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 45,
  },
  appNombreCard: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33604E',
    marginBottom: 20,
  },
  tituloRegistro: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33604E',
    marginBottom: 25,
  },
  inputCard: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333',
    elevation: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  switchTexto: {
    color: '#333',
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  botonCard: {
    backgroundColor: '#33604E',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  botonTextoCard: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
