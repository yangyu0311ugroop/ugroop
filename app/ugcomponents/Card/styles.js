const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '4px',
    boxSizing: 'content-box',
    '&:hover .cardAnimation': {
      '&:nth-child(2)': {
        top: -12,
      },
      '&:nth-child(3)': {
        top: -23,
      },
    },
    '& .cardAnimation:not(:first-child)': {
      transition: 'all 0.33s cubic-bezier(.87,-.81,.19,1.104)',
    },
  },
  cardBorder: {
    border: '1px solid #E3E9EF',
  },
};

export default styles;
