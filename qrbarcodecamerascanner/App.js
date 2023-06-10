import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodePositions, setBarcodePositions] = useState([]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data, bounds }) => {
    setScanned(true);
    setBarcodePositions([{ type, data, bounds }]);
    setTimeout(() => {
      setBarcodePositions([]);
    }, 500); // Eliminar el código después de 1 segundo (1000 ms)*/
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
        cameraProps={{ autoFocus: 'on', focusDepth: 0, focusMode: 'auto' }}
      />
      {scanned && (
        <Button
          style={styles.scanAgainButton}
          title={'Tap to Scan Again'}
          onPress={async () => {
            setScanned(false);
            setBarcodePositions([]);
          }}
        />
      )}
        <View style={styles.barcodePositions}>
        {barcodePositions.map((barcode, index) => (
          <View key={index}>
            <Text style={{ color: 'white' }}>{barcode.data}</Text>
            <View
              style={[
                styles.barcodeRect,
                {
                  width: barcode.bounds.size.width,
                  height: barcode.bounds.size.height,
                  left: barcode.bounds.origin.x,
                  top: barcode.bounds.origin.y,
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
  scanAgainButton: {
    margin: 100,
  },
  barcodePositions: {
    marginTop: 20,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  barcodeRect: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'green',
  },
});
