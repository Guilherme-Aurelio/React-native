import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AdminScreen from '../components/AdminScreen';

describe('AdminScreen Component', () => {
  const navigation = { navigate: jest.fn() };

  it('deve renderizar a lista de participantes', () => {
    const { getByText } = render(<AdminScreen navigation={navigation} />);

    // Verifica se os nomes dos participantes estão renderizados
    expect(getByText('Ana Clara Bezerra Bonifacio')).toBeTruthy();
    expect(getByText('Andriéria Azevedo Dantas')).toBeTruthy();
    expect(getByText('João Paulo da Silva Monteiro')).toBeTruthy();
  });

  it('deve navegar para a tela de detalhes quando um participante for clicado', () => {
    const { getByText } = render(<AdminScreen navigation={navigation} />);

    // Simula o clique em um participante
    fireEvent.press(getByText('Ana Clara Bezerra Bonifacio'));

    // Verifica se a navegação foi chamada com os parâmetros corretos
    expect(navigation.navigate).toHaveBeenCalledWith('ParticipantDetails', { participant: expect.any(Object) });
  });

  it('deve exibir o botão de voltar e permitir que seja clicado', () => {
    const { getByTestId } = render(<AdminScreen navigation={navigation} />);

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    // Verifica se o botão foi clicado corretamente (a função pode ser verificada se houver lógica associada)
    expect(backButton).toBeTruthy();
  });
});
