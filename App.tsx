import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignInProject';
import SignUp from './src/pages/SignUpProject';
import SplashScreen from './src/pages/SplashScreenProject';

import ChatScreen from './src/pages/ChatScreenProject';
import SideBarScreenProject from './src/pages/SideBarScreenProject';
import {ChatProvider} from './src/context/ChatContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ChatProvider>
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
          <Stack.Screen
            name="ChatScreenProject"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SideBarScreenProject"
            component={SideBarScreenProject}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </ChatProvider>
    </NavigationContainer>
  );
};

export default App;
