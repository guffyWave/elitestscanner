import React, { FC, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Image } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';

interface QRScannerProps {
  params: object;
}

const QRScanner: FC<QRScannerProps> = React.memo(({ params }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [compressedPhoto, setCompressedPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Please grant camera permission</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>This device does not support camera</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const data = await cameraRef.current.takePhoto({
      flash: 'off',
    });

    const imageUri = `file://${data.path}`;
    setPhoto(imageUri);

    // Compress using ImageResizer
    try {
      const resized = await ImageResizer.createResizedImage(
        imageUri,
        1200, // max width
        1200, // max height
        'JPEG', // format
        70 // quality 0-100
      );
      setCompressedPhoto(resized.uri);
    } catch (err) {
      console.error('Image resize error', err);
      Alert.alert('Error', 'Failed to compress image');
    }
  };

  const uploadPhoto = async () => {
    if (!compressedPhoto) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: compressedPhoto,
      name: 'compressed-photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await axios.post('http://localhost:3000/api/test-strips/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Success', 'Image uploaded successfully!');
      setPhoto(null);
      setCompressedPhoto(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.captureContainer}>
      {photo ? (
        <View style={styles.cameraBox}>
          {/* <Image
            source={{ uri: 'https://picsum.photos/170/170' }}
            style={styles.cameraIcon}
            resizeMode="contain"
          /> */}
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <View style={styles.compressionDetails}>
            <Text style={styles.description}>Compressed Size: {compressedPhoto?.length} bytes</Text>
          </View>
        </View>
      ) : (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      <Text style={styles.description}>Capture your test strrip QR Code Image </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  captureContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  compressionDetails: {
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraBox: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  previewImage: {
    width: 170,
    height: 170,
    borderRadius: 8,
    //tintColor: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  infoText: { fontSize: 18, marginVertical: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default QRScanner;
