import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Tipo de código: ${type}\nDatos: ${data}`);
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se ha otorgado permiso para acceder a la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.layer} />
        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={handleScanAgain}
          disabled={!scanned}
        >
          <Text style={styles.scanAgainText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  layer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  scanAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
