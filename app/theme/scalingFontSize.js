import { generateFontSizes } from 'utils/style-utils';

// Main Source of Scaling Font Sizes per Breakpoints
const scalingFontSize = theme => {
  const { size } = theme.fontScale;

  return {
    H1: generateFontSizes(theme, size.H1),
    H2: generateFontSizes(theme, size.H2),
    H3: generateFontSizes(theme, size.H3),
    H4: generateFontSizes(theme, size.H4),
    H5: generateFontSizes(theme, size.H5),
    H6: generateFontSizes(theme, size.H6),
    TITLE: generateFontSizes(theme, size.TITLE),
  };
};

export default scalingFontSize;
