import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const RequestComponent = () => {
  const [inputText, setInputText] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const handleButtonPress = () => {
    fetch(`http://${ip}:${port}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputText }),
    })
      .then(response => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Respuesta del servidor:', response);
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.log('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={text => setIp(text)}
        placeholder="IP"
      />
      <TextInput
        style={styles.input}
        value={port}
        onChangeText={text => setPort(text)}
        placeholder="Puerto"
      />
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={text => setInputText(text)}
        placeholder="Escribe algo..."
      />
      <Button title="Enviar" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RequestComponent;