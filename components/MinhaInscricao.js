import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ImageBackground, Image, Alert, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
const MinhaInscricao = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('Parnamirim');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  const [gender, setGender] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // Função para obter o ID do usuário logado
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId'); // Recupera o userId do AsyncStorage
        if (id) setUserId(id); // Armazena o ID no state
      } catch (error) {
        console.error('Erro ao obter userId:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSave = async () => {
    if (!termsAccepted) {
      Alert.alert('Aviso', 'Você deve aceitar os termos para continuar.');
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não definido.');
      return;
    }

    const userData = {
      nome_completo: name,
      cpf,
      data_nascimento: birthdate,
      telefone: phone,
      rua: street,
      bairro: neighborhood,
      cidade: city,
      estado: state,
      cep,
      sexo: gender,
      nivel_escolaridade: educationLevel
    };

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('UserID:', userId);
      const response = await fetch(`${config.backendUrl}/api/usuarios/atualizar/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      console.log('Resposta da API:', response);
      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso.');
        navigation.navigate('Home2');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de rede ou servidor.');
      console.error('Erro:', error);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Minha inscrição</Text>
            <Image style={styles.logo} source={require('../assets/logomarca.png')} />
          </View>

          <Text style={styles.h2}>Nome completo</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.h2}>CPF</Text>
          <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" maxLength={11} />

          <Text style={styles.h2}>Data de nascimento</Text>
          <TextInput style={styles.input} value={birthdate} onChangeText={setBirthdate} />

          <Text style={styles.h2}>Telefone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.h2}>Rua</Text>
          <TextInput style={styles.input} value={street} onChangeText={setStreet} />

          <Text style={styles.h2}>Bairro</Text>
          <TextInput style={styles.input} value={neighborhood} onChangeText={setNeighborhood} />

          <Text style={styles.h2}>Cidade</Text>
          <Picker selectedValue={city} style={styles.picker} onValueChange={setCity}>
            <Picker.Item label="Parnamirim" value="Parnamirim" />
            <Picker.Item label="Natal" value="Natal" />
            <Picker.Item label="Mossoró" value="Mossoró" />
            <Picker.Item label="João Pessoa" value="João Pessoa" />
            <Picker.Item label="Campina Grande" value="Campina Grande" />
          </Picker>

          <Text style={styles.h2}>Estado</Text>
          <TextInput style={styles.input} value={state} onChangeText={setState} maxLength={2} />

          <Text style={styles.h2}>CEP</Text>
          <TextInput style={styles.input} value={cep} onChangeText={setCep} keyboardType="numeric" maxLength={8} />

          <Text style={styles.h2}>Sexo</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => setGender('M')}>
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButton}>
                  <View style={gender === 'M' ? styles.radioButtonSelected : null} />
                </View>
                <Text style={styles.textRadio}>Masculino</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('F')}>
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButton}>
                  <View style={gender === 'F' ? styles.radioButtonSelected : null} />
                </View>
                <Text style={styles.textRadio}>Feminino</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.h2}>Nível de Escolaridade</Text>
          <TextInput style={styles.input} value={educationLevel} onChangeText={setEducationLevel} />

          <View style={styles.checkboxContainer}>
            <Switch value={termsAccepted} onValueChange={setTermsAccepted} />
            <Text style={styles.textoEspaco}>Concordo com os Termos e políticas de Privacidade.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
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
    borderRadius: 5,
    fontSize: 16
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
    width: 250,
    height: 250,
  },
});
export default MinhaInscricao;
