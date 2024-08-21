import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const AcompanharInscricao = () => {
  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover" // Ajuste aqui para o redimensionamento desejado
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha inscrição</Text>
        <Text style={styles.headerSubtitle}>Acompanhe o seu processo de inscrição</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Nome completo</Text>
        <Text style={styles.infoText}>Andriéria Azevedo Dantas</Text>

        <Text style={styles.infoTitle}>Data de nascimento</Text>
        <Text style={styles.infoText}>25/05/2003</Text>

        <Text style={styles.infoTitle}>Cidade</Text>
        <Text style={styles.infoText}>Natal</Text>

        <Text style={styles.infoTitle}>Sexo</Text>
        <Text style={styles.infoText}>Indefinido</Text>
      </View>
     <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status</Text>
        <TouchableOpacity style={styles.statusButtonInProgress}>
          <Text style={styles.statusButtonText}>Em andamento</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    paddingTop: 70,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F4A900',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600'
  },
  infoContainer: {
    marginBottom: 30,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusButtonInProgress: {
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AcompanharInscricao;
