import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <ImageBackground 
        source={require('../assets/objects.png')} 
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../assets/logomarca.png')} />
          </View>
          <View style={styles.logoContainer}></View>
          <Text style={styles.headerText}>Bem vindos ao SEGUE-ME</Text>
          <Text style={styles.welcomeText}>Um Batalhão de Amor</Text>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.textButton2}>Cadastrar</Text>
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
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center', // Centraliza verticalmente
      alignItems: 'center', // Centraliza horizontalmente
      padding: 20,
      position: 'relative', // Adicionado para posicionar o botão admin
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
    welcomeText: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 30,
      fontWeight: 'bold',
      paddingBottom: 40
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#F9AF0B',
      padding: 15,
      marginHorizontal: 15,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      height: 50,
      width: 150
    },
    button2: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 15,
      marginHorizontal: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      height: 50,
      width: 150
    },
    textButton: {
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontSize: 16,
    },
    textButton2: {
      fontWeight: 'bold',
      color: '#000000',
      fontSize: 16,
    },
    logo: {
      width: 300,
      height: 300,
    },
    containerButton: {
      flexDirection: 'row',
      justifyContent: 'center',
    }
  });
  
  
  export default HomeScreen;
  
