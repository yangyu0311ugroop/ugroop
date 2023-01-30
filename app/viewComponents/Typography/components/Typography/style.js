import { scalingFontSizes } from 'theme/commonStyles/scalingFontSizes';

const style = theme => {
  const fontColor = theme.colorTone === 'warm' ? '#36322F' : '#4C4673';

  return {
    // SCALED FONT SIZES
    ...scalingFontSizes(theme, true),

    // COMMON STYLES
    headerCommon: {
      fontWeight: 400,
      color: fontColor,
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.6',
      wordBreak: 'break-word',
    },
    error: {
      color: theme.colors.alert,
    },
    success: {
      color: theme.colors.base,
    },
    primary: {
      color: theme.colors.primary,
    },
    subtitle: {
      color: theme.colors.metallicGray,
    },
    lavender: {
      color: theme.colors.lavender,
    },
    white: {
      color: theme.colors.white,
    },
    colorgray: {
      color: theme.colors.darkGray,
    },
    colorshuttlegrey: {
      color: theme.colors.shuttleGrey,
    },
    light: {
      fontWeight: 300,
    },
    bold: {
      fontWeight: 600,
    },
    bolder: {
      fontWeight: 700,
    },
    black: {
      fontWeight: 900,
    },
    'transform.capitalize': {
      textTransform: 'capitalize',
    },
    'transform.uppercase': {
      textTransform: 'uppercase',
    },
    'transform.lowercase': {
      textTransform: 'lowercase',
    },
    'fontStyle.normal': {
      fontStyle: 'normal',
    },
    'fontStyle.italic': {
      fontStyle: 'italic',
    },
    'textAlign.left': {
      textAlign: 'left',
    },
    'textAlign.right': {
      textAlign: 'right',
    },
    'textAlign.center': {
      textAlign: 'center',
    },
    'textAlign.justify': {
      textAlign: 'justify',
    },
    noMargin: {
      margin: 0,
    },
    letterSpacing: {
      letterSpacing: 1,
    },
    'whiteSpace.nowrap': {
      whiteSpace: 'nowrap',
    },
    lineHeight1: {
      lineHeight: 1,
    },
    clickable: {
      cursor: 'pointer',
    },
  };
};

export default style;
