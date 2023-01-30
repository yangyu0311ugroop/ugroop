import scalingFontSize from 'theme/scalingFontSize';

const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  dayDescription: {
    marginTop: 8,
    '& p': {
      color: '#2b344d',
      lineHeight: 1.59,
      ...scalingFontSize(theme).H4,
    },
  },
  wordBreak: {
    wordBreak: 'break-word',
  },
  urlStyles: {
    color: '#595F6F',
    display: 'flex',
    overflow: 'hidden',
    fontSize: 12,
    alignItems: 'baseline',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
    cursor: 'pointer',
  },
});

export default styles;
