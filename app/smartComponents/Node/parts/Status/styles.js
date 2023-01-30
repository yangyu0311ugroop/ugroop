const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  default: {
    color: 'white',
    padding: '1px 4px',
    borderRadius: 2,
  },
  completed: {
    backgroundColor: '#8a85d5',
  },
  outstanding: {
    backgroundColor: '#a1c99c',
  },
  checkDone: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  checkOpen: {
    color: 'black',
  },
  checkBoxRoot: {
    height: 'unset',
    width: 'unset',
    padding: '4px 8px 4px 8px',
  },
  cancelled: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: 6,
    backgroundColor: 'red',
  },
  smallBadge: {
    color: 'white',
    fontWeight: 500,
    position: 'relative',
    background: '#c90000',
    borderRadius: 5,
    padding: '2px 8px',
    marginRight: 4,
    fontSize: 10,
  },
};

export default styles;
