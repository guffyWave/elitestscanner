import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from './HomeScreen.Styles';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import QRScanner from '../../components/QRScanner';

interface HomeScreenProps {
  params: object;
}

//<Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />

//todo ; create theme , font, color system
//todo : strings file
const HomeScreen: FC<HomeScreenProps> = React.memo(({ params }) => {
  const [state, setState] = useState<string>();

  //canmera integration can be mover to another component

  // const [hasPermission, setHasPermission] = useState(false);
  // const [photo, setPhoto] = useState<string | null>(null);
  // const [compressedPhoto, setCompressedPhoto] = useState<string | null>(null);
  // const [uploading, setUploading] = useState(false);

  // const cameraRef = useRef<Camera>(null);
  // const devices = useCameraDevices();
  //const device = devices.back;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eli Test Scanner </Text>

      <QRScanner params={{}} />

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
