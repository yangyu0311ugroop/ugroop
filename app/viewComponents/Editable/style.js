/**
 * Created by stephenkarpinskyj on 20/7/18.
 */

const style = {
  root: {
    margin: '-2px -2px',
    borderRadius: 4,
  },

  fullWidth: {
    flex: 1,
  },

  content: {
    padding: '0 2px',
    borderRadius: 4,
    display: 'flex',
    color: 'unset',
    fontSize: 'unset',
    position: 'relative',
    alignItems: 'center',
    userSelect: 'text',
    '&:hover': {
      backgroundColor: '#E0E8ED',
    },
  },
  label: {
    textAlign: 'left',
  },
  hover: {
    paddingTop: 4,
    transition: '.2s ease-in-out',
  },

  contentHover: {
    backgroundColor: '#ebecf0',
    '&:hover': {
      backgroundColor: '#ebecf0',
    },
  },

  icon: {
    right: -32,
    zIndex: 1,
    padding: 2,
    marginLeft: 8,
    borderRadius: 4,
    height: '100%',
    minWidth: 24,
    display: 'none',
    position: 'absolute',
  },
  iconHover: {
    display: 'initial',
  },
  displayFlex: {
    display: 'flex',
  },
};

export default style;
