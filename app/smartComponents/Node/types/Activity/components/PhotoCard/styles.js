const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  photoGrid: {
    position: 'relative',
    boxShadow: '0 1px 3px 0 rgba(37,32,31,.3)',
    background: 'white',
  },
  photoGridHover: {
    '&:hover $descriptionViewing': {
      overflow: 'auto',
      bottom: 0,
      top: '50%',
    },
    '&:hover $checkBadge': {
      opacity: 1,
    },
  },
  fade: {
    '& img': {
      opacity: 0.5,
    },
    '& $descriptionViewing': {
      opacity: 0.5,
    },
    '& $photoHeader': {
      opacity: 0.5,
    },
  },
  photoHeader: {
    padding: '4px 0',
  },
  updateButton: {
    top: 12,
    left: 8,
    bottom: 'unset',
    width: 'unset',
    borderRadius: 4,
    zIndex: 2,
    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },

  description: {
    marginTop: 4,
    marginBottom: -4,
  },
  descriptionViewing: {
    overflow: 'auto',
    maxHeight: 128,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#90949c',
  },
  offsetTop: {
    marginTop: -4,
  },

  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    borderRadius: '50%',
    border: '1px solid white',
    padding: '0 4px',
    opacity: 0.7,
    cursor: 'pointer',
    background: '#adadad',
  },
  checkBadgeHover: {
    '&:hover': {
      background: '#909090',
    },
  },
  checkBadgeSelected: {
    opacity: 1,
    background: '#008eff',
  },

  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,

    background: 'unset',
    boxShadow: 'unset',
    color: 'gray',

    '&:hover': {
      background: 'unset',
      color: '#F44336',
    },
  },
  deleteButtonNoAuthor: {
    top: 16,
    right: 16,
    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
      color: 'white',
    },
  },

  padding: {
    padding: '0 8px',
  },
  paddingAll: {
    padding: 8,
  },
  first: {
    paddingTop: 8,
  },
};

export default styles;
