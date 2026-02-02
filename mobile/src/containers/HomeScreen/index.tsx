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

//todo ; create theme , font, color system
const HomeScreen: FC<HomeScreenProps> = React.memo(({ params }) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {showHistory ? <TestStripSubmissionListScreen params={{}} /> : <QRScanner params={{}} />}
      </View>
      <View style={styles.titleHistoryContainer}>
        <Text style={styles.title}>{STRINGS.APP_NAME}</Text>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setShowHistory(!showHistory);
          }}
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
