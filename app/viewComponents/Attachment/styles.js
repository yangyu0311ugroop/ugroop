const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  attachmentContainer: {
    flex: '1',
    justifyContent: 'space-between',
  },
  link: {},
  description: {
    wordWrap: 'break-word',
  },
  anchorTag: {
    decoration: 'none',
    '&:hover': {
      decoration: 'none',
    },
    '&:focus': {
      decoration: 'none',
    },
  },
  popper: {
    zIndex: 1600,
    width: '40%',
  },
  compact: {
    maxHeight: 24,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  checkmark: {
    fontWeight: '400',
    fontSize: '20px',
  },
  separator: {
    borderRight: '1px solid #e3e9ef',
    margin: '2px 8px',
  },
  darkSeparator: {
    borderRight: '1px solid #777',
  },
  name: {
    alignSelf: 'center',
  },
  links: {
    flex: '1',
    width: '100%',
    paddingRight: 8,
  },
  linkIconPos: {
    position: 'relative',
    left: -3,
  },
  attachmentGrid: {
    maxHeight: 500,
    overflow: 'auto',
  },
};

export default styles;
