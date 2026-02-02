import { StyleSheet } from 'react-native';
import theme from '../../commons/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.WHITE,
  },
  contentContainer: {
    flex: 1,
    maxHeight: '95%',
  },
  title: {
    fontSize: theme.fonts.sizes.LARGE,
    fontWeight: theme.fonts.weights.BOLD,
    color: theme.colors.BLACK,
  },
  titleHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.WHITE,
    marginHorizontal: theme.dimensions.MARGIN_HORIZONTAL_MEDIUM,
    marginTop: theme.dimensions.MARGIN_VERTICAL_MEDIUM,
  },
  buttonText: {
    color: theme.colors.WHITE,
    fontSize: theme.fonts.sizes.SMALL,
    fontWeight: theme.fonts.weights.SEMI_BOLD,
  },
  secondaryButton: {
    backgroundColor: theme.colors.PRIMARY_BLUE,
    paddingVertical: theme.dimensions.PADDING_VERTICAL_SMALL,
    height: theme.dimensions.BUTTON_HEIGHT,
    marginHorizontal: theme.dimensions.MARGIN_HORIZONTAL_MEDIUM,
    paddingHorizontal: theme.dimensions.PADDING_HORIZONTAL_SMALL,
    borderRadius: theme.dimensions.BORDER_RADIUS_SMALL,
    marginTop: theme.dimensions.MARGIN_VERTICAL_X_SMALL,
  },
});
