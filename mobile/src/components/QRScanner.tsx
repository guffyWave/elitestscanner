import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { UploadImageResponseModel } from '../model/testStripSubmissionList';
import { uploadScanImageAPI } from '../service/api';
import theme from '../commons/theme';

interface QRScannerProps {
  params: object;
}
const DEVICE_WIDTH = Dimensions.get('window').width;

const QRScanner: FC<QRScannerProps> = React.memo(({ params }) => {
  const [hasPermission, setHasPermission] = useState(false);
  // @note - Improvement - club related states to decrease overall number of sates for improved rendering
  const [photo, setPhoto] = useState<string | null>(null);
  const [compressedPhoto, setCompressedPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<UploadImageResponseModel | null>(null);
  const [animationFinished, setAnimationFinished] = useState(false);

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const backCamera = devices.find((device) => device.position === 'back'); // find's back camera

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const renderUploadResponseBox = useCallback(() => {
    if (!uploadResponse) return null;
    return (
      <ScrollView style={styles.uploadResponseBox}>
        <Text style={styles.statusText(uploadResponse?.status)}>
          Status: {uploadResponse?.status || ''}
        </Text>
        <Text style={styles.qrCodeText}>QR Code : {uploadResponse?.qrCode || ''}</Text>
        <Text style={styles.qrCodeValidText}>
          QR Code Valid : {uploadResponse?.qrCodeValid || ''}
        </Text>
        <Text style={styles.qualityText}>Quality : {uploadResponse?.quality || ''}</Text>
        <Text style={styles.messageText}>Message : {uploadResponse?.message || ''}</Text>
      </ScrollView>
    );
  }, [uploadResponse]);

  // @note - Improve/educate user to capture image based on analytics funnel data -
  // @note - Improve QR recognition to suggest upfornt user about image quality - Based on too many rejection
  const takePhoto = async () => {
    if (!cameraRef.current) return;

    setUploadResponse(null);

    const data = await cameraRef.current.takePhoto({
      flash: 'off',
    });

    const imageUri = `file://${data.path}`;
    setPhoto(imageUri);

    try {
      const resized = await ImageResizer.createResizedImage(
        imageUri,
        1500, // bigger is better for QR
        1500,
        'PNG',
        100 // no compression
      );
      setCompressedPhoto(resized.uri);
    } catch (err) {
      console.error('Image resize error', err);

      //@note - todo : Send the erorr log to crshtlytics non-fatal
      //@note  - todo :Use custom dialog for better user communication
      Alert.alert('Error', 'Failed to compress image');
    }
  };

  const takeFromGallery = async () => {
    console.log('check takeFromGallery ---');
    setUploadResponse(null);

    if (Platform.OS === 'android') {
      try {
        const permission =
          Number(Platform.Version) >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery to select photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        console.log('check granted ---', granted);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      } catch (err) {
        console.warn(err);
        console.log('check err ---', err);
      }
    }

    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage);
      return;
    }

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      const imageUri = result.assets[0].uri;
      setPhoto(imageUri);

      try {
        const resized = await ImageResizer.createResizedImage(imageUri, 1500, 1500, 'PNG', 100);
        setCompressedPhoto(resized.uri);
      } catch (err) {
        console.error('Image resize error', err);
        Alert.alert('Error', 'Failed to compress image');
      }
    }
  };

  //@note -  Move this to Service layer
  const uploadPhoto = async () => {
    if (!compressedPhoto) return;

    setUploading(true);

    try {
      const response = await uploadScanImageAPI(compressedPhoto);
      if (response?.status === 200) {
        setUploadResponse(response?.data);
        //@note  - todo :Use custom dialog for better user communication
        Alert.alert('Success', 'Image uploaded successfully!');
        setPhoto(null);
        setCompressedPhoto(null);
      } else {
        Alert.alert('Error', 'Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image' + error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.captureContainer}>
      {!hasPermission ? <Text>Please grant camera permission</Text> : null}

      {photo ? (
        <View style={styles.capturedBox}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
        </View>
      ) : (
        <View style={styles.cameraBoxContainer}>
          {true ? (
            <View style={styles.capturedBox}>
              {!animationFinished && Platform.OS === 'ios' ? (
                <LottieView
                  //source={require('../animation/camera_pop_up.json')}
                  source={require('../animation/qr_scanning.json')}
                  autoPlay
                  loop={false}
                  onAnimationFinish={() => setAnimationFinished(true)}
                  style={{ width: 200, height: 200, backgroundColor: theme.colors.BLACK }}
                />
              ) : null}
            </View>
          ) : null}
          {backCamera ? (
            <Camera
              ref={cameraRef}
              style={styles.cameraBox}
              device={backCamera}
              isActive={true}
              photo={true}
              enableZoomGesture
              exposure={0}
            />
          ) : (
            <Text style={styles.cameraNotSupported}>This device does not support camera</Text>
          )}
        </View>
      )}

      {!compressedPhoto ? (
        <View>
          <Text style={styles.captureInstruction}>Capture your test strip QR Code Image </Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takeFromGallery}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={uploadPhoto}>
            {uploading ? <ActivityIndicator size={'small'} color={'#fff'} /> : null}
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      {uploadResponse ? (
        renderUploadResponseBox()
      ) : animationFinished && Platform.OS === 'ios' ? (
        <View style={styles.userEducationBox}>
          <LottieView
            //source={require('../animation/camera_pop_up.json')}
            source={require('../animation/qr_scanning.json')}
            autoPlay
            loop={true}
            style={{ width: 100, height: 100, backgroundColor: theme.colors.BLACK }}
          />
        </View>
      ) : null}
    </View>
  );
});

//@note - Use dimension , color , font etc from theme
const styles = StyleSheet.create({
  captureContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  compressionDetails: {
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraNotSupported: {
    fontSize: theme.fonts.sizes.LARGE,
    color: theme.colors.WHITE,
    textAlign: 'center',
  },
  cameraBox: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capturedBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: '#000',
  },
  cameraBoxContainer: {
    width: 0.9 * DEVICE_WIDTH,
    height: 0.9 * DEVICE_WIDTH,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: '#000',
  },
  userEducationBox: {
    width: 0.9 * DEVICE_WIDTH,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: '#000',
  },
  previewImage: {
    width: 0.8 * DEVICE_WIDTH,
    height: 0.8 * DEVICE_WIDTH,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  captureInstruction: {
    fontSize: 12,
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  uploadResponseBox: {
    backgroundColor: '#e6e6e6',
    padding: 6,
    borderRadius: 8,
  },
  infoText: { fontSize: 18, marginVertical: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: (status: ScanValidity) => ({
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
    color: status === 'INVALID' ? '#FF0000' : status === 'VALID' ? '#2ECC71' : '#999999',
  }),
  qrCodeText: {
    fontSize: 12,
    marginVertical: 4,
    color: '#333',
  },
  qrCodeValidText: {
    fontSize: 12,
    marginVertical: 4,
    color: '#444',
  },
  qualityText: {
    fontSize: 12,
    marginVertical: 4,
    color: '#2b2929',
  },
  messageText: {
    marginVertical: 4,
    color: '#666',
  },
});

export default QRScanner;
