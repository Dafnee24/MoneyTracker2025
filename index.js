/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import SplashScreen from './src/pages/SplashScreen';
import SignIn from './src/pages/SignIn';

AppRegistry.registerComponent(appName, () => SignIn);
