const style = ({ colors }) => ({
  root: {
    marginBottom: '15px',
    // borderBottom: '1px solid #E9E9E9',
    // display: 'inline-block',
    '& h1, h2, h3, h4, h5, h6, h7, p': {
      padding: '0',
      margin: '0',
      lineHeight: '1.6',
      borderBottom: `1px solid ${colors.mercury}`,
      color: colors.dune,
      fontWeight: 'bold',
      display: 'inline-block',
    },
    '& span': {
      display: 'inline-block',
      borderBottom: `1px solid ${colors.orange}`,
      paddingBottom: '16px',
      marginBottom: '-1px',
    },
  },
});

export default style;
