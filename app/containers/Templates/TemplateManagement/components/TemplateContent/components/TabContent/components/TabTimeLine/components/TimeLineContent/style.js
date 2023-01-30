import { colors } from '@material-ui/core';

const style = {
  root: {
    // marginTop: 8,
    width: '100%',
  },
  card: {
    marginTop: 8,
  },
  outlineNone: {
    outline: 'none',
  },
  dense: {
    margin: 0,
    padding: 0,
  },
  cancel: {
    margin: '6px 0',
    padding: '0 8px',
    fontWeight: 300,
  },
  bar: {},
  checked: {
    color: colors.green[500],
    '& + $bar': {
      backgroundColor: colors.green[500],
    },
  },
  labelRoot: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
  },
  button: {
    padding: '0 8px',
    margin: '6px 0',
  },
  select: {
    maxWidth: 180,
    backgroundColor: 'white',
    color: '#4C5673',
    fontSize: 12,
    padding: '4px 32px 4px 8px',
  },
  moveLabel: {
    paddingTop: 12,
    paddingRight: 8,
  },
  moveSelect: {
    minWidth: 180,
    marginTop: -10,
    marginLeft: 10,
  },
  labelSelect: {
    top: 3,
    color: '#555',
  },
  blankSlate: {
    width: '100%',
    height: 250,
    paddingTop: 20,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > h3': {
      margin: 0,
      fontWeight: 600,
    },
    '& > h5': {
      margin: 0,
    },
    '& > button': {
      width: '130px',
    },
  },
  addButton: {
    width: 'unset',
    fontWeight: 'unset',
    color: 'rgba(76, 86, 115, 1)',
    textTransform: 'unset',
    fontSize: 12,
    borderRadius: 4,
    height: 'unset',
    padding: 8,
  },

  marginTop: {
    marginTop: 64,
  },
};

export default style;
