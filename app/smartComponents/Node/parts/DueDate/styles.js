const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  default: {
    marginLeft: 0,
  },
  offsetLeft: {
    marginLeft: -4,
  },
  popover: {
    padding: 16,
  },
  buttons: {
    marginTop: 16,
  },
  iconHidden: {
    display: 'none',
  },
  content: {
    borderRadius: 4,
  },
  hover: {
    transition: '.2s ease-in-out',

    '&:hover $content': {
      padding: '2px 4px 2px 0',
      backgroundColor: 'rgb(250, 250, 250)',
    },

    '&:hover $iconHidden': {
      display: 'inline',
      position: 'absolute',
      right: -18,
      top: 0,
      padding: 6,
    },
  },
};

export default styles;
