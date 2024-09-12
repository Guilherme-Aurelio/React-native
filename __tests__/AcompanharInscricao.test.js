import React from 'react';
import { render } from '@testing-library/react-native';
import AcompanharInscricao from '../components/AcompanharInscricao';

describe('AcompanharInscricao Component', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(<AcompanharInscricao />);
    expect(getByText('Minha inscrição')).toBeTruthy();
    expect(getByText('Andriéria Azevedo Dantas')).toBeTruthy();
  });

  it('deve exibir o status como "Em andamento"', () => {
    const { getByText } = render(<AcompanharInscricao />);
    expect(getByText('Em andamento')).toBeTruthy();
  });
});