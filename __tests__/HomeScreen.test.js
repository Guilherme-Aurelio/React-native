import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../components/HomeScreen'; // Substitua pelo caminho correto do seu componente

describe('HomeScreen', () => {
  const navigation = {
    navigate: jest.fn(), // Mock da função de navegação
  };

  it('deve renderizar os botões e permitir navegação', () => {
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);

    // Verificar se o botão de Admin está presente
    const adminButton = getByTestId('admin-button');
    expect(adminButton).toBeTruthy();

    // Verificar se o botão de Login está presente
    const loginButton = getByTestId('login-button');
    expect(loginButton).toBeTruthy();

    // Verificar se o botão de Cadastro está presente
    const registerButton = getByTestId('register-button');
    expect(registerButton).toBeTruthy();

    // Simular clique no botão de Admin e verificar navegação
    fireEvent.press(adminButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Admin');

    // Simular clique no botão de Login e verificar navegação
    fireEvent.press(loginButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Login');

    // Simular clique no botão de Cadastro e verificar navegação
    fireEvent.press(registerButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Registration');
  });
});

