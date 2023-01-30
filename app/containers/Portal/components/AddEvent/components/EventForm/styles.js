const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  formGrid: {
    background: 'white',
    padding: '16px',
    maxHeight: 'calc(100vh - 157px)',
    overflowY: 'auto',
  },
  formGridEdit: {
    maxHeight: 'calc(100vh - 138px)',
  },
  formGridSm: {
    padding: '8px 16px 0',
  },

  formHeader: {
    padding: 16,
    background: 'white',
    borderBottom: '1px solid gainsboro',
  },
  formButtons: {
    padding: 16,
    borderTop: '1px solid gainsboro',
    background: 'white',
  },

  typeButton: {
    position: 'relative',
    minWidth: 60,
    width: '100%',
    borderRadius: 8,
    padding: '10px 16px 10px',
    boxShadow: 'unset',
    background: 'white',
    transition:
      '100ms cubic-bezier(.08,.52,.52,1) background-color, 100ms cubic-bezier(.08,.52,.52,1) border-bottom',
    marginBottom: 3,

    '&:hover': {
      background: 'whitesmoke',
    },
  },

  typeActive: {
    borderRadius: 0,
    backgroundColor: 'white',
    boxShadow: '0px 3px 0 #03A9F4',

    '&:hover': {
      background: 'unset',
    },
  },
  eventContent: {
    // background: '#f6f8fa',
    padding: '16px 0',
    // borderRadius: 8,
    // boxShadow: 'inset 0px 0px 1px 0px #8080806b',
  },

  selectTypes: {
    // marginLeft: 16,
  },

  subtypeButton: {
    borderRadius: 4,
    minWidth: 92,
    width: '100%',
    minHeight: 85,
    boxShadow: 'unset',
    border: '1px solid #e2e2e1',
    background: 'white',
    transition: '100ms cubic-bezier(.08,.52,.52,1) background-color',

    '&:hover': {
      backgroundColor: '#fafbfc',
    },
  },
  subtypeButtonSm: {
    minWidth: 'unset',
  },

  activeCard: {
    border: '2px solid #0070c9',

    '&:active, &:focus': {
      boxShadow: `rgba(131,192,253,.5) 0 0 0 2px`,
    },
  },
};

export default styles;
