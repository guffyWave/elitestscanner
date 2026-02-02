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
    fontSize: 20,
    fontWeight: '700',
    marginTop: 30,
    color: 'black',
  },

  secondaryButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5,
  },
});
