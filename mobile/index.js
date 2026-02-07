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

//@note Changes for Production readiness -
// Lottie Animation - User Education, Gamification , Interaction Reward etc
// Analytics  Framework Clevertap,Mixpanel,Firebase ,etc - funnel analysis on capture-upload-result
// Add Firebase Crashlytics - for crashes & non-fatals
// Firebase Performance
// CDN Image scaling
// Firebase Remote Config for app level configs
// Netwrok Info @react-native-community/netinfo for connectivity
// Offline capability - Realm , Redux-Saga
// Performance , RN Dev tools - report screenshot
// Deeplink setup - eli - Universal  Link (https://eli.health/your-test-strips)  & URL (elihealth://your-test-strips )(Scheme AndroidManifest.xml & Info.plist
