//Importacion de hooks y componentes
import React,{useEffect,useState} from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, StatusBar, Image, ActivityIndicator, ImageBackground, Switch, TouchableOpacity, Platform, Alert } from 'react-native';
//Cargamos la imagen
const Logo= require('../assets/AhorraApp.jpg');
//componete principal de la pantalla 
export default function InicioSesion(){
    const [contraseña,setContraseña]=useState('');
    const [correo,setCorreo]=useState('');

    const mostrarAlerta = (titulo,mensaje)=>{
        if(Platform.OS==='web'){
         alert(`${titulo}\n\n${mensaje}`);
        }else{
            Alert.alert(titulo,mensaje);
        }
    };
    const enviarDatos=()=>{
       console.log('Enviaste Datos');
        if (!correo.trim()|| !contraseña.trim()) {
            mostrarAlerta('Error','Completa todos los campos para continuar');
            return;
        }
        const regexCorreo= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if() {

        }
    }
}