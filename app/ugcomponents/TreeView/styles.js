const styles = theme => ({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  grow: {
    flex: '1',
  },
  listItem: {
    borderBottom: '1px dashed #E3E9EF',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#F6F8FA',
      color: '#1F273D',
    },
  },
  firstItem: {
    borderTop: 'none',
  },
  listRightActionContainer: {
    position: 'absolute',
    right: 24,
  },
  folderIcon: {
    marginRight: '0',
    fontSize: 30,
    color: '#E3E9EF',
  },
  isWhite: {
    color: '#78A2EA',
  },
  arrowIcon: {
    width: 32,
    height: 32,
  },
  isSelectedText: {
    color: '#1F273D',
    fontSize: 17,
    fontWeight: '600',
  },
  defaultText: {
    color: '#717E98',
    fontSize: 17,
    fontWeight: '600',
  },
  selectedItem: {
    backgroundColor: '#E3E9EF',
    '&:hover': {
      backgroundColor: '#E3E9EF',
    },
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    color: 'black',
  },
});

export default styles;
