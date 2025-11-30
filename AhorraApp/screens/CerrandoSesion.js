import React, { useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from "react-native"

export default function CerrandoSesion({ navigation }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      

      navigation.reset({
        index: 0,
        routes: [{ name: 'InicioSesion' }],
      });
      
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33604E" />
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Cerrando sesión...</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#33604E",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
})