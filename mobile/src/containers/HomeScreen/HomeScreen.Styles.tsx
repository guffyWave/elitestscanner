import { StyleSheet } from 'react-native';
import { COLORS } from '../../commons/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../commons/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    flex: 1,
    maxHeight: '95%',
  },
  title: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: COLORS.BLACK,
  },
  titleHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 16,
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHTS.SEMI_BOLD,
  },
  secondaryButton: {
    backgroundColor: COLORS.PRIMARY_BLUE,
    paddingVertical: 8,
    height: 40,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
});
