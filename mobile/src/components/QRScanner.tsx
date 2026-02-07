import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Image } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { UploadImageResponseModel } from '../model/testStripSubmissionList';
import { uploadScanImageAPI } from '../service/api';

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

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Please grant camera permission</Text>
      </View>
    );
  }

  if (!backCamera) {
    return (
      <View style={styles.center}>
        <Text>This device does not support camera</Text>
      </View>
    );
  }

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
      {photo ? (
        <View style={styles.capturedBox}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
        </View>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.cameraBox}
          device={backCamera}
          isActive={true}
          photo={true}
          enableZoomGesture
          exposure={0}
        />
      )}

      {!compressedPhoto ? (
        <View>
          <Text style={styles.captureInstruction}>Capture your test strip QR Code Image </Text>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={uploadPhoto}>
            {uploading ? <ActivityIndicator size={'small'} color={'#fff'} /> : null}
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      {uploadResponse ? renderUploadResponseBox() : null}
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
  cameraBox: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capturedBox: {
    width: 0.9 * DEVICE_WIDTH,
    height: 0.9 * DEVICE_WIDTH,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
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
    maxHeight: 135,
  },
  infoText: { fontSize: 18, marginVertical: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: (status: ScanValidity) => ({
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 4,
    color: status === 'INVALID' ? '#FF0000' : status === 'VALID' ? '#2ECC71' : '#999999',
  }),
  qrCodeText: {
    fontSize: 10,
    marginVertical: 4,
    color: '#333',
  },
  qrCodeValidText: {
    fontSize: 10,
    marginVertical: 4,
    color: '#444',
  },
  qualityText: {
    fontSize: 10,
    marginVertical: 4,
    color: '#2b2929',
  },
  messageText: {
    fontSize: 10,
    marginVertical: 4,
    color: '#666',
  },
});

export default QRScanner;
