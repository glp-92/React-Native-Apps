import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [initialCap, setInitialCap] = useState();
  const [annualAdittion, setAnnualAdittion] = useState();
  const [years, setYears] = useState();
  const [interest, setInterest] = useState();

  const numberConstraintHandler = (text) => {
    // Elimina todos los caracteres que no sean números usando una expresión regular
    return text.replace(/[^0-9]/g, '');
  };


  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Datos de entrada</Text>
      <View style = {styles.inputContainer}>
        <Text style={styles.label}>Capital inicial €</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setInitialCap(numberConstraintHandler(text));
          }}
          value={initialCap}
          keyboardType='numeric'
          maxLength={10}
        />
      </View>
      <View style = {styles.inputContainer}>
        <Text style={styles.label}>Adición anual €</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setAnnualAdittion(numberConstraintHandler(text));
          }}
          value={annualAdittion}
          keyboardType='numeric'
          maxLength={10}
        />
      </View>
      <View style = {styles.inputContainer}>
        <Text style={styles.label}>Años</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setYears(numberConstraintHandler(text));
          }}
          value={years}
          keyboardType='numeric'
          maxLength={2}
        />
        <Text style={styles.label}>Interés anual %</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setInterest(numberConstraintHandler(text));
          }}
          value={interest}
          keyboardType='numeric'
          maxLength={2}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(230, 230, 255, 1)',
    paddingTop: 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  input: {
    width: '50%',
    height: 50,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#1A237E',
    fontSize: 14,
  },
  label: {
    width: '50%',
    padding: 10,
    fontSize: 14,
  },
});
