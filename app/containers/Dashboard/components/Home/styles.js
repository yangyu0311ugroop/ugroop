import AvatarBG from 'shareAssets/avatarbg.png';

const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  width100: {
    width: '100%',
    padding: 0,
    margin: '0 auto',
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingLeft: 8,
    paddingTop: 8,
  },
  bodyHeading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  headingPadding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerPadding: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  firstHeading: {
    paddingTop: 0,
  },

  content: {
    fontWeight: 500,
    color: '#636363',
  },
  ellipsisDiv: {
    width: 200,
  },

  starred: {
    color: '#e0bf00',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: 'unset',
    },
  },

  star: {
    color: '#c3c3c3',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: 'unset',
      color: '#e0bf00',
    },
  },

  collapsedCard: {
    padding: '8px 16px',
    overflow: 'hidden',
    maxWidth: 500,
    margin: '0 auto',
  },
  denseCard: {
    padding: '8px 0',
    overflow: 'hidden',
    maxWidth: 500,
  },

  collapseIcon: {
    color: '#6b778c',
  },

  pendingBadge: {
    background: '#607D8B',
    color: 'white',
    padding: '1px 3px',
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 700,
  },
  icons: {
    padding: 24,
    // background: '#6968a6',
    margin: '-8px -16px 4px',
    position: 'relative',
    backgroundImage: `url(${AvatarBG})`,
    backgroundSize: '150%',
    backgroundColor: '#7094ff',
  },
  textAlignCenter: {
    textAlign: 'center',
    maxWidth: 420,
  },
  emptyHeading: {
    fontSize: 17,
    fontWeight: 600,
  },
  card: {
    padding: '8px 0',
    overflow: 'hidden',
    maxWidth: 500,
    margin: '0 auto',
  },
};

export default styles;
