const styles = ({ breakpoints }) => ({
  passengerCountStyles: {
    '& > label': {
      [breakpoints.down('xs')]: {
        marginTop: '-8px !important',
      },
    },
  },
});

export default styles;
