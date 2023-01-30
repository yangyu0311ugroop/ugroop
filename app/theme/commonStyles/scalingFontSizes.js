import scalingFontSize from 'theme/scalingFontSize';

export const scalingFontSizes = (theme, margin = true) => ({
  // SCALED FONT SIZES
  h1FontSize: {
    ...scalingFontSize(theme).H1,
    margin: margin ? theme.margins.font.H1 : 0,
  },
  h2FontSize: {
    ...scalingFontSize(theme).H2,
    margin: margin ? theme.margins.font.H2 : 0,
  },
  h3FontSize: {
    ...scalingFontSize(theme).H3,
    margin: margin ? theme.margins.font.H3 : 0,
  },
  h4FontSize: {
    ...scalingFontSize(theme).H4,
    margin: margin ? theme.margins.font.H4 : 0,
  },
  h5FontSize: {
    ...scalingFontSize(theme).H5,
    margin: margin ? theme.margins.font.H5 : 0,
  },
  h6FontSize: {
    ...scalingFontSize(theme).H6,
    margin: margin ? theme.margins.font.H6 : 0,
  },
  titleFontSize: {
    ...scalingFontSize(theme).TITLE,
    margin: margin ? theme.margins.font.TITLE : 0,
  },
  spanFontSize: {
    ...scalingFontSize(theme).H5,
  },
});
