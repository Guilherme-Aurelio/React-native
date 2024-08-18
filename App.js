import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import AdminScreen from './components/AdminScreen';
import ParticipantDetailsScreen from './components/ParticipantDetailsScreen';
import InscrScreen from './components/InscrScreen';
import MinhaInscricao from './components/MinhaInscricao';
import AcompanharInscricao from './components/AcompanharInscricao';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="ParticipantDetails"
        component={ParticipantDetailsScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="InscrScreen"
        component={InscrScreen}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="MinhaInscricao"
        component={MinhaInscricao}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
      <Stack.Screen
        name="AcompanharInscricao"
        component={AcompanharInscricao}
        options={{ headerTitle: '' }} // Remove o título, mas mantém o cabeçalho
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
