import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { manipulateAsync } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [width, setWidth] = useState('2160');
  const [height, setHeight] = useState('3840');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      const resizedPhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: parseInt(width), height: parseInt(height) } }], // resize to width of 300 and preserve aspect ratio 
        { compress: 1, format: 'jpeg' },
       );

      const { uri } = resizedPhoto;
      uploadPhoto(uri);
    }
  };

  const uploadPhoto = async (uri) => {
    const fileUri = uri//.replace('file://', ''); //Uncoment for IOS
    const apiUrl = 'http://localhost:9000/upload'; // Endpoint uri
  
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'filename.jpg',
      });
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        console.log('Photo uploaded successfully!');
      } else {
        console.log('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Width"
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 20,
    marginTop: 40,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;


