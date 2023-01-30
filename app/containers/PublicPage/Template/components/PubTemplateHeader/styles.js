const styles = {
  root: {},
  grow: {
    flex: '1',
    maxWidth: 'unset',
  },
  createdBy: {
    margin: '8px 0',
    color: '#acb2c1',
    letterSpacing: 1,
  },
  containerNoCover: {
    height: 85,
    position: 'relative',
  },
  padding: {
    padding: '0 5%',
  },
  imgHeader: {
    height: 280,
  },
  imgCircle: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: '50%',
  },
  name: {
    lineHeight: 1.2,
    textTransform: 'capitalize',
  },
  photo: {
    marginRight: 8,
  },
  org: {
    color: '#acb2c2',
    lineHeight: 1.2,
    textTransform: 'capitalize',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  ugTemplateListTitle: {
    flex: 1,
    margin: '16px 0',
    color: '#1f273d',
    fontWeight: '600',
  },
  ugTemplateDescription: {
    '& p': {
      fontSize: 17,
      lineHeight: 1.59,
      textAlign: 'left',
      '@media (max-width: 375px)': {
        fontSize: 15,
      },
    },
  },
};

export default styles;
