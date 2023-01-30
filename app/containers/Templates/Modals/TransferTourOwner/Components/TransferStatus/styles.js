const styles = {
  root: {},
  pending: {
    background: 'yellow',
    padding: 4,
    flex: 1,
  },
  awaiting: {
    background: 'white',
    padding: 4,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  actionButton: {
    background: '#337ab7',
    // borderLeft: '1px solid #dbdee4',
    color: 'white',
    minHeight: 'unset',
    padding: '2px 12px',
    paddingTop: 4,
    borderRadius: '50%',
    width: 20,
    height: 22,
    '&:hover': {
      background: '#4b86b8',
    },
  },
  actionButtonAwating: {
    background: 'white',
    // borderLeft: '1px solid #dbdee4',
    color: 'black',
    minHeight: 'unset',
    padding: '2px 12px',
    paddingTop: 4,
    borderRadius: '50%',
    width: 20,
    height: 22,
    '&:hover': {
      background: '#4b86b8',
    },
  },
  statusText: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#337ab0',
    flex: 1,
  },
  statusTextAwaiting: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    flex: 1,
  },
  icon: {
    fontSize: 10,
  },
  iconDisp: {
    paddingRight: 4,
  },
  invitationWidth: {
    maxWidth: 350,
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },
  simple: {
    fontSize: 8,
    /* border: 'solid 1px yellow',
    backgroundColor: 'yellow',
    borderRadius: '5px',
    pading: '0 1px', */
  },
};

export default styles;
