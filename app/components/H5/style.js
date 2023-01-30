import scalingFontSize from 'theme/scalingFontSize';
import commonStyle from 'components/H1/commonStyle';

const style = theme => ({
  ...commonStyle(theme),
  h5FontSize: {
    ...scalingFontSize(theme).H5,
    margin: theme.margins.font.H5,
  },
  dense: {
    margin: 0,
  },
});

export default style;
