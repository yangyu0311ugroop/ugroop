const styles = {
  dividerLine: {
    width: 1,
    height: 50,
    background: '#205b77',
  },
  barWidth: {
    minWidth: 70,
  },
  bar: {
    height: 21,
    transition: 'width .3s ease-in-out',
    border: '2px solid white',
    borderLeft: 'none',
  },
  inactiveBar: {
    background: '#d0d0d0',
  },
  activeBar: {
    background: '#0b6aff',
  },
};

export default styles;
