const styles = {
  root: {
    paddingBottom: 20,
    // boxShadow: '1px 1px 3px 0px #c5c5c5',
    border: 'solid 1px #e3e9ef',
  },
  grow: {
    flex: '1',
  },
  header: {
    width: '100%',
    margin: '0 0 8px 0',
    padding: '8px 16px',
    background: '#e3eaf0',
  },
  headerFonts: {
    color: '#495873',
    margin: 0,
    fontWeight: 500,
  },
  headerGrid: {
    flex: 1,
  },
  checklistGrid: {
    maxHeight: 730,
    overflow: 'auto',
  },
  popperRoot: {
    marginTop: 8,
  },
  menuButton: {
    padding: 0,
    margin: 0,
    color: '#0a2644',
  },
  smallText: {
    fontSize: 12,
    padding: '0px 8px',
    minHeight: 'unset',
  },
  simpleButton: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 0px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  popperGrid: {
    paddingTop: '0px !important',
  },
  icon: {
    padding: 4,
  },
};

export default styles;
