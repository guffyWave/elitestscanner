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
 
        2. Performance , RN Dev tools - report screenshot

        3. Offline capability - Realm , Redux-Saga or Tan Stack @tanstack/react-query

        4. Measure Success- Analytics  Framework Clevertap,Firebase ,etc - funnel analysis on capture-upload-result.  -- rn-bg-fetch / action  
        
        5. Add Firebase Crashlytics - for crashes & non-fatals, tech analytics
        
        6. Firebase Performance
        
        7. CDN Image scaling
        
        8. Firebase Remote Config for app level configs
        
        9. Deeplink setup - eli - Universal  Link (https://eli.health/your-test-strips)  & URL (elihealth://your-test-strips )(Scheme AndroidManifest.xml & Info.plist
        
        10. ESBuild for Tree-Shaking
*/
