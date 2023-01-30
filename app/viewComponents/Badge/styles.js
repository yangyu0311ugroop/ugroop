const styles = ({ colors }) => ({
  root: {
    maxWidth: 80,
    color: 'white',
    textAlign: 'center',
    padding: '0 8px',
    borderRadius: 4,
    fontSize: 14,
  },
  square: {
    background: '#efefef',
    borderRadius: 3,
    color: '#607D8B',
    fontSize: 12,
    fontWeight: 500,
    padding: '0px 4px',
  },
  circle: {
    background: '#efefef',
    borderRadius: '50%',
    color: '#607D8B',
    fontSize: 10,
    fontWeight: 500,
    padding: '0px 6px',
  },
  primary: {
    background: colors.primary,
    color: 'white',
  },
  pending: {
    background: colors.pending,
    color: 'white',
  },
  blue: {},
  translucent: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  green: {
    backgroundColor: colors.primary,
  },
  gray: {
    backgroundColor: colors.gray,
  },
  grow: {
    flex: '1',
  },
});

export default styles;
