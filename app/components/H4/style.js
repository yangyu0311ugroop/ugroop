import scalingFontSize from 'theme/scalingFontSize';
import commonStyle from 'components/H1/commonStyle';

const style = theme => ({
  ...commonStyle(theme),
  h4FontSize: {
    ...scalingFontSize(theme).H4,
    margin: theme.margins.font.H4,
  },
  dense: {
    margin: 0,
  },
});

export default style;
