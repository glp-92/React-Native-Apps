import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function App() {
  const [initialCap, setInitialCap] = useState("");
  const [annualAdittion, setAnnualAdittion] = useState("");
  const [years, setYears] = useState("");
  const [interest, setInterest] = useState("");
  const [result, setResult] = useState("");
  const [chargedInterest, setChargedInterest] = useState("");

  

  useEffect(() => {
    const percentInterest = interest / 100;
    const compoundValue = initialCap * Math.pow(1 + percentInterest, years) + annualAdittion * ((Math.pow(1 + percentInterest, years) - 1) / percentInterest);
    if (isNaN(compoundValue)) {
      return;
    }
    const totalInterest = compoundValue - initialCap - (years * annualAdittion);;
    console.log(totalInterest);
    setResult(compoundValue.toFixed(2));
    setChargedInterest(totalInterest.toFixed(2));
  }, [initialCap, annualAdittion, years, interest])
  

  const numberConstraintHandler = (text) => {
    // Elimina todos los caracteres que no sean números usando una expresión regular
    return text.replace(/[^0-9]/g, '');
  };

  const resetInputValues = () => {
    setInitialCap("");
    setAnnualAdittion("");
    setYears("");
    setInterest("");
    setResult("");
    setChargedInterest("");
  }


  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Calculadora Interés Compuesto</Text>
      <View style = {styles.section}>
      <Text style = {styles.sectionTitle}>Datos de entrada</Text>
        <View style = {styles.inputContainer}>
          <Text style={{...styles.label, width: '30%'}}>Capital inicial €</Text>
          <TextInput
            style={{...styles.input, width: '60%'}}
            onChangeText={(text) => {
              setInitialCap(numberConstraintHandler(text));
            }}
            value={initialCap}
            keyboardType='numeric'
            maxLength={10}
          />
        </View>
        <View style = {styles.inputContainer}>
          <Text style={{...styles.label, width: '30%'}}>Adición anual €</Text>
          <TextInput
            style={{...styles.input, width: '60%'}}
            onChangeText={(text) => {
              setAnnualAdittion(numberConstraintHandler(text));
            }}
            value={annualAdittion}
            keyboardType='numeric'
            maxLength={10}
          />
        </View>
        <View style = {styles.inputContainer}>
          <Text style={{...styles.label, width: '25%'}}>Años</Text>
          <TextInput
            style={{...styles.input, width: '20%'}}
            onChangeText={(text) => {
              setYears(numberConstraintHandler(text));
            }}
            value={years}
            keyboardType='numeric'
            maxLength={2}
          />
          <Text style={{...styles.label, width: '25%'}}>Interés anual %</Text>
          <TextInput
            style={{...styles.input, width: '20%'}}
            onChangeText={(text) => {
              setInterest(numberConstraintHandler(text));
            }}
            value={interest}
            keyboardType='numeric'
            maxLength={2}
          />
        </View>
        <TouchableOpacity style={styles.trashButton} title="Añadir" onPress={resetInputValues}>
          <FontAwesome name="trash" size={15} color="black" style={styles.trash} />
        </TouchableOpacity>
      </View>
      <View style = {styles.section}>
        <Text style = {styles.sectionTitle}>Resultados</Text>
        <View style = {styles.outputContainer}>
          <Text style={{...styles.label, width: '30%'}}>Resultado</Text>
          <View style ={{...styles.customCenterLabel, width: '50%'}}>
            <Text style={styles.labelResult}>{result}</Text>
          </View>
          <Text style={styles.labelBold}>€</Text>
        </View>
        <View style = {styles.outputContainer}>
          <Text style={{...styles.label, width: '30%'}}>Interés obtenido</Text>
          <View style ={{...styles.customCenterLabel, width: '50%'}}>
            <Text style={styles.labelResult}>{chargedInterest}</Text>
          </View>
          <Text style={styles.labelBold}>€</Text>
        </View>
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
    padding: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#1A237E',
    fontSize: 14,
  },
  label: {
    padding: 10,
    fontSize: 14,
  },
  outputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customCenterLabel: {
    flex: 2,
    height: 40,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
  },
  labelResult: {
    color: '#1A237E',
    fontSize: 14,
  },
  labelBold: {
    flex: 0.5,
  },
  section : {
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(150, 150, 255, 0.7)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  trashButton: {
    margin: 10,
    height: 40,
    backgroundColor: 'rgba(180, 180, 180, 0.4)',
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trash: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
});
