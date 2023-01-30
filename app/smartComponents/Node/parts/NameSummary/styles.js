const styles = {
  root: {
    '& .ql-editor': {
      padding: 0,
      display: 'hidden',
      '& p': {
        display: 'hidden',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  grow: {
    flex: '1',
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  flex: {
    display: 'flex',
  },
  default: {
    wordBreak: 'break-word',
  },

  bold: {
    fontWeight: 'bold',
  },
  title: {
    wordBreak: 'break-word',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    borderRadius: 4,
    color: 'inherit',
  },
  darkMode: {
    borderRadius: 4,
    color: 'white',

    '&:hover': {
      color: 'white',
    },
  },
  nowrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px',
    paddingRight: 48,
    textAlign: 'left',
  },
  location: {
    maxWidth: '180px',
    color: '#333',
  },
  locationEditable: {
    maxWidth: '165px',
    color: '#333',
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  url: {
    color: '#595F6F',
    display: 'flex',
    overflow: 'hidden',
    fontSize: 12,
    alignItems: 'baseline',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 400,
  },
  noVal: {
    display: 'none',
  },
};
export default styles;
