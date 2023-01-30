const styles = theme => ({
  root: {
    marginTop: 4,
    marginBottom: 4,
  },
  grow: {
    flex: '1',
  },
  itemMargin: {
    marginRight: 8,
  },
  role: {
    fontWeight: 600,
    color: '#b3bcc5',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  marginTop: {
    marginTop: 8,
  },
  textWrap: {},
  userStatus: {
    color: '#c1c1c1',
    fontSize: 14,
  },
  status: {
    color: '#7097EB',
    fontSize: 14,
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  messageRoot: {
    display: 'flex',
  },
  message: {
    flex: 1,
    margin: 0,
    border: 'none',
    borderRadius: 4,
    padding: '0 4px',
    backgroundColor: '#FFF',
  },
  h5: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: '#808080',
  },
  padding: {
    paddingLeft: 39,
  },
  roleContainer: {
    flex: 1,
    fontSize: 14,
    color: 'grey',
    textAlign: 'right',
  },
  existTourRole: {
    color: 'grey',
  },
  newTourRole: {},
  label: {
    paddingLeft: 8,
  },
  green: {
    color: '#47943c',
  },
  tooltip: {
    border: 'unset',
    margin: 'unset',
  },
  detailButton: {
    height: 24,
    padding: '0px 8px',
  },
  alreadyMember: {
    borderRadius: 4,
    padding: '4px 8px',
    backgroundColor: '#fbfcfd',
    border: '1px solid #e3e9ef',
  },
  noPadding: {
    padding: '0px !important',
  },
  noPaddingRight: {
    paddingRight: '0px !important',
  },
  noPaddingLeft: {
    paddingLeft: '0px !important',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '4px !important',
    },
  },
  inviteeOrgEllipsis: {
    width: 100,
  },
  avatar: {},
  icon: {
    marginRight: 10,
  },
  customRole: {
    maxWidth: 150,
  },
  noPaddingBottom: {
    paddingBottom: '0px !important',
  },
  nameContainer: {
    minWidth: 300,
  },
});

export default styles;
