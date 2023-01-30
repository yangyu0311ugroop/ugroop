const styles = {
  transportationBg: {
    background: '#f6f9fe',
  },
  accommodationBg: {
    background: '#f9f5ee',
  },
  activityBg: {
    background: '#eef9f5',
  },
  foodBg: {
    background: '#fef0ef',
  },
  icon: {
    textAlign: 'center',
    padding: '4px 12px 6px',
    borderRadius: 8,
  },
  sub: {
    marginTop: -4,
  },
  header: {},
  item: {
    cursor: 'pointer',
    borderTop: '1px solid transparent',
    borderBottom: '1px solid transparent',

    transition:
      '300ms cubic-bezier(.08,.52,.52,1) background-color, 300ms cubic-bezier(.08,.52,.52,1) border-top-color, 300ms cubic-bezier(.08,.52,.52,1) border-top-color, 300ms cubic-bezier(.08,.52,.52,1) opacity',

    '&:hover': {
      backgroundColor: '#fafbfc',
      borderTop: '1px solid #dddfe2',
      borderBottom: '1px solid #dddfe2',
    },

    '&:hover $header': {
      color: '#385898',
    },
  },
};

export default styles;
