import Overlay from 'shareAssets/overlay.png';

const styles = {
  root: {
    position: 'relative',
    border: '0 solid #fff',
    transition: 'all 200ms ease-in-out',
    width: '100%',
    height: 240,
    maxWidth: 400,
  },
  imgBg: {
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    zIndex: '1',
    borderRadius: '5px',
  },
  placeholder: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    minHeight: 240,
    borderRadius: 5,
    position: 'relative',
    backgroundImage: `url(${Overlay})`,
    backgroundBlendMode: 'color-burn',
    transition: 'all 1s ease',
  },
  logo: {
    zIndex: 3,
    height: 100,
    opacity: 0.9,
    position: 'absolute',
    filter: 'invert(100%)',
    transition: '0.3s filter linear',
    top: '20%',
  },
  logoSelected: {
    height: 120,
    filter: 'unset',
  },
  overlay: {
    zIndex: 2,
    opacity: 0.25,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  },
  color1: {
    backgroundColor: '#584EAC',
  },
  color2: {
    backgroundColor: '#439DA5',
  },
  color3: {
    backgroundColor: '#3C7692',
  },
  color4: {
    backgroundColor: '#4599B1',
  },
  color5: {
    backgroundColor: '#297F64',
  },
  gradient: {
    background:
      'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 33%, rgba(245,245,245,1) 37%, rgba(250,250,250,1) 61%, rgba(246,246,246,1) 73%, rgba(242,242,242,1) 90%)',
  },
  contentContainer: {
    top: 0,
    zIndex: 9,
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'absolute',
  },
  overshadow: {
    backgroundImage:
      'linear-gradient(to bottom, rgba(31, 39, 61, 0), rgba(31, 39, 61, 0.8))',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    zIndex: '8',
  },
  boxShadow: {
    backgroundImage: 'none',
    boxShadow: '0 5px 10px 0 #acb2c1',
  },
  dayLabel: {
    position: 'absolute',
    zIndex: 1,
    top: '8%',
    left: '8%',
  },
  dayInfo: {
    position: 'absolute',
    zIndex: 11,
    bottom: '8%',
    fontWeight: 600,
    color: '#fff',
    padding: '0 16px',
  },
  info: {
    margin: 0,
    width: 200,
    '@media (max-width: 1350px)': {
      width: 300,
    },
  },
  dateText: {
    display: 'block',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  placeText: {
    fontSize: 17,
    display: 'inherit',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  iconPicture: {
    fontSize: 80,
    color: '#c6ccd6',
  },
  grow: {
    flex: '1',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: '100%',
    boxShadow: '0 5px 10px 0 #acb2c1',
  },
};

export default styles;
