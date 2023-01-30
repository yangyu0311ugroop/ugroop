const styles = ({ colors }) => ({
  root: {
    marginTop: '16px',
    position: 'relative',
  },
  border: {
    border: `1px dashed ${colors.card.border} `,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    border: '0 solid #fff',
    borderTop: `1px dashed ${colors.card.border} `,
  },
  content: {
    padding: '24px',
    height: '239px',
    border: 'none',
    '&:before, &:after': {
      display: 'none',
    },
  },
  textLabel: {
    color: '#B0B9C3',
    fontWeight: '600',
    fontSize: '16px',
  },
  textLabelColor: {
    color: '#a1c89b !important',
  },
  input: {
    fontWeight: '400',
  },
  btn: {
    width: '36px',
    height: '36px',
    color: '#B0B9C3',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    '&:hover, &:active,': {},
  },
  btnPrimary: {
    backgroundColor: colors.btnPrimaryColor,
    color: '#fff',
  },
  overshadow1: {
    borderRadius: '4px 4px 0 0',
    width: 'calc(100% - 16px)',
    height: '8px',
    position: 'absolute',
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTop: `1px dashed ${colors.card.border}`,
    borderLeft: `1px dashed ${colors.card.border}`,
    borderRight: `1px dashed ${colors.card.border}`,
    boxSizing: 'content-box',
  },
  overshadow2: {
    borderRadius: '4px 4px 0 0',
    width: 'calc(100% - 32px)',
    height: '8px',
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTop: `1px dashed ${colors.card.border}`,
    borderLeft: `1px dashed ${colors.card.border}`,
    borderRight: `1px dashed ${colors.card.border}`,
    boxSizing: 'content-box',
  },
  grow: {
    flex: '1',
  },
});

export default styles;
