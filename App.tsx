import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignInProject';
import SignUp from './src/pages/SignUpProject';
import SplashScreen from './src/pages/SplashScreenProject';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreenProject"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignInProject"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpProject"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
