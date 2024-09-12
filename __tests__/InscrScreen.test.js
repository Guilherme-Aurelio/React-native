import { render } from '@testing-library/react-native';
import InscrScreen from '../components/InscrScreen'; // atualize com o caminho correto
import { NavigationContainer } from '@react-navigation/native';

test('deve renderizar os botões e permitir navegação', () => {
  const { getByText } = render(
    <NavigationContainer>
      <InscrScreen />
    </NavigationContainer>
  );

  // Verifica se os botões com o texto correto estão sendo renderizados
  const participateButton = getByText('Participar');
  const trackButton = getByText('Acompanhar inscrição');
  
  expect(participateButton).toBeTruthy();
  expect(trackButton).toBeTruthy();
});
