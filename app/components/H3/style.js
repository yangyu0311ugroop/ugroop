import commonStyle from 'components/H1/commonStyle';
import scalingFontSize from 'theme/scalingFontSize';

const style = theme => ({
  ...commonStyle(theme),
  h3FontSize: {
    ...scalingFontSize(theme).H3,
    margin: theme.margins.font.H3,
  },
  noMargin: {
    margin: 0,
  },
});

export default style;
