import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  { id: '1', name: 'Ana Clara Bezerra Bonifacio', dob: '01/01/1990', city: 'Natal', email: 'ana@example.com', gender: 'Feminino' },
  { id: '2', name: 'Andriéria Azevedo Dantas', dob: '25/05/2003', city: 'Natal', email: 'andrieria@example.com', gender: 'Feminino' },
  { id: '3', name: 'João Paulo da Silva Monteiro', dob: '01/01/1990', city: 'Natal', email: 'joao@example.com', gender: 'Masculino'},
  { id: '4', name: 'Kelvin Cristiano Marques de Lima', dob: '01/01/1990', city: 'Natal', email: 'kelvin@example.com', gender: 'Masculino'},
  { id: '5', name: 'Guilherme Aurélio Ribeiro Rocha', dob: '01/01/1990', city: 'Natal', email: 'gui@example.com', gender: 'Masculino' },
  { id: '6', name: 'Maria Gabrieli de Moura Rodrigues', dob: '15/03/2004', city: 'João Câmara', email: 'gabrieli@example.com', gender: 'Feminino' },
  { id: '7', name: 'Emilly Jeniffer Martins dos Santos', dob: '01/01/1990', city: 'Natal', email: 'emilly@example.com', gender: 'Feminino' },
  { id: '8', name: 'Riane Ramaiane Delgado de Brito', dob: '01/01/1990', city: 'Natal', email: 'riane@example.com', gender: 'Feminino' },
];

const AdminScreen = ({ navigation }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handlePress = (participant) => {
    navigation.navigate('ParticipantDetails', { participant });
  };

  const handleBack = () => {
    setSelectedParticipant(null);
  };

  const handleApprove = () => {
    console.log('Aprovar');
  };

  const handleReject = () => {
    console.log('Recusar');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.yellowStrip}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Icon name="arrow-back-outline" size={24} color="#FFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Inscrições</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="log-out-outline" size={24} color="#FFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FF',
  },
  yellowStrip: {
    backgroundColor: '#F9AF0B', // Cor amarela
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    marginTop: 60, // Afastar da parte superior
  },
  headerButton: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFF',
    textAlign: 'center',
    flex: 3,
  },
  button: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFA726',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingTop: 20,
  },
});

export default AdminScreen;
