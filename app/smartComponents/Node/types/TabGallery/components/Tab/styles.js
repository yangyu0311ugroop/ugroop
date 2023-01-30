const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  fade: {
    '& img': {
      opacity: 0.5,
      transition: 'all 0.2s',
    },
    '& $descriptionViewing': {
      opacity: 0.5,
      transition: 'all 0.2s',
    },
    '& $photoHeader': {
      opacity: 0.5,
      transition: 'all 0.2s',
    },
  },
  menuContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buttonsContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  titleGridItem: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '12px !important',
    },
  },
  sameWidth: {
    minWidth: 150,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  selectedBadge: {
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
  selectBadgeHover: {
    '&:hover': {
      background: '#909090',
    },
  },
  badgeSelected: {
    opacity: 1,
    background: '#008eff',
  },
  photoGrid: {
    position: 'relative',
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 #c5c5c5',
    overflow: 'hidden',
    background: 'white',
    padding: 8,
    minHeight: 136,
  },
  photoGridWithInfo: {
    paddingBottom: 0,
  },
  photoGridHover: {
    '&:hover $descriptionViewing': {
      overflow: 'auto',
      bottom: 0,
      top: '50%',
    },
    '&:hover $selectedBadge': {
      opacity: 1,
    },
  },
  descriptionHidden: {
    '& $description': {
      display: 'none',
    },
  },
  forceHover: {
    '& $descriptionViewing': {
      bottom: 0,
      top: '50%',
      height: '50%',
    },
  },
  descriptionViewing: {
    overflow: 'auto',
    maxHeight: 128,
    // minHeight: 38,
  },
  description: {
    marginTop: 4,
    marginBottom: -4,
  },

  descriptionEditing: {
    height: 46,
  },

  author: {},

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
  downloadButton: {
    padding: '4px 8px',
    zIndex: 2,
    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
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

  previewRight: {
    width: 300,
    padding: 16,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#90949c',
  },

  previewImg: {
    position: 'relative',
    background: 'black',
    padding: '0 0 4px',
    // minHeight: 600,

    '& $updateButton, & $downloadButton, & $navigationButton': {
      visibility: 'hidden',
    },
    '&:hover $updateButton, &:hover $downloadButton, &:hover $navigationButton': {
      visibility: 'visible',
    },
  },
  navigationButtonHover: {
    '&:hover': {
      background: '#5b5d60',
    },
  },
  navigationButton: {
    borderRadius: 4,
    padding: '8px 16px',
    margin: 8,
    marginBottom: 4,
    color: 'white',
    zIndex: 2,
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 3,
    '& i': {
      textShadow: '0 0 1px #727272',
    },
  },

  navigationLeft: {
    position: 'absolute',
    top: 0,
    bottom: 45,
    left: 0,
    right: '50%',
    zIndex: 1,
  },
  navigationRight: {
    position: 'absolute',
    top: 0,
    bottom: 45,
    left: '50%',
    right: 0,
    zIndex: 1,
  },

  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 500,
  },
  photoHeader: {
    padding: '4px 0',
  },

  buttonMore: {
    minHeight: 'unset',
    zIndex: 2,
  },
  heading: {
    fontWeight: 500,
    marginTop: 24,
    marginLeft: 8,
  },
  headingFirst: {
    marginTop: 8,
  },
  descriptionView: {
    paddingBottom: 24,
  },

  selectDiv: {
    background: '#e5e7e8',
    borderRadius: 4,
  },

  selectedFade: {
    opacity: 0.5,
  },

  offsetImg: {
    borderRadius: 0,
    marginLeft: -8,
    width: 'calc(100% + 16px)',
  },

  maxWidth100: {
    width: '100%',
  },

  notes: {
    color: '#9c9c9c',
    fontStyle: 'italic',
  },

  tabTitle: {
    color: '#0a2644',
    fontWeight: 500,
  },

  paddingHorizontal: {
    padding: '0 8px',
  },

  containerList: {
    maxWidth: 680,
    margin: '0 auto',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  pageRoot: {
    fontSize: 12,
  },
  pageSelected: {
    backgroundColor: 'inherit',
    // color: 'white',
    fontWeight: 'bold',
    border: '2px solid #98b9ff',
  },
  wrapperClass: {
    border: '1px solid #e2e2e1',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: '#fff',
    borderRadius: 10,
    padding: '0px 4px',
  },
  selectInput: {
    padding: '8px 24px 8px 8px',
    fontSize: 14,
  },
});

export default styles;
