import { generateFontSizes } from 'utils/style-utils';

const styles = theme => {
  const { size } = theme.fontScale;

  return {
    info: {
      flex: 1,
      display: 'flex',
    },
    padding: {
      padding: '0 16px 0 8px',
    },
    text: {
      marginBottom: 8,
    },
    space: {
      paddingRight: 64,
    },
    container: {
      alignItems: 'flex-start',
    },
    dot: {
      fontSize: 17,
      color: '#595F6F',
      margin: '0 16px 0 8px',
    },
    day: generateFontSizes(theme, size.H4),
    date: generateFontSizes(theme, size.H4),
  };
};

export default styles;
