import scalingFontSize from 'theme/scalingFontSize';
import commonStyle from './commonStyle';

const style = theme => ({
  ...commonStyle(theme),
  h1FontSize: {
    ...scalingFontSize(theme).H1,
    margin: theme.margins.font.H1,
  },

  noMargin: {
    margin: 0,
  },
});

export default style;
