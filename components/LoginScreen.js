import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/api/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.userId.toString());
  
        // Verifique se as credenciais são admin
        if (email === 'admin' && password === 'admin') {
          Alert.alert('Sucesso', 'Login realizado com sucesso como admin!');
          navigation.navigate('Admin'); // Navega para a tela de administração
        } else {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigation.navigate('InscrScreen'); // Navega para a tela de inscrições para usuários normais
        }
      } else {
        Alert.alert('Erro', data.error || 'Erro ao realizar login.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o login.');
    }
  };

  return (
    <ImageBackground 
    source={require('../assets/objects.png')} 
    style={styles.container}
    resizeMode="cover" // Ajuste aqui para o redimensionamento desejado
  >
    <View style={styles.container}>
    <View>
      <Text style={styles.headerText}>Acesse aqui</Text>
      <Text style={styles.welcomeText}>Bem vindo novamente!</Text>
      </View>
      <View>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.createAccountText}>Criar uma nova conta</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
    flexdirection: 'column'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  input: {
    height: 55,
    backgroundColor: '#F1F4FF',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 15

  },
  forgotPasswordText: {
    color: '#FFA500',
    textAlign: 'right',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  createAccountText: {
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default LoginScreen;