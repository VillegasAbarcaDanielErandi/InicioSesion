import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [input1, setInput1] = useState(''); // Primer campo de texto
  const [input2, setInput2] = useState(''); // Segundo campo de texto
  const [counter, setCounter] = useState(0); // Contador
  const [imageUri, setImageUri] = useState(require('./assets/nino.jpg')); // URI de la imagen por defecto

  // Función para seleccionar imagen de la galería
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permisos son requeridos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri }); // Actualiza el URI de la imagen
    } else {
      Alert.alert('No se seleccionó ninguna imagen.');
    }
  };

  // Función para tomar foto con la cámara
  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permisos son requeridos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri }); // Actualiza el URI de la imagen
    } else {
      Alert.alert('No se tomó ninguna foto.');
    }
  };

  // Función para manejar el botón de incrementar el contador
  const handlePress = () => {
    setCounter(counter + 1); // Incrementar el contador
    Alert.alert('Botón presionado'); // Alerta al presionar
  };

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    Alert.alert('Inicio de sesión exitoso :)');
  };

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.title}>Inicio de Sesión</Text>
        <TouchableOpacity onPress={pickImageFromGallery}>
          <Image source={imageUri} style={style.image} />
        </TouchableOpacity>
  
        <TouchableOpacity style={style.button2} onPress={takePhotoWithCamera}>
          <Text style={style.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>
      </View>
  
      <View style={style.subcontainer2}>
        <Text style={style.subtitle}>Nombre de usuario:</Text>
        <TextInput style={style.input} placeholder="Nombre" />
  
        <Text style={style.subtitle}>Contraseña:</Text>
        <TextInput style={style.input} placeholder="Contraseña" />
      </View>
  
      <TouchableOpacity style={style.button} onPress={() => Alert.alert('Usuario Registrado')}>
        <Text style={style.buttontext}>ACEPTAR</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  subcontainer: { marginTop: 25, marginBottom: 15, alignItems: 'center' },
  subcontainer2: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 10, width: '80%' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#4B5563', marginBottom: 5 },
  image: { width: 150, height: 150, borderRadius: 75, marginTop: 15, marginBottom: 15, borderColor: '#D1D5DB', borderWidth: 2 },
  input: { padding: 10, width: '100%', borderRadius: 5, borderColor: '#D1D5DB', color: '#111827', marginBottom: 15, borderWidth: 1, backgroundColor: '#F9FAFB' },
  button: { height: 40, width: 150, backgroundColor: '#3B82F6', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  button2: { height: 40, width: 180, backgroundColor: '#10B981', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  buttontext: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

export default App;
