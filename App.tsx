import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignInProject';
import SignUp from './src/pages/SignUpProject';
import SplashScreen from './src/pages/SplashScreenProject';
import OtpScreenProject from './src/pages/OTP';
import VerifikasiSukses from './src/pages/VerifikasiSukses';
import VerifikasiGagal from './src/pages/VerifikasiGagal';
import ProfileProject from './src/pages/ProfileProject';
import EditProfile from './src/pages/ProfileProject/EditProfile';

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
        <Stack.Screen
          name="OtpScreenProject"
          component={OtpScreenProject}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifikasiSukses"
          component={VerifikasiSukses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifikasiGagal"
          component={VerifikasiGagal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileProject"
          component={ProfileProject}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
