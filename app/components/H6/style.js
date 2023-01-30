import scalingFontSize from 'theme/scalingFontSize';
import commonStyle from 'components/H1/commonStyle';

const style = theme => ({
  ...commonStyle(theme),
  h6FontSize: {
    margin: theme.margins.font.H6,
    ...scalingFontSize(theme).H6,
  },
  noMargin: {
    margin: 0,
  },
});

export default style;
