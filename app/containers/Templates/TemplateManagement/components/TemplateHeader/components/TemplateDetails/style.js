const styles = ({ breakpoints }) => ({
  ugTemplateList: {
    /* TODO: Add some styles */
  },
  grow: {
    flex: 1,
  },
  leftContainer: {
    flex: 1,
  },
  maxWidth: {
    maxWidth: 800,
  },
  checklistButton: {
    position: 'absolute',
    top: 10,
  },
  checklists: {
    marginTop: 8,
    position: 'relative',
  },
  detailsContainer: {
    [breakpoints.down('xs')]: {
      maxWidth: 'unset !important',
      flexBasis: 'unset !important',
    },
  },
  breadCrumbsView: {
    zIndex: 1,
    position: 'relative',
  },
  bgDark: {
    background: '#174b62',
    color: 'white',
    margin: -16,
    marginBottom: 0,
    width: 'calc(100% + 32px)',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    minHeight: 280,
    position: 'relative',
  },
  shorterHeight: {
    minHeight: 180,
  },
  tourTitle: {
    fontSize: 24,
    border: '1px solid transparent',
    marginLeft: -1,
  },
  subTitle: {
    fontSize: 14,
  },
  titleGrid: {},
  subTitleGrid: {
    marginTop: -8,
  },
  relative: {
    position: 'relative',
  },
  noFlexWrap: {
    flexWrap: 'unset !important',
  },
  description: {
    background: 'white',
    padding: 0,
    border: '1px solid transparent',
  },
  duration: {
    color: 'white',
    background: '#4CAF50',
    borderRadius: 2,
    padding: '0 4px',
  },
  nowrap: {
    flexWrap: 'nowrap',
  },
  calendarBlock: {
    background: 'white',
    padding: 8,
    paddingBottom: 0,
    textAlign: 'center',
    marginRight: 8,
    minWidth: 75,
    overflow: 'hidden',
  },
  blockNoDate: {
    background: '#FFFFFF20',
    border: '1px solid #FFFFFF60',

    '&:hover': {
      background: '#FFFFFF40',
    },
  },
  subtitleBlock: {
    padding: '2px 8px',
    textAlign: 'center',
    overflow: 'hidden',
    color: 'white',

    background: 'transparent',
    border: '1px solid transparent',
    marginLeft: -8,

    '&:hover': {
      background: '#FFFFFF20',
    },
  },
  subtitleBlockNoDate: {
    background: '#FFFFFF20',
    border: '1px solid #FFFFFF60',

    '&:hover': {
      background: '#FFFFFF40',
    },
  },
  calendarFirstRow: {
    color: 'white',
    background: 'red',
    margin: -8,
    marginBottom: 0,
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: 12,
  },
  firstRowNoDate: {
    background: 'unset',
    borderBottom: '1px solid #FFFFFF50',
  },
  calendarSecondRow: {
    color: '#0a2644',
    fontSize: 28,
  },
  secondRowNoDate: {
    color: 'white',
  },
  actionButton: {
    background: 'white',
    borderLeft: '1px solid #dbdee4',
    color: '#0a2644',
    minHeight: 33,
    padding: '2px 12px',
    paddingTop: 6,
  },
  actionButtons: {
    borderRadius: 2,
    overflow: 'hidden',
  },
  unresolvedBadge: {
    background: 'red',
    color: 'white',
    padding: '0 4px',
  },
  paddingBottom: {
    paddingBottom: 8,
  },
  offsetTop: {
    marginTop: -4,
  },
  coverPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tourHeader: {
    zIndex: 999,
    paddingBottom: 8,
  },
  tourHeaderXs: {
    padding: 4,
    paddingBottom: 8,
    paddingTop: 0,
    paddingRight: 0,
  },
  tourHeaderWithMargin: {
    zIndex: 999,
  },
  paddingTop: {
    paddingTop: 8,
  },

  ongoingBadge: {
    background: '#ffffff42',
    borderRadius: 3,
    color: 'white',
    padding: '2px 8px',
  },

  thedot: {
    color: '#94deff',
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 20,
    maxHeight: 16,
    marginTop: -17,
  },

  titleColor: {
    color: '#1a2b49',
    whiteSpace: 'normal',
  },
  subtitle: {
    color: '#495873',
    whiteSpace: 'normal',
  },
  published: {
    color: '#018830',
  },
  photoMinHeight: {
    // minHeight: 10,
    background: '#ffffff',
  },
  templateImageContainer: {
    minHeight: 80,
  },
  titleXs: {
    fontSize: 16,
    whiteSpace: 'normal',
  },
});
const stylesheet = theme => ({
  ...styles(theme),
  '@media print': {
    ...styles(theme),
    calendarFirstRow: {
      color: 'white !important',
      background: 'red !important',
      margin: -8,
      marginBottom: 0,
      padding: '4px 8px',
      fontWeight: 'bold',
      fontSize: 12,
    },
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 12,
    '& > a': {
      marginLeft: 3,
      marginRight: 3,
    },
  },
  marginSide: {
    marginLeft: 12,
    marginRight: 12,
  },
  whiteBg: {
    background: 'white',
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  mobileDefault: {
    fontSize: 12,
  },
  fullWidth: {
    width: '100%',
  },
  noPaddingTop: {
    paddingTop: '0px !important',
  },
  tourCodeLabel: {
    color: '#8a8a8a',
    fontSize: 10,
    fontWeight: 500,
    textTransform: 'uppercase',
    fontStyle: 'unset',
  },
  addMargins: {
    margin: '10px 0 20px 10px',
  },
  bar: {
    padding: '0px 2px',
  },
  shareButton: {
    padding: '4px 2px',
  },
});
export default stylesheet;
