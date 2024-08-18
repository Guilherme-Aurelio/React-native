import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet,  TouchableOpacity,  Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const MinhaInscricao = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('Parnamirim');
  const [gender, setGender] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigation = useNavigation();
  
  const handleSave = () => {
    navigation.navigate('InscrScreen');
  };

  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover" // Ajuste aqui para o redimensionamento desejado
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Minha inscrição</Text>
          <Image style={styles.logo} source={require('../assets/logomarca.png')} />
        </View>
        <View style={styles.logoContainer}>
        </View>
        <Text style={styles.h2}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.h2}>Data de nascimento</Text>
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
        />
        <Text style={styles.h2}>Cidade</Text>
        <Picker
          selectedValue={city}
          style={styles.picker}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Parnamirim" value="Parnamirim" />
          <Picker.Item label="Natal" value="Natal" />
          <Picker.Item label="Mossoró" value="Mossoró" />
          <Picker.Item label="João Pessoa" value="João Pessoa" />
          <Picker.Item label="Campina Grande" value="Campina Grande" />
        </Picker>
        <Text style={styles.h2}>Sexo</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={() => setGender('Masculino')}>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                <View style={gender === 'Masculino' ? styles.radioButtonSelected : null} />
              </View>
              <Text style={styles.textRadio}>Masculino</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Feminino')}>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                <View style={gender === 'Feminino' ? styles.radioButtonSelected : null} />
              </View>
              <Text style={styles.textRadio}>Feminino</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <Switch
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            style={styles.switch}
          />
          <Text style={styles.textoEspaco}>Concordo com os Termos e políticas de Privacidade.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5
  },
  genderContainer: {
    flexDirection: 'column', // Empilha verticalmente
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, // Espaço entre o botão de rádio e o texto
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 60,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5
  },
  textRadio: {
    fontSize: 16,
  },
  textoEspaco: {
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F9AF0B',
    padding: 15,
    marginHorizontal: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textButton: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default MinhaInscricao;