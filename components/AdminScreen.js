import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
const AdminScreen = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.backendUrl}/api/usuarios/listar`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Autenticação com token
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Filtra usuários para excluir o admin
          const filteredUsuarios = data.filter(user => user.email !== 'admin');
          setUsuarios(filteredUsuarios);
        } else {
          console.error('Erro ao buscar usuários');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handlePress = (userId) => {
    navigation.navigate('ParticipantDetails', { userId });
  };

  const handleBack = () => {
    // Ação ao voltar, se necessário
  };

  const renderItem = ({ item }) => {
    // Verifica se item existe
    if (!item) {
      return null; // Não renderiza se item for indefinido ou nulo
    }

    return (
      <TouchableOpacity style={styles.button} onPress={() => handlePress(item.id)}>
        {/* Garante que nome_completo esteja definido */}
        <Text style={styles.text}>{item.nome_completo || 'Usuário sem nome'}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.yellowStrip}>
        <Text style={styles.title}>Inscrições</Text>
      </View>

      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  yellowStrip: {
    backgroundColor: '#F9AF0B', // Cor amarela
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    marginTop: 0, // Ajuste para alinhamento consistente
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
