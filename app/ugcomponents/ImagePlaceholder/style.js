const styles = {
  center: {
    display: 'flex',
    width: 'inherit',
    height: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  imgLabel: {
    margin: 0,
  },
  roundImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  circle: {
    borderRadius: '100%',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& i': {
      textShadow: '0 0 1px #727272',
    },
  },
  mediumIcon: {
    width: 28,
    height: 28,
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    padding: 4,
    borderRadius: '50%',
    background: '#5c5c5c8a',
  },
  iconCamera: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  iconMove: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  iconDelete: {
    position: 'absolute',
    bottom: 10,
    left: 70,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  centerIcons: {
    bottom: 5,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    '& i': {
      textShadow: '0 0 1px #727272',
    },
  },
  centerPadding: {
    padding: 4,
    borderRadius: '50%',
    background: '#5c5c5c8a',
  },
  imgContainerLarge: {
    position: 'relative',
    '& > img': {
      borderRadius: 5,
    },
  },
  iconLarge: {
    padding: 8,
    background: '#fff',
    borderRadius: '50%',
  },
  iconCameraPositionLarge: {
    left: 10,
    bottom: 8,
    margin: 0,
    position: 'absolute',
  },
  iconMovePositionLarge: {
    left: 64,
    bottom: 8,
    margin: 0,
    position: 'absolute',
  },
  hover: {
    cursor: 'pointer',
    transition: '.2s ease-in-out',

    '&:hover ': {
      backgroundColor: 'rgb(250, 250, 250)',
    },

    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  iconHidden: {
    visibility: 'hidden',
  },
};

export default styles;
