    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { Ionicons } from '@expo/vector-icons';

    import MinhaInscricao from './components/MinhaInscricao';
    import InscrScreen from './components/InscrScreen';
    import AcompanharInscricao from './components/AcompanharInscricao';

    const Tab = createBottomTabNavigator();

    const AppTabs = () => {
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
      
                if (route.name === 'Minha Inscricao') {
                  iconName = 'person';
                } else if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Acompanhar Inscricao') {
                  iconName = 'information-circle';
                }
      
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                display: 'flex', // Adjust this if you want to conditionally hide the tab bar
              },
            })}
          >
            <Tab.Screen name="Home" component={InscrScreen} />
            <Tab.Screen name="Minha Inscricao" component={MinhaInscricao} />
            <Tab.Screen name="Acompanhar Inscricao" component={AcompanharInscricao} />
          </Tab.Navigator>
        );
      };

    export default AppTabs;
