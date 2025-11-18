import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignInProject';
import SignUp from './src/pages/SignUpProject';
import OtpScreenProject from './src/pages/OtpScreenProject';
import OtpBerhasilProject from './src/pages/OtpBerhasilProject';
import SplashScreen from './src/pages/SplashScreenProject';

import ChatScreen from './src/pages/ChatScreenProject';
import SideBarScreenProject from './src/pages/SideBarScreenProject';
import InsightScreenProject from './src/pages/InsightScreenProject';
import ProfileScreenProject from './src/pages/ProfileScreenProject';
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
            name="OtpScreenProject"
            component={OtpScreenProject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpBerhasilProject"
            component={OtpBerhasilProject}
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
            options={{
              headerShown: false,
              presentation: 'transparentModal',
              animation: 'fade',
              contentStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen
            name="InsightScreenProject"
            component={InsightScreenProject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileScreenProject"
            component={ProfileScreenProject}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </ChatProvider>
    </NavigationContainer>
  );
};

export default App;
