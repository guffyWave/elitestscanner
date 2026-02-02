import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    maxHeight: '95%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  titleHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'ligh-gray',
    marginHorizontal: 16,
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  secondaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    height: 40,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
});
