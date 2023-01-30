import scalingFontSize from 'theme/scalingFontSize';
import commonStyle from 'components/H1/commonStyle';

const style = theme => ({
  ...commonStyle(theme),
  h2FontSize: {
    ...scalingFontSize(theme).H2,
    margin: theme.margins.font.H2,
  },
  noMargin: {
    margin: 0,
  },
});

export default style;
