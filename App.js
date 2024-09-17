import React from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import AdminScreen from './components/AdminScreen';
import ParticipantDetailsScreen from './components/ParticipantDetailsScreen';
import InscrScreen from './components/InscrScreen';
import MinhaInscricao from './components/MinhaInscricao';
import AcompanharInscricao from './components/AcompanharInscricao';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Logout({ navigation }) {
  React.useEffect(() => {
    const showAlert = () => {
      Alert.alert(
        "Confirmar Logout",
        "Tem certeza que deseja sair?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Sair",
            onPress: async () => {
              // Limpa o AsyncStorage
              await AsyncStorage.clear();
              // Redireciona para a tela de Home ou Login
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }], // Redirecionar para a 'Home' ou 'Login'
              });
            }
          }
        ]
      );
    };

    showAlert();
  }, [navigation]);

  return null; // Não precisa de UI para essa tela
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home2') {
            iconName = 'home'; // Ícone da home para InscrScreen
          } else if (route.name === 'Inscrição') {
            iconName = 'person'; // Ícone de usuário para MinhaInscricao
          } else if (route.name === 'Status') {
            iconName = 'checkmark-done'; // Ícone de documento para AcompanharInscricao
          } else if (route.name === 'Sair') {
            iconName = 'log-out'; // Ícone de logout
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home2"
        component={InscrScreen}
        options={{ headerTitle: '' }}
      />
      <Tab.Screen
        name="Inscrição"
        component={MinhaInscricao}
        options={{ headerTitle: '' }}
      />
      <Tab.Screen
        name="Status"
        component={AcompanharInscricao}
        options={{ headerTitle: '' }}
      />
      <Tab.Screen
        name="Sair"
        component={Logout}
        options={{ headerTitle: '' }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="ParticipantDetails"
          component={ParticipantDetailsScreen}
          options={{ headerTitle: '' }}
        />
        {/* Navegação por Tabs apenas após o login */}
        <Stack.Screen
          name="InscrScreen"
          component={MainTabs}
          options={{ headerShown: false }}
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
