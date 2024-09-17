import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InscrScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover" // Ajuste aqui para o redimensionamento desejado
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Quero Participar!</Text>
        <Text style={styles.subHeaderText}>Para se inscrever, basta pressionar o botão abaixo</Text>
        <Image style={styles.logo} source={require('../assets/Logo1.png')} />
        </View>
        <View style={styles.logoContainer}>
        </View>
            <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inscrição')}>
          <Text style={styles.textButton}>Participar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Status')}>
          <Text style={styles.textButton}>Acompanhar inscrição</Text>
        </TouchableOpacity>
      </View>
      </View>
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
      justifyContent: 'center', // Centraliza verticalmente
      alignItems: 'center', // Centraliza horizontalmente
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFA500',
      marginBottom: 10,
      marginHorizontal: 50
    },
    subHeaderText: {
      fontSize: 14,
      color: '#000000',
      fontWeight: '600',
      paddingBottom: 40
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#F9AF0B',
      padding: 15,
      paddingHorizontal: 40,
      marginVertical: 10,
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
      fontSize: 20,
    },
    logo: {
      width: 300,
      height: 300,
    },
    containerButton: {
      justifyContent: 'center',
      marginBottom: 50,
      width: '70%',
    },
  });
export default InscrScreen;
