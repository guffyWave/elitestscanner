import { StyleSheet } from 'react-native';

//@note - Use dimension , color , font etc from theme
export const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-start',
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  listContainer: {
    marginTop: 16,
  },
});
