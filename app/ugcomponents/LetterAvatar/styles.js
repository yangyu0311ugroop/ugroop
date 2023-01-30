import bg from './colors';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 500,
    margin: 0,
  },
  standardBGColor: {
    backgroundColor: bg.cyan,
  },
  whiteBGColor: {
    backgroundColor: 'white',
    color: 'black',
  },
  grayBorderColor: {
    border: '1px solid #ccc',
  },
  nameStyle: {
    marginBottom: '0',
    fontWeight: '600',
    marginLeft: '8px',
    textTransform: 'capitalize',
  },
  circular: {
    borderRadius: '50%',
    '-webkit-border-radius': '50%',
    '-moz-border-radius': '50%',
  },
  squareSm: {
    background: '#9e9e9e45',
    minHeight: 24,
    minWidth: 24,
    borderRadius: 4,
    '-webkit-border-radius': '4px',
    '-moz-border-radius': '4px',
  },
  xs: {
    width: 20,
    height: 20,
  },
  sm: {
    width: 30,
    height: 30,
  },
  md: {
    width: 40,
    height: 40,
  },
};

export default styles;
