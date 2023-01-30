const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  text: {
    margin: 4,
    fontSize: 12,
    textAlign: 'justify',
    color: 'black',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 0,
    left: 0,
    right: 0,
    color: 'grey',
    backgroundColor: '#2b344d',
    width: '100%',
  },
  footerBadge: {
    paddingRight: 8,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center', // 'flex-end',
    paddingTop: 8,
    paddingBottom: 4,
  },
  logo: {
    height: 'auto',
    width: 20,
    justifyContent: 'right',
    paddingLeft: 2,
  },
  footerLabel: {
    fontSize: 16,
    color: '#1a2b49',
    textAlign: 'left',
  },
  footerSubLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },
  poweredText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
  },
  gridRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  secRow: {
    width: '33%',
    fontSize: 8,
    textAlign: 'justify',
    color: '#c6cee5',
  },
};

export default styles;
