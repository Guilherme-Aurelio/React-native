import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ParticipantDetailsScreen = ({ route, navigation }) => {
  const { participant } = route.params;

  const handleApprove = () => {
    console.log('Aprovar');
  };

  const handleReject = () => {
    console.log('Recusar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.yellowStrip}>
        <Text style={styles.title}>Detalhes do Participante</Text>
        <View style={styles.headerButton} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome completo</Text>
          <Text style={styles.value}>{participant.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.value}>{participant.dob}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.value}>{participant.city}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{participant.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Sexo</Text>
          <Text style={styles.value}>{participant.gender}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.buttonText}>Aprovar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerText: {
    fontSize: 16,
    color: '#FFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFF',
    textAlign: 'center',
    flex: 3,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  approveButton: {
    backgroundColor: '#4CAF50', // Cor verde
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336', // Cor vermelha
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ParticipantDetailsScreen
