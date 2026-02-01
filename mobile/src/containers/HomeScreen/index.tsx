import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from './HomeScreen.Styles';

interface HomeScreenProps {
  params: object;
}

//<Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />

//todo ; create theme , font, colo system
//todo : strings file
const HomeScreen: FC<HomeScreenProps> = React.memo(({ params }) => {
  const [state, setState] = useState<string>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eli Test Scanner </Text>
      <View style={styles.captureContainer}>
        <View style={styles.cameraBox}>
          <Image
            source={{ uri: 'https://picsum.photos/170/170' }}
            style={styles.cameraIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>Capture your test strrip QR Code Image </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.infoText}>Name: Abc</Text>
        <Text style={styles.infoText}>Age: 14</Text>
      </View>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
});

export default HomeScreen;
