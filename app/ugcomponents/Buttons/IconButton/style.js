const style = {
  root: {},
  button: {
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: '50%',
    padding: 0,
    paddingLeft: 1,
  },
  defaultDark: {
    border: '1px solid #c9c9c9',
    backgroundColor: '#dcdcdc',
    backgroundImage: 'linear-gradient(-180deg, #dcdcdc 0%, #989898 90%)',

    '& i': {
      color: 'white',
    },

    '&:hover': {
      border: '1px solid #a9a9a9',
      backgroundColor: '#d2d2d2',
      backgroundImage: 'linear-gradient(-180deg, #d2d2d2 0%, #717171 90%)',
    },
    '&:hover i': {
      color: 'white',
    },
  },
  tooltip: {},
  default: {
    border: '1px solid rgb(216, 218, 223)',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(-180deg, #ffffff 0%, #fafafa 90%)',

    '& i': {
      color: 'rgba(76, 86, 115, 0.5)',
    },

    '&:hover': {
      border: '1px solid rgba(27, 31, 35, 0.35)',
      backgroundColor: '#f9f9f9',
      backgroundImage: 'linear-gradient(-180deg, #f9f9f9 0%, #d8d8d8 90%)',
    },
    '&:hover i': {
      color: 'rgba(76, 86, 115, 0.7)',
    },
  },
  defaultFlat: {
    width: 30,
    height: 30,
    minWidth: 20,
    minHeight: 20,

    '& i': {
      color: 'rgba(76, 86, 115, 1)',
      fontSize: 14,
    },

    '&:hover': {},
    '&:hover i': {
      color: '#86a6eb',
    },
  },
  primary: {
    backgroundColor: '#bdedb7',
    border: '1px solid rgb(153, 196, 147)',
    backgroundImage: 'linear-gradient(-180deg, #bdedb7 0%, #5cae52 90%)',
    color: 'white',

    '& i': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#54de42',
      border: '1px solid rgb(71, 198, 49)',
      backgroundImage: 'linear-gradient(-180deg, #54de42 0%, #279817 90%)',
    },
    '&:hover i': {
      color: 'white',
    },
  },
  primaryFlat: {
    backgroundColor: '#39bd3f',
    color: 'white',

    '& i': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#54de42',
    },
    '&:hover i': {
      color: 'white',
    },
  },
  contrast: {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',

    '&:hover': {
      color: 'white',
      backgroundColor: 'transparent',
      border: '1px solid #babfcd',
    },
  },
};

export default style;
