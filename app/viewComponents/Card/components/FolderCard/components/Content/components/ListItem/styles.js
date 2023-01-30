const styles = {
  listItemRoot: {
    margin: 0,
    padding: '8px 0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingBottom: '8px',
    paddingTop: 0,
    color: '#495873',
    borderBottom: 'none',
    display: 'flex',
    cursor: 'hand',
    '& + &': {
      borderTop: '1px solid #E3E9EF',
    },
    '&:hover > .itemLink, &:hover > .itemLink, &:hover > .itemIcon, &:hover > .itemIcon': {
      color: '#7097eb',
      textDecoration: 'none',
    },
    '&:not(:first-child)': {
      paddingTop: '8px',
    },
    '&:last-child': {
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  listItemIcon: {
    display: 'inline-block',
    marginRight: 8,
    color: '#acb2c1',
    fontSize: 20,
    transition: 'all .33s ease-out',
  },
  listItemLink: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'inherit',
    textDecoration: 'none',
    flex: 1,
    transition: 'all .33s ease-out',
    '&:hover': {
      textDecoration: 'none',
    },
  },
};

export default styles;
