import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './HomeScreen.Styles';

import QRScanner from '../../components/QRScanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import TestStripSubmissionListScreen from '../TestStripSubmissionListScreen';
import { STRINGS } from '../../commons/strings';

interface HomeScreenProps {
  params: object;
}

const HomeScreen: FC<HomeScreenProps> = React.memo(({ params }) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // const onHistoryOrScannerToggled = useCallback(() => {
  //   setShowHistory(!showHistory);
  // }, [showHistory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {showHistory ? <TestStripSubmissionListScreen params={{}} /> : <QRScanner params={{}} />}
      </View>
      <View style={styles.titleHistoryContainer}>
        {/* @note Improvement Make sacalable text which autoscale based on pixel density  */}
        <Text style={styles.title}>{STRINGS.APP_NAME}</Text>

        {/* @note Improvement  - Below can be converted into compound view, mananging its own state */}
        <TouchableOpacity
          style={styles.secondaryButton}
          // @note unoptimised inline function , will cause render issue - convert into meoinised function
          onPress={() => {
            setShowHistory(!showHistory);
          }}
          //onPress={onHistoryOrScannerToggled}
        >
          <Text style={styles.buttonText}>
            {showHistory ? STRINGS.HOME.SCANNER : STRINGS.HOME.HISTORY}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default HomeScreen;
