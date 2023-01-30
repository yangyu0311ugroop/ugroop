import AvatarBG from 'shareAssets/avatarbg.png';

const styles = {
  root: {
    width: 600,
  },
  grow: {
    flex: '1',
  },
  error: {
    marginTop: 8,
    backgroundColor: 'rgb(255, 241, 243)',
    borderLeft: '2px solid rgb(255, 132, 155)',
    borderRadius: 4,
    padding: '8px 4px 8px 16px',
  },
  good: {
    marginTop: 8,
    backgroundColor: '#83e3774d',
    borderLeft: '2px solid #a1c99c',
    borderRadius: 4,
    padding: '8px 4px 8px 16px',
  },
  errorPadding: {},
  card: {
    overflow: 'hidden',
    maxWidth: 500,
    width: 500,
    padding: 16,
    paddingTop: 0,
  },
  bodyHeading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
  },
  icons: {
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
    padding: '24px 90px 16px',
    margin: '0 -16px 16px',
    position: 'relative',
    backgroundImage: `url(${AvatarBG})`,
    backgroundSize: '150%',
    backgroundColor: '#7094ff',
  },
  infoButton: {
    marginTop: 24,
    padding: 0,
    marginRight: 10,
  },
  stepLabel: {
    '& > span > svg': {
      width: 30,
      height: 30,
    },
    '& > span > svg > text': {
      fontSize: '1rem',
    },
    '& > span > span': {
      fontSize: 13,
    },
  },
};

export default styles;
