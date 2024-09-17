import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
const ParticipantDetailsScreen = ({ route, navigation }) => {
  const { userId } = route.params; // Pega o userId do participante passado na navegação
  const [participantData, setParticipantData] = useState(null);
  const [inscricaoId, setInscricaoId] = useState(null);

  useEffect(() => {
    const fetchParticipantData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Pega o token de autenticação
        const response = await fetch(`${config.backendUrl}/api/usuarios/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setParticipantData(data);
          setInscricaoId(data.inscricoes[0]?.id);
        } else {
          console.error('Erro ao buscar dados do participante');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do participante:', error);
      }
    };

    if (userId) {
      fetchParticipantData(); // Busca os dados assim que o userId estiver disponível
    }
  }, [userId]);

  const handleApprove = async () => {
    if (!inscricaoId) {
      console.error('Inscrição ID está indefinido');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${config.backendUrl}/api/inscricoes/atualizar/${inscricaoId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'Deferido' }), // Passando o status
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'O participante foi aprovado.');
        navigation.goBack();
      } else {
        console.error('Erro ao aprovar participante');
      }
    } catch (error) {
      console.error('Erro ao aprovar participante:', error);
    }
  };

  const handleReject = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${config.backendUrl}/api/inscricoes/atualizar/${inscricaoId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'Indeferido' }), // Passando o status
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'O participante foi recusado.');
        navigation.goBack(); // Volta para a tela anterior após recusa
      } else {
        console.error('Erro ao recusar participante');
      }
    } catch (error) {
      console.error('Erro ao recusar participante:', error);
    }
  };

  if (!participantData) {
    return (
      <View style={styles.container}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.yellowStrip}>
          <Text style={styles.title}>Detalhes do Participante</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nome completo</Text>
            <Text style={styles.value}>{participantData.nome_completo || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Data de nascimento</Text>
            <Text style={styles.value}>
              {participantData.data_nascimento ? new Date(participantData.data_nascimento).toLocaleDateString() : 'Não informado'}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.value}>{participantData.cidade || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{participantData.email || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.value}>{participantData.sexo || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.value}>{participantData.cpf || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Telefone</Text>
            <Text style={styles.value}>{participantData.telefone || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Rua</Text>
            <Text style={styles.value}>{participantData.rua || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Bairro</Text>
            <Text style={styles.value}>{participantData.bairro || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Estado</Text>
            <Text style={styles.value}>{participantData.estado || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.value}>{participantData.cep || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nível de escolaridade</Text>
            <Text style={styles.value}>{participantData.nivel_escolaridade || 'Não informado'}</Text>
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
      </ScrollView>
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
    width: '100%', // Garante que o yellowStrip ocupe toda a largura da tela
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    marginTop: 0, // Ajuste para alinhamento consistente
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFF',
    textAlign: 'center',
    flex: 1, // Adicione flex: 1 para alinhamento consistente
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailsContainer: {
    flex: 1,
    marginTop: 20,
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

export default ParticipantDetailsScreen;
