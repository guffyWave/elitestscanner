import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './HomeScreen.Styles';

import QRScanner from '../../components/QRScanner';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps {
  params: object;
}

//<Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />

//todo ; create theme , font, color system
//todo : strings file
const HomeScreen: FC<HomeScreenProps> = React.memo(({ params }) => {
  return (
    <SafeAreaView style={styles.container}>
      <QRScanner params={{}} />
      <Text style={styles.title}>Eli Test Scanner</Text>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default HomeScreen;
