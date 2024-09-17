import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
const AcompanharInscricao = () => {
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('Em Análise');
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) setUserId(id);
      } catch (error) {
        console.error('Erro ao obter userId:', error);
        setErrorMessage('Erro ao obter ID do usuário.');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.backendUrl}/api/inscricoes/usuario/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          if (data.length > 0) {
            // Acessa os dados da primeira inscrição e do usuário associado
            const inscricao = data[0];
            setUserData(inscricao.usuario);  // Define os dados do usuário
            setStatus(inscricao.status || 'Em Análise');  // Define o status da inscrição
          } else {
            setErrorMessage('Nenhuma inscrição encontrada para este usuário.');
          }
        } else {
          setErrorMessage('Erro ao buscar dados da inscrição.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da inscrição:', error);
        setErrorMessage('Erro ao buscar dados da inscrição.');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const getStatusButtonStyle = () => {
    switch (status) {
      case 'Deferido':
        return styles.statusButtonApproved;
      case 'Indeferido':
        return styles.statusButtonRejected;
      case 'Em Análise':
      default:
        return styles.statusButtonInProgress;
    }
  };

  if (errorMessage) {
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/objects.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha inscrição</Text>
        <Text style={styles.headerSubtitle}>Acompanhe o seu processo de inscrição</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Nome completo</Text>
        <Text style={styles.infoText}>{userData.nome_completo}</Text>

        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoText}>{userData.email}</Text>

        <Text style={styles.infoTitle}>CPF</Text>
        <Text style={styles.infoText}>{userData.cpf}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status</Text>
        <TouchableOpacity style={getStatusButtonStyle()}>
          <Text style={styles.statusButtonText}>{status}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    paddingTop: 70,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
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
    backgroundColor: '#00BFFF', // Azul para "Em Análise"
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  statusButtonApproved: {
    backgroundColor: '#32CD32', // Verde para "Deferido"
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  statusButtonRejected: {
    backgroundColor: '#FF6347', // Vermelho para "Indeferido"
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
