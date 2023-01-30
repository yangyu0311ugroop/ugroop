const styles = {
  item: {
    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  tooltip: {
    background: 'white',
    boxShadow: '0 3px 12px rgb(143 149 156)',
    padding: 0,
    fontWeight: 400,
    color: '#595F6F',
    width: 300,
  },
  tooltipSmall: {
    background: 'white',
    boxShadow: '0 3px 12px rgb(143 149 156)',
    padding: 8,
    fontWeight: 400,
    color: '#595F6F',
  },
  popper: {
    opacity: 1,
  },
  square: {
    width: 12,
    height: 12,
    border: '1px solid',
    marginTop: 4,
  },
  squareActivity: {
    background: '#64aa9d95',
    borderColor: '#64aa9d',
  },
  squareAccommodation: {
    background: '#f0af6e95',
    borderColor: '#f0af6e',
  },
  squareTransportation: {
    background: '#6493f795',
    borderColor: '#6493f7',
  },
  squareFood: {
    background: '#ea989a95',
    borderColor: '#ea989a',
  },
};

export default styles;
