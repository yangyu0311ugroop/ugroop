const style = {
  item: {
    right: 0,
    bottom: -42,
    zIndex: 99,
    display: 'flex',
    position: 'absolute',
    left: 0,
  },
  inline: {
    bottom: 'unset',
    top: -32,
  },
  submit: {
    marginRight: 4,
  },
  secondaryRoot: {
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      content: "' '",
      width: 1,
      height: 30,
      margin: '0 4px',
      border: '1px dashed #858585',
    },
  },
};

export default style;
