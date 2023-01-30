const stylesheet = {
  gridClass: {
    transition: 'all 3s',
  },
  templateItem: {
    margin: 0,
    position: 'relative',
  },
  templateItemPicture: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
  },
  templateItemFooterActionsIcon: {
    alignSelf: 'center',
    fontSize: '20px',
    color: '#acb2c1',
    margin: '0 5px',
    '&:hover': {
      color: '#acb2c1',
    },
  },
  templateContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  templateItemBodyContainer: {
    overflow: 'hidden',
    flex: '2',
  },
  templateItemBody: {
    color: '#37415C',
    fontSize: '1em',
  },
  templateOverride: {
    backgroundColor: 'white',
    opacity: 0.5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
  templateItemLoading: {
    position: 'absolute',
    zIndex: 99999,
    top: '50%',
    left: '45%',
  },
  templateLinks: {
    textDecoration: 'none !important',
    padding: 0,
  },
};

export default stylesheet;
