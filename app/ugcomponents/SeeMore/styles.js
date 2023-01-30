const styles = {
  root: {
    // boxShadow: 'inset 0 0 5px 0 #e3e9ef',
    border: '1px solid #e3e9ef',
    padding: '4px 0',
    minHeight: 96,
    overflow: 'auto',
  },
  defaultStyle: {
    padding: 8,
  },
  readOnly: {
    boxShadow: 'unset',
    borderColor: 'transparent',
    minHeight: 'unset',
  },
  seeAllContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  advancedRoot: {
    marginTop: -63,
    position: 'relative',
    zIndex: 123,
    minHeight: 'unset',
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  noPadding: {
    padding: 0,
  },
  '[target="_blank"]': {
    color: 'blue',
  },
  filledRTE: {
    padding: 12,
    minHeight: 70,
    maxHeight: 200,
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    background: 'white',
  },
  paperRoot: {
    marginTop: 8,
  },
  createButton: {
    marginTop: -1,
    color: '#385898',
    fontStyle: 'italic',
  },
};

export default styles;
