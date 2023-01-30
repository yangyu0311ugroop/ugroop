const styles = ({ breakpoints }) => ({
  root: {},
  grow: {
    flex: '1',
  },
  checklist: {
    backgroundColor: '#fbfcfd30',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  checklistCard: {
    padding: '0px 16px',
    marginBottom: 0,
  },
  checklistSeparator: {
    backgroundColor: 'white',
  },
  progressDiv: {
    paddingRight: 16,
    color: 'gray',
  },
  progress: {
    borderRadius: 2,
  },
  progressHeader: {
    color: 'grey',
    fontSize: 12,
    width: 33,
    marginLeft: -12,
  },
  subHeader: {
    color: 'grey',
    minHeight: 24,
    marginLeft: -4,
  },
  subHeaderIndent: {
    marginLeft: 52,
  },
  closedHeading: {
    color: '#6a737d',
  },
  closedText: {
    color: '#6a737d',
  },
  closedStatusText: {
    color: 'white',
  },
  closedStatus: {
    backgroundColor: '#8a85d5',
    color: 'white',
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  openStatus: {
    backgroundColor: '#a1c99c',
    color: 'white',
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  closedStatusDiv: {
    backgroundColor: '#8a85d5',
    color: 'white',
    width: 12,
    height: 12,
    padding: '4px 8px',
    borderRadius: 4,
  },
  openStatusDiv: {
    backgroundColor: '#a1c99c',
    color: 'white',
    width: 12,
    height: 12,
    padding: '4px 8px',
    borderRadius: 4,
  },
  closedProgress: {
    backgroundColor: '#6a737d50',
  },
  expansionPanel: {
    boxShadow: 'unset',
  },
  expansionPanelSummary: {
    minHeight: 24,
    padding: '0 16px',
    borderTop: '1px solid #e3e9ef',
    alignItems: 'baseline',
  },
  expansionPanelSummaryFirst: {
    // borderTop: 'none',
  },
  expansionPanelSummaryHover: {
    '&:hover': {
      backgroundColor: '#fbfcfd75',
    },
  },
  expansionPanelSummaryContent: {
    margin: '8px 0',
    paddingRight: 8,
  },
  expansionPanelSummaryExpanded: {
    // Jay: not sure how to override these without important
    margin: 'unset !important',
    paddingRight: 8,
    minHeight: 'unset !important',
  },
  expansionPanelSummaryExpandIcon: {
    minWidth: 16,
    width: 'unset',
    right: 16,
    [breakpoints.down('sm')]: {
      right: '-4px',
    },
  },
  expansionPanelDetails: {
    padding: '0 16px 0px',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  expansionPanelDetailsItems: {
    border: '1px solid #e3e9ef',
    borderRadius: 4,
    backgroundColor: '#fbfcfd50',
    padding: 8,
    paddingTop: 0,
  },
  expansionPanelDetailsCardItems: {
    border: '1px solid #e3e9ef',
    borderRadius: 4,
    backgroundColor: '#fbfcfd50',
    padding: 8,
    paddingTop: 0,
  },
  expansionPanelActions: {
    padding: '8px 8px 8px 40px',
    justifyContent: 'start',
  },
  shiftUp: {
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  firstColumnWidth: {
    minWidth: 32,
  },
  firstColumnWidthBadge: {
    minWidth: 32,
    margin: 'auto',
  },
  done: {
    opacity: 0.5,
  },
  paddingLeft: {
    paddingLeft: 4,
  },
  subtitle: {
    color: 'gray',
  },
  left: {
    minWidth: 52,
    marginLeft: 2,
  },
  offsetLeft: {
    // marginLeft: 54,
  },
  defaulfooter: {
    marginLeft: 48,
    marginBottom: '11px',
  },
  IconButtonProps: {
    color: 'red',
    background: 'red',
  },
  summaryHeader: {
    paddingTop: 3,
  },
});

export default styles;
