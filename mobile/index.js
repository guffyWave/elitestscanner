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

//@note Improvement for Production release -
/*
        1. Lottie Animation - User Education, Gamification , Interaction Reward , Fun & Engaging experience  etc
        
        2. Offline capability - Realm , Redux-Saga or Tan Stack @tanstack/react-query

        3. Analytics  Framework Clevertap,Mixpanel,Firebase ,etc - funnel analysis on capture-upload-result.  -- rn-bg-fetch / action  
        
        4.Add Firebase Crashlytics - for crashes & non-fatals, tech analytics
        
        5. Firebase Performance
        
        6.CDN Image scaling
        
        7.Firebase Remote Config for app level configs
        
        8. Performance , RN Dev tools - report screenshot
        
        9.Deeplink setup - eli - Universal  Link (https://eli.health/your-test-strips)  & URL (elihealth://your-test-strips )(Scheme AndroidManifest.xml & Info.plist
        
        10. ESBuild for Tree-Shaking
*/
