import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from './HomeScreen';

test('renders HomeScreen correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
