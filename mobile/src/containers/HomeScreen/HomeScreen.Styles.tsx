import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // horizontal center
    justifyContent: 'space-between', // vertical center
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 30,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  captureContainer: {
    alignItems: 'center',
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
  cameraIcon: {
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
  secondaryButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  infoText: { fontSize: 18, marginVertical: 4 },
});
