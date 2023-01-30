import { scalingFontSizes } from 'theme/commonStyles/scalingFontSizes';

const style = theme => ({
  ...scalingFontSizes(theme, false),

  bold: {
    fontWeight: 600,
  },

  root: {
    display: 'block',
    position: 'relative',
  },
});

export default style;
