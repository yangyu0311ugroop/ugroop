const MESSAGE_MAX_WIDTH = 440;
const BORDER_RADIUS = 4;
const PADDING = 24;
const EXIT_BUTTON_SIZE = 24;

const styles = theme => ({
  common: {
    color: '#fefdfd',
    width: MESSAGE_MAX_WIDTH - 2 * PADDING,
    maxWidth: MESSAGE_MAX_WIDTH - 2 * PADDING,
    borderRadius: BORDER_RADIUS,
    padding: PADDING,
    display: 'flex',
    boxSizing: 'content-box',
  },
  outline: {
    backgroundColor: '#fefdfd',
    borderStyle: 'solid',
    borderColor: 'rgba(27,31,35,0.3)',
    borderWidth: 1,
    color: '#668de4',
    boxShadow: '0px 2px rgba(27,31,35,0.3)',
    width: 240,
    padding: 12,
    margin: 60,
  },
  success: {
    backgroundColor: '#89bc83',
  },
  info: {
    backgroundColor: '#668de4',
  },
  critical: {
    backgroundColor: '#d65c7e',
  },
  iconCell: {
    flex: 'none',
    marginRight: 16,
    alignSelf: 'center',
  },
  textCell: {
    flex: '1 0',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: 16,
    },
  },
  exitCell: {
    width: 24,
    flex: '0 0',
  },
  exitButton: {
    width: EXIT_BUTTON_SIZE,
    minWidth: EXIT_BUTTON_SIZE,
    height: EXIT_BUTTON_SIZE,
    minHeight: EXIT_BUTTON_SIZE,
    color: 'inherit',
    margin: 0,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default styles;
