import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 30,
    color: 'black',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginRight: 14, backgroundColor: '#DDD' },
  rightSection: { flex: 1, flexDirection: 'column' },
  topBlock: { flexDirection: 'column', marginBottom: 10 },
  bottomBlock: { flexDirection: 'column' },
  label: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 14, fontWeight: '700', color: '#2ECC71', marginTop: 2 },
  idText: { fontSize: 14, fontWeight: '500' },
  description: { fontSize: 13, color: '#555', marginTop: 2 },
});
