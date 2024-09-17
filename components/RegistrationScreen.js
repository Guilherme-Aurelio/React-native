import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../config';
const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch(`${config.backendUrl}/api/usuarios/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
          confirmarSenha: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login'); // Navega para a tela de login após o cadastro bem-sucedido
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o usuário.');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.headerText}>Criar conta</Text>
          <Text style={styles.welcomeText}>Crie uma conta para poder explorar todo o aplicativo</Text>
        </View>
        <View style={styles.form}>
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccountText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 40,
      justifyContent: 'center',
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
    form: {
      marginBottom: 30,
    }
  });

export default RegistrationScreen;
