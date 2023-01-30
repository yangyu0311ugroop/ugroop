export const AVATAR_SIZE = 400;

const styles = {
  root: {
    overflow: 'hidden',
  },
  grow: {
    flex: '1',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: '370px !important',
  },
  nameEllip: {
    fontSize: 17,
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    paddingRight: 8,
    zIndex: 1000,
  },
  iconContainerUp: {
    position: 'absolute',
    paddingRight: 8,
    zIndex: 1000,
  },
  closeBtn: {
    margin: '4px !important',
    borderRadius: '50%',
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
  container: {
    alignItems: 'flex-end',
    '& $photoHeader, & $iconContainer': {
      visibility: 'hidden',
      display: 'block',
    },
    '&:hover $photoHeader, &:hover $iconContainer': {
      visibility: 'visible',
      display: 'block',
    },
  },
  photoPlaceHolder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    textAlign: 'center',
    paddingTop: 155,
  },
  nameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 16,
    background: 'linear-gradient(rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.45))',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    color: 'white',
  },
  nameContent: {
    // TODO: hack, use a magic number here, it's the height of nameContent div, not sure how to get it dynamically in a simple way
    marginTop: AVATAR_SIZE - 61,
  },
  anchor: {
    color: 'white',

    '&:hover': {
      color: 'white',
    },
  },
  photoContainer: {
    // reserve space when photo is loading
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  photoHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 1), rgba(0,0,0,0))',
    padding: '8px 16px 35px',
  },
  photoHeaderUp: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 1), rgba(0,0,0,0))',
    padding: '8px 16px 35px',
  },
};

export default styles;
