/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

//---- App Folder Responsibility --->>
// components -	small reusable component ,
// business - resusable business logic, state management
// services	 - Network communication, cache , database  fetch
// container - 	Screens / Major component to hold components
// hooks	-  Non-business reusable logic (not used)
// common - colors, themes, fonts, strings,dimens
// model - TS models & interfaces