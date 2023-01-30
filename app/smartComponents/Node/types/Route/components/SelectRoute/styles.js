const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  item: {
    position: 'relative',
    padding: '1px 16px',
    cursor: 'pointer',
    transition:
      '300ms cubic-bezier(.08,.52,.52,1) box-shadow, 300ms cubic-bezier(.08,.52,.52,1) background-color',
  },
  itemPadding: {
    paddingTop: 7,
    paddingBottom: 6,
  },
  hover: {
    '&:hover': {
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      backgroundColor: '#fafbfc',
      zIndex: 1,
    },
  },

  inRange: {
    background: '#f1fff2',
  },
  origin: {
    background: '#f1fff2',
  },
  borderTop: {
    boxShadow: '0 -1px 0 0 #e3e9ef',
  },
  borderBottom: {
    boxShadow: '0 1px 0 0 #e3e9ef',
  },
  destination: {
    background: '#e6ffdf',
  },

  subtitleGrid: {
    fontSize: 12,
    color: '#90949c',
    border: '1px solid #e8e8e8',
    borderRadius: 4,
    position: 'absolute',
    right: 12,
    background: '#fbfbfb',
    padding: '0 4px',
  },
  subtitle: {
    fontSize: 12,
    color: '#90949c',
    position: 'absolute',
    right: 12,
    padding: '0 4px',
  },
  seeDetailButton: {
    color: '#769ae7',
    background: 'unset',
    boxShadow: 'unset',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      background: '#f3f3f3',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      color: '#c1c1c1',
    },
  },
  location: {
    fontSize: 12,
    color: '#595F6F',
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    padding: '8px 16px',
    borderBottom: '1px solid #e8e8e8',
  },
  footer: {
    padding: '8px 16px',
    borderTop: '1px solid #e8e8e8',
  },
};

export default styles;
